## What it is
Web scrape pages like https://www.cloudflare.com/careers/jobs/ or https://zed.dev/jobs that list jobs for specific companies

Basically an alternative to Seek or Indeed (we aren't scraping them, I've just included screenshots for inspiration) but instead of employers uploading job postings we find them

This means we will need to manually configure a scraper for each website then run it every day or so

Respectfully doing web scraping:
- Only scrape web pages that don't have CAPTCHAs (i.e. simple web pages, not web apps)
- Comply with robots.txt files
- Use a user-agent header and don't try to hide that the web scraper is a robot
- Infrequently do the scraping or use something like changedetection.io
- Properly handle errors and rate limits
- Iterate through the jobs by directly scraping the job list page, rather than iterating through possible job pages by looking up job IDs

## Tools
- JavaScript/nodejs
- Typescript
- Svelte
- Cloudflare Pages and D1
- Drizzle - maybe use a Cloudflare Worker to periodically wipe the database then scrape for new jobs
- Git

### Puppeteer
The web scraping itself
https://pptr.dev/
- [CSS selectors cheat sheet](https://www.freecodecamp.org/news/css-selectors-cheat-sheet/)
- [Chrome extension for generating web scraping scripts](https://chromewebstore.google.com/detail/puppeteer-ide/ilehdekjacappgghkgmmlbhgbnlkgoid)
- You have to do something funky for console.log() to work inside $eval()

## Inspiration
Seek
![[Seek.png | 600]]
Indeed
![[Indeed.png | 600]]
Cloudflare
![[Cloudflare.png | 600]]
