# Templates & Stacks

Devfolio provides a flexible architecture where you can choose both your **Tech Stack** and your **Visual Template**.

## Supported Stacks

| Stack | Description | Status |
| :--- | :--- | :--- |
| **React.js** | The default experience. Flexible, component-based, and highly interactive. | **Available** |
| **Vanilla JS** | Zero dependencies, raw performance. Best for developers who want absolute control over the DOM. | **Available** |
| **Next.js** | Enterpise-grade SEO with Server-Side Rendering (SSR) and App Router support. | **Coming Soon** |

---

## 1. The Minimal Template
Clean, distraction-free, and focused heavily on typography. It is built to mimic the stark aesthetic of engineering documents.

* **Best for**: Backend engineers, data scientists, and technical writers.
* **Available in**: React, Vanilla JS
* **Features**: System fonts, monochromatic color palette, pure CSS grid layouts without heavy JavaScript interventions.

## 2. The Modern Template
A highly dynamic, visually engaging layout designed to stop recruiters in their tracks. It utilizes fluid animations and dense visual hierarchies.

* **Best for**: Frontend engineers, designers, and creative developers.
* **Available in**: React, Vanilla JS
* **Features**: Scroll-triggered staggering animations, glassmorphic cards, colorful accent gradients, and dynamic hover states on repository cards.

> [!WARNING]
> Switching templates *after* generation is currently not supported via the CLI, as templates have vastly different internal component structures. If you wish to switch templates, simply run the CLI again in a new directory!