import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hccxdafqavxioxnksgsy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjY3hkYWZxYXZ4aW94bmtzZ3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MjYwMDgsImV4cCI6MjEwMjAwMjAwOH0.gF7ezDPbZTIWclieZ4sZ-J7gwSgrgS1jSNoBRFIlxyE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
