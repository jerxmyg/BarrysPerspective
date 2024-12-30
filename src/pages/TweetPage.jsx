import React, { useEffect, useState } from 'react';
import './TweetPage.css'

export const TweetPage = () => {
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState(null);

    const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;
    const username = 'doulayegotgame'; // Replace with your target username

    useEffect(() => {
      const fetchTweets = async () => {
        try {
          // Step 1: Get user ID by username
          const userResponse = await fetch(
            `https://api.twitter.com/2/users/by/username/${username}`,
            {
              headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
              },
            }
          );
          const userData = await userResponse.json();
          const userId = userData.data.id;
  
          // Step 2: Fetch tweets by user ID
          const tweetsResponse = await fetch(
            `https://api.twitter.com/2/users/${userId}/tweets?max_results=5`, // Adjust max_results as needed
            {
              headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
              },
            }
          );
          const tweetsData = await tweetsResponse.json();
          setTweets(tweetsData.data);
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchTweets();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div>
        <h1>Latest Tweets</h1>
        <div>
          {tweets.map((tweet) => (
            <div key={tweet.id} className="tweet">
              <p>{tweet.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TweetPage;