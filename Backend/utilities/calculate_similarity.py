import sys
import json
import asyncio
import spacy
import logging

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

async def main():
    try:
        # Read input from stdin
        input_data = json.loads(sys.stdin.read())

        # Extract topics and word list from input data
        topics = input_data.get('topics', {})
        word_list = input_data.get('word_list', [])

        # Call the calculate_similarity function
        result = await calculate_similarity(topics, word_list)

        # Log the result
        logging.info(f"Result: {result}")

        # Return the result
        result_json = json.dumps(result)
        sys.stdout.write(result_json)
        sys.stdout.flush()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Run the main function asynchronously
asyncio.run(main())
