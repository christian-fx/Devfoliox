# API Reference

If you want to construct your completely custom data visualization components, you can hook directly into Devfolio's robust internal data engine.

The core logical mechanism powering the portfolio is `useGitHub.js`.

## Using the Data Hook

You can import this hook into any React component inside your generated architecture.

```javascript
import useGitHub from '../hooks/useGitHub';

export default function MyCustomWidget() {
  const { profile, repos, loading, error } = useGitHub();

  if (loading) return <p>Fetching GitHub Pulse...</p>;
  if (error) return <p>Network failure occurred.</p>;

  return (
    <div>
      <h1>Hello, {profile.name}!</h1>
      <p>I have built {repos.length} awesome projects.</p>
    </div>
  );
}
```

## Data Schemas

The `profile` object contains strictly mapped data:
* `profile.login`: Username handle
* `profile.name`: Full displayed name
* `profile.avatar_url`: External image path
* `profile.public_repos`: Integer quantity

The `repos` object is an Array holding strictly the 6 most starred repositories. You can adjust the `sort` or `per_page` limit directly inside the `useGitHub.js` hook file if you need more data!