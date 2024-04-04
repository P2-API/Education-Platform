import spacy

# Load the Danish spaCy model
nlp = spacy.load("da_core_news_lg")

# Define keywords and their corresponding word collections
keywords_collections = {
    "Matematik": ["Matematik", "Algebra", "Modellering", "Statistik"],
    "Sundhedsvæsen": ["Sundhedsvæsen", "hospital", "sygdom", "medicin"],
    "Økonomi": ["Finans", "Økonomi", "Regnskab", "Virksomhed"],
    "Kommunikation": ["Journalistik", "Kommunikation", "Medier", "Psykologi"],
    "Markedsføring": ["Markedsføring", "Målgruppe", "Branding",  "Reklame"],
    "Kunst": ["Kunst", "Billedkunst", "Musik", "Litteratur"],
    "Naturvidenskab": ["Naturvidenskab", "Fysik", "Biologi", "Kemi"]
}

# Define your Danish words
word_list = [
    'Journalistik',
    'Medier (kommunikation)',
    'Forskning',
    'Videnskabens grene',
    'Menneskelig kommunikation',
    'Kommunikation',
    'Humaniora uddannelse',
    'Kognition',
    'Videnskab',
    'Metodologi'
]

# Calculate similarity scores for each keyword
keyword_scores = {keyword: [] for keyword in keywords_collections.keys()}
for keyword, collection in keywords_collections.items():
    for keyword_word in collection:
        for word in word_list:
            # Calculate the similarity score for each word in the collection
            similarity_score = nlp(keyword_word).similarity(nlp(word))
            keyword_scores[keyword].append(similarity_score)

# Calculate the sum of similarity scores for each keyword
sum_similarity_scores = {keyword: sum(scores) for keyword, scores in keyword_scores.items()}

# Print the sum of similarity scores for each keyword
for keyword, score in sum_similarity_scores.items():
    print(f"Sum of similarity scores for '{keyword}': {score}")
