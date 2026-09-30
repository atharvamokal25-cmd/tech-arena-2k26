import fs from 'fs';
import pg from 'pg';

const connectionString = 'postgresql://postgres:Saudnya3001@db.wrtoakhtijykfpiypacg.supabase.co:5432/postgres';

const client = new pg.Client({
  connectionString,
});

async function setupDatabase() {
  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    await client.connect();
    
    console.log('Reading SQL script...');
    const sql = fs.readFileSync('supabase-setup.sql', 'utf8');
    
    console.log('Executing SQL to create table and configure security...');
    await client.query(sql);
    
    console.log('Successfully configured Supabase database! Table and Row Level Security policies are active.');
  } catch (err) {
    console.error('Error executing SQL:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
