# Doodle Quote Diary

A playful quotes web app built with **React + Vite** that fetches quotes from the FreeAPI Quotes endpoint and presents them in a cute doodle-style card interface.

## Live Demo

Hosted URL: **https://doodle-quote-diary.vercel.app/**

## Project Overview

This project was created for:

- **FreeAPI: Quotes Listing Application**
- **Web Dev Cohort 2026**

The app fetches quotes from the public FreeAPI endpoint, supports searching, and allows users to browse quotes one at a time using previous/next controls.

## Features

- Fetches quotes from all available API pages (30 pages, 300 quotes)
- Search functionality (filters by quote content, author, and tags)
- Single quote per page browsing (`Prev` / `Next`)
- Reusable component architecture
- Custom pastel doodle UI inspired by sticky-note/reminder aesthetics
- Responsive layout for desktop and mobile

## Tech Stack

- **React** (Functional components + hooks)
- **Vite** (Dev server and build tooling)
- **CSS** (Custom styling, no UI framework)
- **FreeAPI** public quotes endpoint

## API Used

Base endpoint:

`https://api.freeapi.app/api/v1/public/quotes`

The app loads all quotes with paginated requests using:

`?page=<pageNumber>&limit=10`

## Project Structure

```text
Quotes-Listing-Application/
+- src/
�  +- components/
�  �  +- Header.jsx
�  �  +- QuoteCard.jsx
�  �  +- PrevButton.jsx
�  �  +- NextButton.jsx
�  +- App.jsx
�  +- App.css
�  +- index.css
�  +- main.jsx
+- index.html
+- package.json
+- README.md
```

## Component Breakdown

- `Header`:
  - Displays app title and result count
  - Contains search form
- `QuoteCard`:
  - Displays quote content, author, and all tags
- `PrevButton` / `NextButton`:
  - Navigates between filtered quote results
- `App`:
  - Handles data fetching, filtering, pagination state, loading, and error handling

## How Search Works

Search input is matched against:

- quote content
- author name
- tags

Filtering is case-insensitive.

## Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Quotes-Listing-Application
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## UI Notes

The visual style includes:

- Irregular pastel rainbow background
- Handwritten-style typography
- Decorative tape-inspired quote card accents
- Soft, friendly, doodle-like interface

## Deployment

This app is deployed on **Vercel**:

- https://doodle-quote-diary.vercel.app/

## Future Improvements

- Add random quote mode
- Add favorites/bookmark support
- Add copy/share quote actions
- Add category/tag chips with click-to-filter

## Author

Built by **Nausheen Faiyaz** as part of the FreeAPI Quotes Listing project.
