# GitHub Integration

The backbone of Devfoliox is its seamless connection to the GitHub Public REST API. 

## How It Works
When your React application mounts in the browser, the `useGitHub.js` hook immediately fires asynchronous GET requests to GitHub's servers to construct your profile.

We intentionally hit three separate endpoints in sequence:

1. **User Profile (`/users/<username>`)**
   Fetches your avatar, bio, location, followers, and public repository count.
2. **Repositories (`/users/<username>/repos`)**
   Fetches your public repositories, sorts them aggressively by Stargazer count, and filters out forks unless specified.
3. **Language Statistics (`/repos/<username>/<repo>/languages`)**
   Calculates exactly how many bytes of source code you have written per language across your top repos to generate a weighted skill graph.

## Rate Limiting Note
> [!WARNING]
> GitHub aggressively limits unauthenticated API pinging to strictly **60 requests per hour per IP**.

If you are just developing locally, you will rarely hit this limit. However, if your portfolio begins receiving heavy traffic, your visitors may see "API Error" messages. To circumvent this, read the [Environment Variables](/documentation/environment) page to learn how to attach a secure PAT (Personal Access Token).