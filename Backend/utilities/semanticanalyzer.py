import spacy

# Load the Danish spaCy model
nlp = spacy.load("da_core_news_lg")

# Define keywords and their corresponding word collections
keywords_collections = {
    "Matematik": ["Matematik", "Algebra"],
    "Sundhedsvæsen": ["Omsorg", "Sundhed", "hospital", "sygdom", "medicin"],
    "Økonomi": ["Økonomi", "Regnskab", "Statistik", "Finans"],
    "Kommunikation": ["Journalistik", "Kommunikation"],
    "Markedsføring": ["Markedsføring"],
    "Kunst": ["Kunst", "Litteratur", "Teater"],
    "Naturvidenskab": ["Naturvidenskab", "Fysik", "Matematik", "Kemi", "Biologi", "Geologi", "Miljø", "Energi", "Klima", "Teknologi"],
    "IT": ["Computer", "software"],
    "Filosofi": ['Filosofi'],
    "Historie": ["Historie", "Litteratur", "Informationssøgning", "Kildekritik"],
    "Håndværk": ["Håndværk" ],
    "Landbrug": ["Landbrug", "Dyr", "Planter", "Fødevarer", "Miljø", "Bæredygtighed", "Biologi", "Jordbrug"],
    "Natur": ["Natur", "Miljø", "Bæredygtighed", "Klima", "Skov", "Vand", "Luft", "Jord", "Dyr", "Planter"],
}

# Define your Danish words
word_list = [
'Skovbrug',
'Naturmiljø',
'Naturressourcer',
'Miljøsamfundsvidenskab',
'Naturressourceforvaltning',
'Jordvidenskaber',
'Økologi',
'Skov',
'Landskab',
'Miljøbevarelse'
]

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