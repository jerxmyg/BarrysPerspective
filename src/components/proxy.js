const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

app.get('/api/twitter/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Step 1: Get user ID
    const userResponse = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const userId = userResponse.data.data.id;

    // Step 2: Fetch user's tweets
    const tweetsResponse = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    res.json(tweetsResponse.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
