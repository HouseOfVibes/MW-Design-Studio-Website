# Astro Website Theme

This is a reusable Astro website theme for future projects.

## Project Structure

- `src/assets`: Static assets (images, fonts, etc.)
- `src/components`: Reusable components (Header, Footer, etc.)
- `src/content`: Content collections (e.g., blog posts)
- `src/layouts`: Base layouts for pages
- `src/pages`: Website pages
- `src/styles`: Global CSS styles
- `design`: Design files and mockups
- `content`: Content planning documents

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  **Build for production:**

    ```bash
    npm run build
    ```

## Integrations

### Facebook

**Embedding Content:**

To embed a Facebook post or video:

1.  Get the embed code from the post on Facebook.
2.  Paste the code into your `.astro` file.
3.  Wrap the code with `<div is:raw>...</div>` to ensure it renders correctly.

**Sharing Pages:**

The `<ShareToFacebook />` component makes it easy to add a share button to any page.

```astro
---
import ShareToFacebook from '../components/ShareToFacebook.astro';
---

<ShareToFacebook url={Astro.url.href} />
```
