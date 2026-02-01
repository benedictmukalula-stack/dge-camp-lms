import { Pool, PoolClient, QueryResult } from "pg";

// Lazy-initialized connection pool to Supabase Postgres via DATABASE_URL.
// Creating the Pool does NOT connect to the database; it only allocates
// the client wrapper. Connections are opened on first query at runtime.
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

export async function getClient(): Promise<PoolClient> {
  const p = getPool();
  return p.connect();
}

export async function query(
  text: string,
  params?: any[]
): Promise<QueryResult<any>> {
  const p = getPool();
  return p.query(text, params);
}
