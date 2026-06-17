import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqcxdrcnxjzolnpionrf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY3hkcmNueGp6b2xucGlvbnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzUwNjcsImV4cCI6MjA5NjUxMTA2N30.WQofndQ0xPeI4Ze6UADJmy3VbD_kF_mfSdYXbpd5wOQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);