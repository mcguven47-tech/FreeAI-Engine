import os
import datetime
import re
import time
from google import genai
from google.genai import types

def get_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY environment variable not set. Exiting.")
        return None
    return genai.Client(api_key=api_key.strip())

def get_available_models(client):
    try:
        discovered = []
        for m in client.models.list():
            name = m.name.replace("models/", "")
            # Only pick text/chat generation models
            if "gemini" in name and not any(x in name for x in ["embed", "imagen", "robotics", "aqa"]):
                discovered.append(name)
        print(f"Discovered active models for your API key: {discovered}")
        
        # Sort so that flash models and 3.6 models are prioritized
        def sort_key(name):
            score = 0
            if "3.6" in name: score += 20
            if "flash" in name: score += 10
            if "pro" in name: score += 5
            return -score
            
        discovered.sort(key=sort_key)
        if discovered:
            return discovered
    except Exception as e:
        print(f"Could not fetch model list: {e}")
        
    return ["gemini-3.6-flash"]

def generate_content(prompt, client, candidate_models, is_system_instruct=True):
    config = None
    if is_system_instruct:
        config = types.GenerateContentConfig(
            system_instruction="You are Marcus Vance, a seasoned Silicon Valley technology strategist and venture researcher. You write authoritative, insider-level, highly engaging, and actionable articles in English about AI tools, productivity systems, and digital side hustles. Never state that you are an AI or bot; write with natural human authority, firsthand experience, and practical executive tone. Output ONLY clean markdown formatting."
        )

    for model_name in candidate_models:
        print(f"Attempting generation with model: {model_name}...")
        for attempt in range(1, 3):
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config
                )
                if response.text:
                    print(f"SUCCESS! Content generated using {model_name}!")
                    return response.text
            except Exception as e:
                err_str = str(e)
                print(f"Model {model_name} attempt {attempt} error: {err_str}")
                if "503" in err_str or "UNAVAILABLE" in err_str or "429" in err_str:
                    time.sleep(3)
                else:
                    # If it's a 404 or other permanent error for this model, skip immediately to next model
                    break
            
    return None

def generate_topic(client, candidate_models):
    prompt = """
    Brainstorm a highly engaging and trendy blog post title about AI tools or side hustles. 
    It should be catchy, click-worthy, and SEO optimized.
    Respond with ONLY the title, nothing else. Example: "5 AI Tools That Will Replace Your Content Team in 2024"
    """
    title = generate_content(prompt, client, candidate_models, is_system_instruct=False)
    if title:
        return title.strip().replace('"', '').replace('\n', '')
    return "The Future of AI and Productivity"

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def main():
    client = get_client()
    if not client:
        return

    print("Fetching active models from Google...")
    candidate_models = get_available_models(client)
    print(f"Models to try in order: {candidate_models}")

    print("Generating topic...")
    title = generate_topic(client, candidate_models)
    print(f"Topic selected: {title}")
    
    print("Writing article...")
    prompt = f"""
    Write a comprehensive, highly engaging, visually rich, and premium quality blog post about: "{title}".
    
    Requirements:
    - Use clean Markdown formatting (H2/H3 for sections, bullet points, bold text).
    - Start with a catchy introduction and an inspirational blockquote (> Quote).
    - Break the content into readable, scannable sections with practical step-by-step guidance.
    - Include 2-3 relevant illustration images throughout the article using Markdown image syntax:
      Format: ![Visual Description](https://image.pollinations.ai/prompt/YOUR_ENCODED_IMAGE_PROMPT_HERE?width=1000&height=500&nologo=true)
    - Provide actionable advice, income benchmarks ($/month), or real-world workflow examples.
    - End with a compelling conclusion.
    - Do NOT include frontmatter (I will add it).
    - Output ONLY the markdown text.
    """
    
    content = generate_content(prompt, client, candidate_models, is_system_instruct=True)
    if not content:
        print("Failed to generate content with all available models.")
        return
        
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    slug = slugify(title)
    
    content = re.sub(r'^#\s+.*\n+', '', content, count=1)
    
    import urllib.parse
    image_prompt = urllib.parse.quote(f"{title} futuristic digital technology 3d glassmorphism aesthetic vibrant cinematic")
    image_url = f"https://image.pollinations.ai/prompt/{image_prompt}?width=1200&height=630&nologo=true"
    
    frontmatter = f"""---
title: "{title}"
date: "{date_str}"
description: "Discover the latest insights on {title.lower()} and how to leverage it for your productivity."
image: "{image_url}"
---

"""
    
    final_content = frontmatter + content
    
    posts_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "posts")
    os.makedirs(posts_dir, exist_ok=True)
    
    file_path = os.path.join(posts_dir, f"{slug}.md")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(final_content)
        
    print(f"Article successfully generated and saved to: {file_path}")

if __name__ == "__main__":
    main()
