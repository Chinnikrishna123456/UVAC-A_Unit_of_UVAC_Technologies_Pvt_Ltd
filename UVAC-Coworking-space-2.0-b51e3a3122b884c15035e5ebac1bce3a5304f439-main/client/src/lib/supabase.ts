import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lckzbbnydwdtdbwplnvh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja3piYm55ZHdkdGRid3BsbnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MDkwMTYsImV4cCI6MjA2NjE4NTAxNn0.tJqyKfp_ioNjZWrIIa3CbbI1KKQGVF5nKchUZ42dMro'

export const supabase = createClient(supabaseUrl, supabaseKey)
