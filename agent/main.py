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

def generate_content(prompt, client, is_system_instruct=True):
    models_to_try = ["gemini-3.6-flash"]
    
    config = None
    if is_system_instruct:
        config = types.GenerateContentConfig(
            system_instruction="You are an expert tech and productivity blogger. Your goal is to write highly engaging, SEO-optimized, and premium articles in English about AI tools, productivity hacks, and digital side hustles. Output ONLY the raw markdown content without any wrapper code blocks."
        )

    for model_name in models_to_try:
        for attempt in range(1, 5):
            try:
                print(f"Calling Gemini with model: {model_name} (attempt {attempt}/4)...")
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config
                )
                if response.text:
                    print(f"Successfully generated content using {model_name}!")
                    return response.text
            except Exception as e:
                print(f"Model {model_name} error on attempt {attempt}: {e}")
                if attempt < 4:
                    wait_time = attempt * 4
                    print(f"Temporary issue detected. Waiting {wait_time} seconds before retry...")
                    time.sleep(wait_time)
            
    return None

def generate_topic(client):
    prompt = """
    Brainstorm a highly engaging and trendy blog post title about AI tools or side hustles. 
    It should be catchy, click-worthy, and SEO optimized.
    Respond with ONLY the title, nothing else. Example: "5 AI Tools That Will Replace Your Content Team in 2024"
    """
    title = generate_content(prompt, client, is_system_instruct=False)
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

    print("Generating topic...")
    title = generate_topic(client)
    print(f"Topic selected: {title}")
    
    print("Writing article...")
    prompt = f"""
    Write a comprehensive, highly engaging, and premium quality blog post about: "{title}".
    
    Requirements:
    - Use Markdown formatting (H1 for title, H2/H3 for sections, bullet points, bold text).
    - Start with a catchy introduction.
    - Break the content into readable sections.
    - Provide actionable advice or real-world examples.
    - End with a compelling conclusion.
    - Do NOT include frontmatter (I will add it).
    - Output ONLY the markdown text.
    """
    
    content = generate_content(prompt, client, is_system_instruct=True)
    if not content:
        print("Failed to generate content with all available models.")
        return
        
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    slug = slugify(title)
    
    content = re.sub(r'^#\s+.*\n+', '', content, count=1)
    
    frontmatter = f"""---
title: "{title}"
date: "{date_str}"
description: "Discover the latest insights on {title.lower()} and how to leverage it for your productivity."
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
