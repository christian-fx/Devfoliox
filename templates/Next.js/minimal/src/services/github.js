import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getGitHubData = async (username) => {
  const [userResponse, reposResponse] = await Promise.all([
    axios.get(`${BASE_URL}/users/${username}`),
    axios.get(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=12`),
  ]);

  return {
    profile: userResponse.data,
    repos: reposResponse.data,
  };
};
