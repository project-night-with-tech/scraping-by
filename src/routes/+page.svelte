<script lang="ts">
	import {
		Button,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		A,
		Dropdown,
		Search,
		Checkbox,
		DropdownGroup,
		Table
	} from 'flowbite-svelte';
	import { type Job } from '$lib/dbTables';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	import '../app.css';

	let { data }: { data: { jobs: Job[] } } = $props();

	let companies = $state(
		Array.from(new Set(data.jobs.map((job) => job.company))).map((job) => {
			return { name: job, checked: true };
		})
	);

	let searchTerms = $state({ position: '', department: '', location: '' });
	let filteredJobs = $derived(
		data.jobs.filter((job) => {
			if (
				searchTerms.position &&
				!job.position.toLowerCase().includes(searchTerms.position.toLowerCase())
			)
				return false;
			if (
				searchTerms.department &&
				!job.department.toLowerCase().includes(searchTerms.department.toLowerCase())
			)
				return false;
			if (
				searchTerms.location &&
				!job.location.toLowerCase().includes(searchTerms.location.toLowerCase())
			)
				return false;
			return companies.some((company) => company.checked === true && company.name === job.company);
		})
	);

	let pageNumber = $state(0);
	const pageLength = 10;
	let pagedJobs = $derived(
		filteredJobs.slice(pageNumber * pageLength, pageNumber * pageLength + pageLength)
	);
	function maxPages() {
		return Math.ceil(filteredJobs.length / pageLength);
	}
	// in case the user's search reduces the max number of pages to less than pageNumber
	$effect(() => {
		// this will always be true, I just want pageNumber to update when the jobs are filtered
		if (filteredJobs.length > -1) {
			pageNumber = 0;
		}
	});
</script>

<Button
	onclick={() => {
		for (let company of companies) {
			company.checked = true;
		}
		searchTerms = { position: '', department: '', location: '' };
	}}>Clear filters</Button
>

<Table hoverable>
	<TableHead>
		<TableHeadCell
			><p>Company</p>

			<Button color="light" size="sm"
				>Filter<ChevronDownOutline class="ms-2 h-6 w-6 text-black dark:text-black" /></Button
			>
			<Dropdown>
				<DropdownGroup class="h-30 overflow-y-scroll">
					{#each companies as company (company.name)}
						<li class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Checkbox bind:checked={company.checked}>{company.name}</Checkbox>
						</li>
					{/each}
				</DropdownGroup>
			</Dropdown>
		</TableHeadCell>
		<TableHeadCell>
			<p>Position</p>
			<Search size="md" color="light" bind:value={searchTerms.position} />
		</TableHeadCell>
		<TableHeadCell
			><p>Department</p>
			<Search size="md" color="light" bind:value={searchTerms.department} />
		</TableHeadCell>
		<TableHeadCell
			><p>Location</p>
			<Search size="md" color="light" bind:value={searchTerms.location} />
		</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each pagedJobs as job (job.id)}
			<TableBodyRow>
				<TableBodyCell>{job.company}</TableBodyCell>
				<TableBodyCell><A href={job.url}>{job.position}</A></TableBodyCell>
				<TableBodyCell>{job.department}</TableBodyCell>
				<TableBodyCell>{job.location}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<Button onclick={() => (pageNumber > 0 ? pageNumber-- : null)}>Previous page</Button>
{#if maxPages() > 0}{pageNumber + 1} of {maxPages()} pages with{/if}
{filteredJobs.length} jobs in total
<Button onclick={() => (pageNumber < maxPages() - 1 ? pageNumber++ : null)}>Next page</Button>
