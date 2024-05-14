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
    "Natural Science",
    "Art",
    "History",
    "Psychology",
    "Philosophy",
    "Mathematics",
    "Architecture",
    "Music",
    "Politics",
    "Culture",
    "Health Science",
    "Law",
    "Economics",
    "Information Technology",
    "Programming",
    "Environmental Science",
    "Education",
    "Journalism",
    "Communication",
    "Religion",
    "Sociology",
    "Agricultural Science",
}

# Calculate mean similarity scores for each keyword
rankings = {}

for keyword in keywords:
    similarity_scores = []
    for word in word_list:
        similarity_scores.append(nlp(keyword).similarity(nlp(word)))
    mean_similarity = sum(similarity_scores) / len(similarity_scores)
    rankings[keyword] = mean_similarity

# Normalize via abs max normalization
max_value = max(rankings.values())
for keyword in rankings:
    rankings[keyword] = rankings[keyword] / max_value

# Write rankings to output file
output_file = sys.argv[2]
with open(output_file, 'w') as f:
    json.dump(rankings, f)
