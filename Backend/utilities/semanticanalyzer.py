import spacy

# Load the Danish spaCy model
nlp = spacy.load("da_core_news_lg")

# Define the words to compare against
words_to_compare = [
    "Matematik",
    "Sundhedsvæsen", 
    "Computer",
    "Kunst",
    "Naturvidenskab",
    "Økonomi",
    "Finans",
    "Kommunikation",
    "Medicin"
]

# Define your Danish words
word_list = [
  'sygepleje',
  'sygeplejerske',
  'semestre',
  'patient',
  'pårørende',
  'borger',
  'klinisk',
  'processer',
  'hospital',
  'fagfolk'
]

# Calculate the similarity between each word to compare and each word in the list
word_similarities = {word: {} for word in words_to_compare}
for compare_word in words_to_compare:
    for word in word_list:
        similarity = nlp(compare_word).similarity(nlp(word))
        word_similarities[compare_word][word] = similarity

# Compute the sum of similarities for each word to compare
sum_similarities = {word: sum(similarities.values()) for word, similarities in word_similarities.items()}

# Round the sum of similarities to two decimal places
rounded_sum_similarities = {word: round(similarity, 2) for word, similarity in sum_similarities.items()}

# Print the rounded sum of similarities for each word to compare
for word, similarity in rounded_sum_similarities.items():
    print(f"Sum of similarities for '{word}': {similarity}")
