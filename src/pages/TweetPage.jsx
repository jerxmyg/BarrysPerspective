import React, { useEffect, useState } from "react";
import "./TweetPage.css"; // Ensure you have styling for the tweets page

export const TweetPage = () => {
  const [tweets, setTweets] = useState([]); // State to store tweets
  const [error, setError] = useState(null); // State to handle errors
  const username = "doulayegotgame"; // Twitter username to fetch tweets from

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Step 1: Get user ID by username from the proxy server
        const userResponse = await fetch(`http://localhost:5001/api/user/${username}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const userData = await userResponse.json();
        const userId = userData.data.id;

        // Step 2: Fetch tweets by user ID from the proxy server
        const tweetsResponse = await fetch(`http://localhost:5001/api/tweets/${userId}`);
        if (!tweetsResponse.ok) {
          throw new Error("Failed to fetch tweets.");
        }
        const tweetsData = await tweetsResponse.json();

        setTweets(tweetsData.data); // Save tweets in state
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchTweets();
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="tweet-page">
      <h1>{username}'s Tweets</h1>
      <div className="tweets-container">
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div key={tweet.id} className="tweet">
              <p>{tweet.text}</p>
            </div>
          ))
        ) : (
          <p>Loading tweets...</p>
        )}
      </div>
    </div>
  );
};

export default TweetPage;
