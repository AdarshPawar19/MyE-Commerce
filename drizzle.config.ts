import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema:'./src/lib/db/schema.ts',
    out:'./drizzle',
    dialect:"postgresql",
    dbCredentials:{
        url:"postgresql://postgres.xkcaaiyhpakgfdwuumic:hjbfahadaknjakn@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
        //url:process.env.DATABASE_URL!
    },
})