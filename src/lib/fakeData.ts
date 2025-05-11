import type { Job } from './dbTables';

const companies = ['Cloudflare', 'Zed', 'Discord', 'Duolingo'];
const positions = [
	'Software engineer',
	'Stock plan administrator',
	'Associate creative director',
	'Director of product design',
	'iOS software engineer',
	'Country Marketing Manger'
];
const locations = ['Beijing, China', 'Brisbane, Australia', 'New York, USA', 'Warsaw, Poland'];
const departments = ['Accounting', 'Design', 'Engineering', 'Sales'];

function randomElement<T>(arr: T[]) {
	return arr[Math.floor(Math.random() * arr.length)];
}

const randomJobs: Job[] = [];
for (let i = 0; i < 20; i++) {
	randomJobs.push({
		id: i,
		company: randomElement(companies),
		position: randomElement(positions),
		department: randomElement(departments),
		location: randomElement(locations),
		url: ''
	});
}
export const jobs = randomJobs;
