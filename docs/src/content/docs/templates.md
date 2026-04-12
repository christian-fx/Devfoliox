# Templates

Devfolio ships with two deeply structured templates. Unlike standard UI kits, these templates completely dictate the React Component Tree that is generated.

## 1. The Minimal Template
Clean, distraction-free, and focused heavily on typography. It is built to mimic the stark aesthetic of engineering documents.

* **Best for**: Backend engineers, data scientists, and technical writers.
* **Tech Stack**: React + Tailwind CSS
* **Features**: System fonts, monochromatic color palette, pure CSS grid layouts without heavy JavaScript interventions.

## 2. The Modern Template
A highly dynamic, visually engaging layout designed to stop recruiters in their tracks. It utilizes fluid animations and dense visual hierarchies.

* **Best for**: Frontend engineers, designers, and creative developers.
* **Tech Stack**: React + Tailwind CSS + Framer Motion
* **Features**: Scroll-triggered staggering animations, glassmorphic cards, colorful accent gradients, and dynamic hover states on repository cards.

> [!WARNING]
> Switching templates *after* generation is currently not supported via the CLI, as templates have vastly different internal component structures. If you wish to switch templates, simply run the CLI again in a new directory!