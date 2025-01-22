import { integer, serial, pgTable, varchar} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    first_name: varchar({ length: 255 }).notNull(),
    last_name: varchar({ length: 255 }).notNull(),
    mobile_number: varchar({length:10}),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    designation: varchar({ length: 255 }),
    user_type: varchar({ length: 255 }).notNull().default('user'),
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UsersTable = typeof users;