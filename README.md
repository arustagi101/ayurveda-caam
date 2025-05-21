# California Association of Ayurvedic Medicine (CAAM) Website

This is the official website for the California Association of Ayurvedic Medicine (CAAM), built with [Next.js](https://nextjs.org). The website serves as a platform to promote, advance, and safeguard the practice of Ayurveda in California.

## Prerequisites

- Node.js 18.x or higher
- npm or pnpm
- Google Sheets API credentials (for fetching directory and event data)

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
GOOGLE_API_KEY=your_google_api_key_here
IMMERSION_SHEET_ID=your_immersion_sheet_id_here
MEMBERS_SHEET_ID=your_members_sheet_id_here
```

## Installation

```bash
pnpm install
```

## Available Scripts

```bash
# Lint code
pnpm lint

# Build for production
pnpm build

# Serve production build locally
pnpm serve
```

## Project Structure

- `/src/pages`: Page components and routes
- `/src/components`: Reusable UI components
- `/src/utils`: Utility functions including Google Sheets API integration
- `/src/types`: TypeScript type definitions
- `/public`: Static assets including images and markdown content

## Data Sources

The website fetches data from Google Sheets for:
- Professional directory listings
- Clinical immersion events

## Deployment

The site is built for static site generation (SSG) and can be deployed to any static hosting service.
