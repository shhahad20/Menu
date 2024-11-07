// /src/services/schemaManager.ts
import fs from 'fs';
import { supabase } from '../config/supabaseClient';

export async function createUserSchema(userId: string) {
  const schemaName = `user_${userId}`;

  // Load and prepare the SQL file
  let sql = fs.readFileSync('../db/schemas/create_user.sql', 'utf-8');
  sql = sql.replace(/{{schema_name}}/g, schemaName);

  // Execute the SQL on Supabase
  const { data, error } = await supabase.rpc('execute_sql', { sql });
  if (error) {
    throw error;
  }
  return data;
}
