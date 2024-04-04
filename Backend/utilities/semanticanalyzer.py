import spacy

# Load the Danish spaCy model
nlp = spacy.load("da_core_news_lg")

# Definer nøgleord og deres tilhørende samlinger af ord
keywords_collections = {
    "Matematik": ["Matematik", "Analyse", "Algebra", "Modellering", "Statistik"],
    "Sundhedsvæsen": ["Patient", "hospital", "sygdom", "medicin", "behandling", "diagnose"],
    "Økonomi": ["Finans", "penge", "marked", "mikroøkonomi", "makroøkonomi", "kapitalisme", "handel", "regnskab", "statistik", "virksomhed"],
    "Kommunikation": ["Journalistik", "artikler", "spørgsmål", "medier", "psykologi", "digital"],
    "Markedsføring": ["Produkt", "målgruppe", "branding", "marked", "analyse", "strategi", "salg", "sociale medier", "digital", "reklame", "distribution"],
    "Kunst": ["Maleri", "skulptur", "billedkunst", "fotografi", "design", "grafik", "æstetik", "udstilling"],
    "Naturvidenskab": ["Biologi", "Kemi", "Fysik", "Geologi", "Astronomi", "Økologi", "Genetik", "Molekyler", "Matematik", "Modellering", "Evolution", "Atomer"]
}

# Define your Danish words
word_list = [
    'Økonomi',
    'Forretning',
    'Bachelorgrad',
    'Erhvervsøkonomi',
    'Erhvervsadministration',
    'Ledelse',
    'Organisation',
    'Viden',
    'Akademisk grad',
    'Teori'
]

# Beregn lignende scores for hvert nøgleord
keyword_scores = {keyword: 0 for keyword in keywords_collections.keys()}
for keyword, collection in keywords_collections.items():
    for word in collection:
        # Beregn summen af lignende scores for hvert nøgleord
        similarity_sum = sum(nlp(keyword).similarity(nlp(word)) for word in word_list)
        # Opdater den samlede score for nøgleordet
        keyword_scores[keyword] += similarity_sum

# Udskriv scores for hvert nøgleord
for keyword, score in keyword_scores.items():
    print(f"Score for '{keyword}': {score}")
