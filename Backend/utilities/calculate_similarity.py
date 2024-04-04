import spacy

async def calculate_similarity(topics, word_list):
    nlp = await spacy.load('en_core_web_sm')
    word_similarities = {}


    keyword_scores = {keyword: [] for keyword in topics.keys()}
    for keyword, collection in topics.items():
        for keyword_word in collection:
            for word in word_list:
                # Calculate the similarity score for each word in the collection
                similarity_score = nlp(keyword_word).similarity(nlp(word))
                keyword_scores[keyword].append(similarity_score)

    # Calculate the sum of similarity scores for each keyword
    sum_similarity_scores = {keyword: sum(scores) for keyword, scores in keyword_scores.items()}

    return sum_similarity_scores