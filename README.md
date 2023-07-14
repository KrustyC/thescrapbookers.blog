[![Crowdin](https://badges.crowdin.net/the-scrapbookers-blog/localized.svg)](https://crowdin.com)

This is a [Next.js](https://nextjs.org/) project which implements the code for The Scrapbookers blog, which can be found at https://thescrapbookers.blog.

## Getting Started

First, install all dependencies with `npm run install`.

Then you will need to setup the environemnt variables for the project. The easiest way is to copy the `.env` file into a `.env.local` file and then populate the variables with the right values.

Once the variable are populated, you can run the app with:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Translations

This repo is translated into English and Italian through the usage of the [next-intl]() library. The translation files can be found under the [src/messages folder](./src/messages/).

## Deploy on Vercel

This repo is automatically deployed to Vercel everytime a push to the `main` branch occurs.
