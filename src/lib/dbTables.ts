import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const jobs = sqliteTable('jobs', {
	id: int().primaryKey({ autoIncrement: true }),
	company: text().notNull(),
	position: text().notNull(),
	department: text().notNull(),
	location: text().notNull(),
	url: text().notNull()
});
export type Job = typeof jobs.$inferSelect;
export type JobInsert = typeof jobs.$inferInsert;
