import os
import json
import re
from google import genai
from google.genai import types

def get_gemini_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY environment variable is not set!")
        return None
    return genai.Client(api_key=api_key)

def get_available_models(client):
    try:
        discovered = []
        for model in client.models.list():
            name = model.name.replace("models/", "")
            if "gemini" in name and not any(x in name for x in ["embed", "imagen", "robotics", "aqa"]):
                discovered.append(name)
        
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
        
    return ["gemini-2.0-flash", "gemini-flash-lite-latest"]

def generate_content(prompt, client, candidate_models):
    config = types.GenerateContentConfig(
        system_instruction="You are a Principal Software Analyst and Open-Source AI Researcher for FreeAI Engine. Your mission is to find expensive proprietary AI tools and discover the best 100% free, freemium, or open-source alternatives. Return ONLY valid JSON format."
    )

    for model_name in candidate_models:
        try:
            print(f"Calling Gemini with model: {model_name}...")
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=config
            )
            if response and response.text:
                print(f"Successfully generated response using {model_name}!")
                return response.text
        except Exception as e:
            print(f"Model {model_name} error: {e}")
            continue

    return None

def main():
    print("=== FreeAI Engine: Autonomous Discovery Agent Started ===")
    client = get_gemini_client()
    if not client:
        print("Skipping execution: GEMINI_API_KEY missing.")
        return

    candidate_models = get_available_models(client)

    tools_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "tools.json")
    os.makedirs(os.path.dirname(tools_file), exist_ok=True)

    existing_tools = []
    if os.path.exists(tools_file):
        try:
            with open(tools_file, "r", encoding="utf-8") as f:
                existing_tools = json.load(f)
        except Exception as e:
            print(f"Error loading existing tools: {e}")

    existing_names = [t["name"].lower() for t in existing_tools]

    prompt = f"""
    Find 1 expensive, popular proprietary AI tool that is NOT in this list: {existing_names}.
    Identify its top 3 100% free, freemium, or open-source alternatives.
    
    Output MUST be a single valid JSON object following this exact schema (no markdown fences, just JSON):
    {{
      "id": "slug-id",
      "name": "Expensive Tool Name",
      "category": "image|chat|code|audio|video|writing|search",
      "categoryLabel": "Icon & Label (e.g. 🎨 Image & Art)",
      "priceMonthly": 20,
      "priceYearly": 240,
      "description": "Brief description of the expensive tool and why it's pricey.",
      "slug": "tool-name-free-alternatives",
      "alternatives": [
        {{
          "name": "Alternative Name",
          "badge": "100% Free / Open Source",
          "type": "open-source|free|freemium",
          "description": "Why this is an exceptional replacement.",
          "url": "https://official-or-github-link",
          "pros": ["Pro 1", "Pro 2", "Pro 3"],
          "cons": ["Limitation or setup requirement"]
        }}
      ]
    }}
    """

    print("Discovering and benchmarking new expensive AI tool vs free alternatives...")
    raw_json = generate_content(prompt, client, candidate_models)

    if not raw_json:
        print("Failed to generate tool data.")
        return

    # Clean JSON
    cleaned_json = re.sub(r'^```json\s*', '', raw_json.strip())
    cleaned_json = re.sub(r'\s*```$', '', cleaned_json.strip())

    try:
        new_tool = json.loads(cleaned_json)
        
        # Verify schema
        if "name" in new_tool and "alternatives" in new_tool:
            # Check if already exists
            if new_tool["name"].lower() not in existing_names:
                existing_tools.append(new_tool)
                with open(tools_file, "w", encoding="utf-8") as f:
                    json.dump(existing_tools, f, indent=2, ensure_ascii=False)
                print(f"✅ Successfully added new tool to FreeAI Engine: {new_tool['name']}")
                print(f"Total tools in directory: {len(existing_tools)}")

                # Generate viral distribution tweet/post
                marketing_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "marketing")
                os.makedirs(marketing_dir, exist_ok=True)
                marketing_file = os.path.join(marketing_dir, f"{new_tool['slug']}-social.md")

                with open(marketing_file, "w", encoding="utf-8") as f:
                    f.write(f"""# Viral Social Post for: {new_tool['name']}
Article URL: https://freeai-engine.vercel.app/alternatives/{new_tool['slug']}

Stop paying ${new_tool['priceMonthly']}/month (${new_tool['priceYearly']}/yr) for {new_tool['name']}. 🛑

Here are 3 100% free / open-source alternatives you can use right now:

1. {new_tool['alternatives'][0]['name']} ({new_tool['alternatives'][0]['badge']})
→ {new_tool['alternatives'][0]['description']}

Full feature breakdown & links: https://freeai-engine.vercel.app/alternatives/{new_tool['slug']}
""")
                print(f"Saved viral distribution post to: {marketing_file}")
            else:
                print(f"Tool {new_tool['name']} already exists in catalog.")
    except Exception as e:
        print(f"Error parsing JSON from Gemini: {e}")
        print("Raw response was:", raw_json)

if __name__ == "__main__":
    main()
