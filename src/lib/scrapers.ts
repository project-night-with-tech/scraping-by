import puppeteer, { Page } from 'puppeteer';
import type { JobInsert } from './dbTables';

export async function scrapeJobs() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// const jobs = (await duolingo(page)).concat(await cloudflare(page));
	const jobs = await duolingo(page);

	await browser.close();
	return jobs;
}

async function duolingo(page: Page): Promise<JobInsert[]> {
	const url = 'https://careers.duolingo.com';

	await page.goto(url);
	// i hate this so much, you have to click a button that's secretly an anchor
	// it links to the page you're already on but lets you see all jobs, not just the featured ones
	await page.click('#careers > footer > a');
	await page.waitForResponse((response) => response.status() === 200);

	return await page.$$eval(
		'#careers > section',
		(departments, url) => {
			// For each department section
			return Array.from(departments).flatMap((department) => {
				const departmentName = department.children[0]?.textContent?.trim() || '';
				// Find all job divs within this department section
				const jobDivs = department.querySelectorAll(':scope > div');
				return Array.from(jobDivs).map((jobDiv) => {
					const position = jobDiv.children[0];
					// replace US state codes with 'USA'
					const location = jobDiv.children[1].textContent.trim().replace(/, ..$/, ', USA');
					return {
						company: 'Duolingo',
						position: position.textContent,
						department: departmentName,
						location,
						url: url + (position?.getAttribute('href') || '')
					};
				});
			});
		},
		url
	);
}

async function cloudflare(page: Page): Promise<JobInsert[]> {
	await page.goto('https://www.cloudflare.com/careers/jobs/');
	await page.waitForSelector('#jobs-list');

	return await page.$$eval('#jobs-list > div', (jobs) =>
		jobs.slice(1).map((job) => {
			const positionElement = job.querySelector('a');
			const department = job.querySelector('p').textContent;
			const location = job.querySelector('span').textContent;
			return {
				company: 'Cloudflare',
				position: positionElement.textContent,
				department,
				location,
				url: positionElement.href
			};
		})
	);
}

/** i cannot figure about why this doesn't work */
async function zed(page: Page) {
	const url = 'https://zed.com/jobs';
	const location = 'Location: Remote (American or European time zones) or Boulder, Colorado';

	await page.goto(url);
	// Waiting for selector `section > div > div > div > ul > li > a` failed: Waiting failed: 30000ms exceeded
	const jobAnchorTagSelector = 'section > div > div > div > ul > li > a';
	await page.waitForSelector(jobAnchorTagSelector);

	const jobs = await page.$$eval(
		jobAnchorTagSelector,
		(anchors, location, url) => {
			return anchors.map((a) => ({
				company: 'Zed',
				position: a.textContent,
				location,
				url: url + a.href
			}));
		},
		// have to pass these variables in for them to be defined in the browser context
		location,
		url
	);

	return jobs;
}
