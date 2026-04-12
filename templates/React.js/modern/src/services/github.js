import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getGitHubData = async (username) => {
  // Fetches both the user profile and the last 6 updated repos simultaneously
  const [userResponse, reposResponse] = await Promise.all([
    axios.get(`${BASE_URL}/users/${username}`),
    axios.get(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=6`),
  ]);

  return {
    profile: userResponse.data,
    repos: reposResponse.data,
  };
};
