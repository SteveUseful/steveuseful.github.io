import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import mysql.connector  # To connect to MySQL

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Download VADER lexicon if not already downloaded
nltk.download('vader_lexicon')

# Initialize the VADER sentiment analyzer
sid = SentimentIntensityAnalyzer()

# Function to classify sentiment with more granularity and keyword-based overrides
def classify_sentiment(score, text):
    # Keyword-based override for specific phrases
    if "could be improved" in text.lower() or "okay, but" in text.lower():
        return 'Neutral'
    if "terrible experience" in text.lower() or "awful" in text.lower() or "very disappointed" in text.lower():
        return 'Very Negative'
    
    compound = score['compound']
    if compound >= 0.8:  # Threshold for 'Very Positive'
        return 'Very Positive'
    elif compound >= 0.3:  # Threshold for 'Positive'
        return 'Positive'
    elif compound > -0.3:  # Adjust for more neutral statements
        return 'Neutral'
    elif compound <= -0.7:  # Adjust threshold for 'Very Negative'
        return 'Very Negative'
    else:
        return 'Negative'

# Function to adjust for specific nuances in text
def adjust_for_nuances(text, score):
    # Custom adjustments based on specific phrases
    if "okay, but" in text.lower() or "could be improved" in text.lower():
        score['compound'] -= 0.4  # Increase adjustment impact
    return score
@app.route('/')
def index():
    return "Sentiment Analysis API is running."
@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        text = data.get('text', '')  # Use .get to avoid KeyError
        # Perform sentiment analysis
        sentiment_scores = sid.polarity_scores(text)
        # Adjust for nuances
        sentiment_scores = adjust_for_nuances(text, sentiment_scores)
        # Classify sentiment
        sentiment = classify_sentiment(sentiment_scores, text)
        return jsonify({'sentiment': sentiment})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# Function to process a list of texts (not used in the current implementation, but can be useful for batch processing)
def analyze_sentiments(texts):
    results = []
    for text in texts:
        # Perform sentiment analysis
        sentiment_scores = sid.polarity_scores(text)
        
        # Adjust for nuanced phrases
        sentiment_scores = adjust_for_nuances(text, sentiment_scores)
        
        # Classify sentiment based on adjusted scores and keywords
        sentiment = classify_sentiment(sentiment_scores, text)
        
        # Collect the result
        results.append({
            'text': text,
            'scores': sentiment_scores,
            'sentiment': sentiment
        })
        
        # Print each result
        print(f"Text: {text}")
        print(f"Scores: {sentiment_scores}")
        print(f"Sentiment: {sentiment}\n")
    
    return results

# Function to store results in the MySQL database
def store_results_in_db(results):
    try:
        # Connect to the database
        db = mysql.connector.connect(
            host="localhost",
            user="root",  # Default user for XAMPP, change if needed
            password="",  # Default is empty, change if needed
            database="sentiment_analysis_db"
        )
        cursor = db.cursor()

        # Insert results into the database
        for result in results:
            cursor.execute("""
                INSERT INTO sentiments (text, neg, neu, pos, compound, sentiment)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                result['text'], 
                result['scores']['neg'], 
                result['scores']['neu'], 
                result['scores']['pos'], 
                result['scores']['compound'], 
                result['sentiment']
            ))
        db.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if db.is_connected():
            cursor.close()
            db.close()

if __name__ == '__main__':
    app.run()

