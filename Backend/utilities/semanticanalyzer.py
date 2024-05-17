import spacy
import json
import sys

# Load the English spaCy model
nlp = spacy.load("en_core_web_lg")

# Ensure correct usage of command line arguments
if len(sys.argv) != 3:
    print("Usage: python semanticanalyzer.py <input_file> <output_file>")
    sys.exit(1)

# Read input file containing wordList
input_file = sys.argv[1]
with open(input_file, 'r') as f:
    input_data = f.read()
word_list = json.loads(input_data)["words"]

# Define keywords
keywords = {
    "Natural Science": ["Natural Science", "Biology", "Chemistry", "Geology"],
    "Art": ["Art", "Theater", "Sculpture", "Photography"],
    "History": ["History", "Archaeology", "Timeline", "Cultural Heritage"],
    "Psychology": ["Psychology", "Mental Health", "Behavior", "Therapy"],
    "Philosophy": ["Philosophy", "Ethics", "Logic", "Metaphysics"],
    "Mathematics": ["Mathematics", "Geometry", "Calculus", "Statistics"],
    "Architecture": ["Architecture", "Urbanism", "Building Design", "Sustainability"],
    "Music": ["Music", "Harmony", "Composition", "Performance"],
    "Politics": ["Politics", "Democracy", "Power Distribution", "Political System"],
    "Culture": ["Culture", "Traditions", "Artistic Expression", "Identity"],
    "Health Science": ["Health", "Epidemiology", "Medical Research", "Healthcare"],
    "Law": ["Law", "Legal System", "Legislation", "Legal Responsibility"],
    "Economics": ["Economics", "Market Dynamics", "Capitalism", "Microeconomics"],
    "Information Technology": ["Information Technology", "Network Security", "Data Analysis", "Software Development"],
    "Programming": ["Programming", "Algorithms", "Web Development", "Object-Oriented Programming", "Computer"],
    "Environmental Science": ["Environmental", "Climate", "Principles of Sustainability", "Ecological Balance"],
    "Education": ["Education", "Learning Theory", "Pedagogy", "School Leadership"],
    "Journalism": ["Journalism", "Press Ethics", "News Reporting", "Editorial Process"],
    "Communication": ["Speech", "Interpersonal Communication", "Mass Communication", "Digital Communication"],
    "Religion": ["Religion", "Theology", "Religious Practice", "Spiritual Development"],
    "Sociology": ["Sociology", "Culture", "Movements", "Cultural Diversity"],
    "Agricultural Science": ["Agricultural", "Agronomy", "Animal Husbandry", "Sustainable Agricultural Practices"]
}

# Calculate mean similarity scores for each keyword category
rankings = {}

for category, keyword_list in keywords.items():
    similarity_scores = []
    for keyword in keyword_list:
        for word in word_list:
            similarity_scores.append(nlp(keyword).similarity(nlp(word)))
    mean_similarity = sum(similarity_scores) / len(similarity_scores)
    rankings[category] = mean_similarity

# Write rankings to output file
output_file = sys.argv[2]
with open(output_file, 'w') as f:
    json.dump(rankings, f)
