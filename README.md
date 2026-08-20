# Savoria Restaurant - Scroll Animation Website

A cinematic scroll-based animated restaurant website built with pure HTML, Vanilla JS, and Tailwind CSS.

## Features
- 🎬 240-frame scroll animation in the background (video frames play as you scroll)
- 🍕 Full Savoria Restaurant UI with all sections
- 🛒 Working cart system with add/remove items
- 📅 Reservation modal
- 📱 Fully responsive design
- 🎨 Glassmorphism UI design

## Sections
- Hero (with scroll hint)
- Features Bar
- Our Story
- Menu with category filtering (Pizza, Burgers, Pasta, Salads, Desserts, Drinks)
- Reservation Banner
- Contact
- Footer with Newsletter

## Setup (Local)
1. Extract `restaurant_frames_30fps_jpg.zip` into a folder called `frames/`
2. Run the local server: `powershell -ExecutionPolicy Bypass -File server.ps1`
3. Open [http://localhost:8000](http://localhost:8000)

## Notes
- The `frames/` folder (240 JPG images ~220MB) is excluded from this repo due to GitHub size limits.
- Place the extracted frames in a `frames/` folder next to `index.html` to enable the scroll animation.

## Tech Stack
- HTML5 Canvas (scroll animation)
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- PowerShell HTTP Server
