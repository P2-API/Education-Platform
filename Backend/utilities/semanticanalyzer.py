import spacy

# Load the Danish spaCy model
nlp = spacy.load("da_core_news_lg")

# Define keywords and their corresponding word collections
keywords_collections = {
    "Matematik": ["Matematik", "Modellering", "Programmering", "Statistik"],
    "Sundhedsvæsen": ["Sundhedsvæsen", "hospital", "sygdom", "medicin"],
    "Økonomi": ["Finans", "Økonomi", "Regnskab", "Virksomhed"],
    "Kommunikation": ["Kommunikation", "Sprog", "Journalistik", "Medier"],
    "Markedsføring": ["Markedsføring", "Målgruppe", "Branding",  "Reklame"],
    "Kunst": ["Kunst", "Billedkunst", "Musik", "Litteratur"],
    "Naturvidenskab": ["Naturvidenskab", "Fysik", "Fysik", "Fysik"],
    "IT": ["Informationsteknologi", "Software", "Teknologi", "Data"],
}

# Define your Danish words
word_list = [
'Computerprogrammering',
'Datavidenskab',
'Data',
'Computer',
'Videnskab',
'Software',
'Videnskabens grene',
'Informationsteknologi',
'Computing',
'Teknologi',
'Matematik'
]

# Calculate similarity scores for each keyword
rankings = {subject: 0 for subject in keywords_collections}

for subject in keywords_collections:
    similarity_scores = 0
    for word in keywords_collections[subject]:
        for keyword in word_list:
            similarity_scores += nlp(word).similarity(nlp(keyword))
            if keywords_collections[subject][0] == word: # If the word is the first word in the list
                similarity_scores *= 0.5
    rankings[subject] = similarity_scores



# Print the sum of similarity scores for each keyword
for subject in rankings:
    print(f"{subject}: {rankings[subject]}")