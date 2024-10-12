import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const customer=pgTable("customer",{
    id:serial("id").primaryKey(),
    firstName:varchar("firstName",{length:100}).notNull(),
    lastName:varchar("lastName",{length:100}).notNull(),
    email:varchar("email",{length:100}).unique().notNull(),
    password:varchar("password",{length:100}).notNull(),
    role:varchar("role",{length:12}).notNull().default("customer"),
    updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`)
})