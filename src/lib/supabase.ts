import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://rwnqejkyymdbkzbbgxwr.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZhMGJmOTE5LWUxODMtNDMzMS1iMWM5LTMxMTlmMzgzYjJlZCJ9.eyJwcm9qZWN0SWQiOiJyd25xZWpreXltZGJremJiZ3h3ciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcxMzQyODA1LCJleHAiOjIwODY3MDI4MDUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.4ydtMSUpY-dsB7cguXVfeMlOq1C1tL2gyQNfAukipmI';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };