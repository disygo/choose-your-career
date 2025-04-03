import sys
import json
import openai
from bs4 import BeautifulSoup
import requests
from collections import defaultdict

# Configure OpenAI API
openai.api_key = 'your-openai-api-key'

def generate_with_gpt(prompt, max_tokens=500):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=max_tokens,
            n=1,
            stop=None,
            temperature=0.7
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error in GPT generation: {e}")
        return None

def scrape_free_courses(topic):
    try:
        # This is a placeholder - in a real implementation you would:
        # 1. Search for free courses on platforms like Coursera, edX, Udemy free courses, etc.
        # 2. Parse the results to get course titles, links, and descriptions
        # 3. Return a cleaned list
        
        # For demo purposes, returning mock data
        mock_courses = [
            {"title": f"Introduction to {topic}", "provider": "Coursera", "link": "https://coursera.org/example1", "level": "Beginner"},
            {"title": f"Advanced {topic} Concepts", "provider": "edX", "link": "https://edx.org/example2", "level": "Intermediate"},
            {"title": f"{topic} Projects", "provider": "Udemy", "link": "https://udemy.com/example3", "level": "Advanced"},
        ]
        return mock_courses
    except Exception as e:
        print(f"Error scraping courses: {e}")
        return []

def scrape_job_listings(topic):
    try:
        # This would scrape job listings from platforms like Indeed, LinkedIn, etc.
        # For demo purposes, returning mock data
        mock_jobs = [
            {"title": f"{topic} Developer", "company": "Tech Corp", "link": "https://jobs.example.com/1"},
            {"title": f"Senior {topic} Engineer", "company": "Innovate Inc", "link": "https://jobs.example.com/2"},
            {"title": f"{topic} Specialist", "company": "Digital Solutions", "link": "https://jobs.example.com/3"},
        ]
        return mock_jobs
    except Exception as e:
        print(f"Error scraping jobs: {e}")
        return []

def generate_growth_chart_data(topic):
    # This would generate realistic growth projections based on market data
    # For demo purposes, returning mock data
    years = [2023, 2024, 2025, 2026, 2027, 2028]
    growth = [100, 115, 132, 152, 175, 201]  # Percentage growth from baseline
    
    return {
        "labels": years,
        "datasets": [
            {
                "label": "Job Market Growth",
                "data": growth,
                "borderColor": "#3e95cd",
                "fill": False
            }
        ]
    }

def generate_expert_experiences(topic):
    prompt = f"""Generate 3 realistic expert experiences for someone working in {topic}. 
    Each should include:
    - The person's name and current position
    - Their career journey in 2-3 sentences
    - Key advice for newcomers in this field
    
    Format as a JSON list with fields: name, position, journey, advice"""
    
    result = generate_with_gpt(prompt)
    try:
        return json.loads(result)
    except:
        # Fallback if JSON parsing fails
        return [
            {
                "name": "John Doe",
                "position": f"Senior {topic} Developer",
                "journey": f"I started as a junior {topic} developer 10 years ago and worked my way up through various companies.",
                "advice": "Focus on building practical projects and continuously learning new technologies in this field."
            },
            # ... more examples
        ]

def generate_career_content(sector):
    # Generate title and description
    title_prompt = f"Generate a professional title for the career sector: {sector}"
    title = generate_with_gpt(title_prompt, max_tokens=50)
    
    desc_prompt = f"Write a comprehensive 100-word description of the {sector} career sector, including key responsibilities and industries."
    description = generate_with_gpt(desc_prompt)
    
    # Generate category and difficulty
    category_prompt = f"What is the main category for {sector}? (e.g., Technology, Healthcare, Business)"
    category = generate_with_gpt(category_prompt, max_tokens=20)
    
    difficulty_prompt = f"Rate the difficulty of entering the {sector} field as: Beginner, Intermediate, or Advanced"
    difficulty = generate_with_gpt(difficulty_prompt, max_tokens=20)
    
    # Generate job growth estimate
    growth_prompt = f"Estimate the job growth for {sector} over the next 5 years as: High, Medium, or Low"
    job_growth = generate_with_gpt(growth_prompt, max_tokens=20)
    
    # Generate study guidance
    study_prompt = f"""Generate a list of 5 key study areas or skills needed to pursue a career in {sector}.
    Format as a JSON list."""
    study_guidance = generate_with_gpt(study_prompt)
    try:
        study_guidance = json.loads(study_guidance)
    except:
        study_guidance = ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]  # Fallback
    
    # Generate future scope
    future_prompt = f"""Generate future scope information for {sector} including:
    - Overall description (50 words)
    - 3 key trends affecting this sector
    Format as JSON with fields: description, trends (list with title and description)"""
    future_scope = generate_with_gpt(future_prompt)
    try:
        future_scope = json.loads(future_scope)
    except:
        future_scope = {
            "description": f"The {sector} field is expected to grow significantly with new technologies.",
            "trends": [
                {"title": "Trend 1", "description": "Description 1"},
                {"title": "Trend 2", "description": "Description 2"},
                {"title": "Trend 3", "description": "Description 3"}
            ]
        }
    
    # Get expert experiences
    expert_experiences = generate_expert_experiences(sector)
    
    # Scrape free courses
    free_courses = scrape_free_courses(sector)
    
    # Scrape job listings
    related_jobs = scrape_job_listings(sector)
    
    # Generate growth chart data
    growth_chart = generate_growth_chart_data(sector)
    
    return {
        "title": title,
        "description": description,
        "category": category,
        "difficulty": difficulty,
        "jobGrowth": job_growth,
        "studyGuidance": study_guidance,
        "futureScope": future_scope,
        "expertExperiences": expert_experiences,
        "freeCourses": free_courses,
        "relatedJobs": related_jobs,
        "growthChart": growth_chart
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python career_content_generator.py <sector>")
        sys.exit(1)
    
    sector = sys.argv[1]
    result = generate_c