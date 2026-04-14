# Customization & Styling

The ultimate magic of Devfoliox is that we enforce absolutely **zero vendor lock-in**. 

Once the CLI finishes generating your portfolio, you natively own every single file. The entire localized project is standard React and Tailwind CSS. You do not need to learn a proprietary "Devfoliox system".

## Global Color System

We built Devfoliox entirely on Tailwind utility classes mapped strictly to CSS Variables. To dramatically change your site's color scheme in 10 seconds, open your generated `index.css` file:

```css
:root {
  --background: #0f172a;
  --foreground: #f8fafc;
  --primary: #3b82f6; 
}
```

## Modifying Components

Want to rip out a section entirely? No problem.
Navigate to `src/components/` and simply edit the JSX. 

For instance, if you want to remove the "Languages" graph:
1. Open `src/pages/Home.jsx`
2. Delete the `<LanguageGraph />` import.
3. Save the file. Vite hot reloads instantly.

> [!TIP]
> Devfolio takes care of the notoriously difficult and asynchronous GitHub data-fetching logic so you can focus entirely on having fun building beautiful UI!