import spacy

# Load the Danish spaCy model
nlp = spacy.load("da_core_news_lg")

# Define keywords and their corresponding word collections
keywords_collections = {
    "Matematik": ["Matematik", "Algebra"],
    "Sundhedsvæsen": ["Omsorg", "Sundhed", "hospital", "sygdom", "medicin"],
    "Økonomi": ["Økonomi", "Regnskab", "Virksomhed", "Forretning", "Statistik"],
    "Kommunikation": ["Argumentation", "Jura", "Journalistik", "Medie", "Organisation", "Research", "Strategi", "Kultur", "Kampagne", "Politik"],
    "Markedsføring": ["Markedsføring", "Målgruppe", "Værdiskabelse", "Salg", "International", "Digital marketing", "Koordinator", "Konkurrenter", "Branding",  "Reklame"],
    "Kunst": ["Kunst", "Billedkunst", "Musik", "Litteratur", "Historie", "Kultur", "Design", "Arkitektur", "Film", "Teater"],
    "Naturvidenskab": ["Naturvidenskab", "Fysik", "Matematik", "Kemi", "Biologi", "Geologi", "Miljø", "Energi", "Klima", "Teknologi"],
    "IT": ["Informationsteknologi", "Data", "Programmering", "Netværk", "Computer"],
    "Filosofi": ['Filosofi', 'Anvendt filosofi', 'Uddannelse', 'Humaniora uddannelse', 'Kognition', 'Videnskabens grene', 'Læring', 'Kognitiv videnskab', "Bachelorgrad", 'Adfærdsændring'],
    "Historie": ["Historie", "Litteratur", "Informationssøgning", "Kildekritik"],
    "Håndværk": ["Tømrer", "Murer", "Lære", "Byggeri", "Håndværk", "Erhverv", "Teknik", "Værktøj", "Materialer", "Bygning"],
    "Landbrug": ["Landbrug", "Dyr", "Planter", "Fødevarer", "Miljø", "Bæredygtighed", "Kemi", "Biologi", "Teknologi", "Jordbrug"],
    "Natur": ["Natur", "Miljø", "Bæredygtighed", "Klima", "Energi", "Vand", "Luft", "Jord", "Dyr", "Planter"],
}

# Define your Danish words
word_list = [
'Historie',
'Analyse',
'Metodologi',
'Uddannelse',
'Videnskab',
'Videnskabens grene',
'Humaniora uddannelse',
'Kommunikation',
"Bachelorgrad",
'Menneskelig kommunikation'
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