import { jobs } from '$lib/fakeData';
import { scrapeJobs } from '$lib/scrapers';

export async function load() {
	// return {
	// 	jobs: (await scrapeJobs()).map((job, i) => {
	// 		return { id: i, ...job };
	// 	})
	// };
	return { jobs: jobs };
}
