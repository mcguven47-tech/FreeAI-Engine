import os
import json
import urllib.request
import datetime
import re

def generate_content(prompt, api_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    data = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "systemInstruction": {
            "parts": [{"text": "You are an expert tech and productivity blogger. Your goal is to write highly engaging, SEO-optimized, and premium articles in English about AI tools, productivity hacks, and digital side hustles. Output ONLY the raw markdown content without any wrapper code blocks."}]
        }
    }
    
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None

def generate_topic(api_key):
    prompt = """
    Brainstorm a highly engaging and trendy blog post title about AI tools or side hustles. 
    It should be catchy, click-worthy, and SEO optimized.
    Respond with ONLY the title, nothing else. Example: "5 AI Tools That Will Replace Your Content Team in 2024"
    """
    title = generate_content(prompt, api_key)
    if title:
        return title.strip().replace('"', '')
    return "The Future of AI and Productivity"

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY environment variable not set. Exiting.")
        return

    print("Generating topic...")
    title = generate_topic(api_key)
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
    
    content = generate_content(prompt, api_key)
    if not content:
        print("Failed to generate content.")
        return
        
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    slug = slugify(title)
    
    # Remove H1 if the model included it at the very top (since we render it in the layout)
    content = re.sub(r'^#\s+.*\n+', '', content, count=1)
    
    frontmatter = f"""---
title: "{title}"
date: "{date_str}"
description: "Discover the latest insights on {title.lower()} and how to leverage it for your productivity."
---

"""
    
    final_content = frontmatter + content
    
    # Ensure posts directory exists
    posts_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "posts")
    os.makedirs(posts_dir, exist_ok=True)
    
    file_path = os.path.join(posts_dir, f"{slug}.md")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(final_content)
        
    print(f"Article successfully generated and saved to: {file_path}")

if __name__ == "__main__":
    main()
