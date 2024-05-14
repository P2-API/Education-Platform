import spacy
import json
import sys
## python -m spacy download en_core_web_sm

# Load the English spaCy model
nlp = spacy.load("en_core_web_lg")

# Load input from stdin
input_data = sys.stdin.read()
word_list = json.loads(input_data)["words"]

# Define keywords and their corresponding word collections
keywords_collections = {
    "Natural Science": ["Natural Science","Biology","Chemistry","Geology"],
    "Art": ["Art", "Theater", "Sculpture", "Photography"],
    "History": ["History", "Archaeology", "Timeline", "Cultural Heritage"],
    "Psychology": ["Psychology", "Mental Health", "Behavior", "Therapy"],
    "Philosophy": ["Philosophy", "Ethics", "Logic", "Metaphysics"],
    "Mathematics": ["Mathematics", "Geometry", "Calculus", "Statistics"],
    "Architecture": ["Architecture", "Urbanism", "Building Design", "Sustainability"],
    "Music": ["Music", "Harmony", "Composition", "Performance"],
    "Politics": ["Politics", "Democracy", "Power Distribution", "Political System"],
    "Culture": ["Culture", "Traditions", "Artistic Expression", "Identity"],
    "Health Science": ["Health Science", "Epidemiology", "Medical Research", "Healthcare"],
    "Law": ["Law", "Legal System", "Legislation", "Legal Responsibility"],
    "Economics": [ "Economics", "Market Dynamics", "Capitalism", "Microeconomics"],
    "Information Technology": ["Information Technology", "Network Security", "Data Analysis", "Software Development"],
    "Programming": ["Programming", "Algorithms", "Web Development", "Object-Oriented Programming"],
    "Environmental Science": ["Environmental Science", "Climate Change", "Principles of Sustainability", "Ecological Balance"],
    "Education": ["Education", "Learning Theory", "Pedagogy", "School Leadership"],
    "Journalism": ["Journalism", "Press Ethics", "News Reporting", "Editorial Process"],
    "Communication": ["Communication", "Interpersonal Communication", "Mass Communication", "Digital Communication"],
    "Religion": ["Religion", "Theology", "Religious Practice", "Spiritual Development"],
    "Sociology": ["Sociology", "Social Structures", "Social Movements", "Cultural Diversity"],
    "Agricultural Science": ["Agricultural Science", "Agronomy", "Animal Husbandry", "Sustainable Agricultural Practices"]
}

# Calculate similarity scores for each keyword
rankings = {subject: 0 for subject in keywords_collections}

for subject in keywords_collections:
    similarity_scores = 0  
    for word in keywords_collections[subject]:
        for keyword in word_list:
            similarity_scores += nlp(word).similarity(nlp(keyword))
    similarity_scores /= len(keywords_collections[subject])
    rankings[subject] = similarity_scores

# Normalize via abs max normalization
max_value = max(rankings.values())
for subject in rankings:
    rankings[subject] = rankings[subject] / max_value


# Print the sum of similarity scores for each keyword
for subject in rankings:
    print(f"{subject}: {rankings[subject]}")


# Print JSON to stdout
sys.stdout.write(json.dumps(rankings))