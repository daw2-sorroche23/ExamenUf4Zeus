import { createClient } from '@supabase/supabase-js'
//Creando la conexión con supabase
const supabaseUrl = 'https://duyjibsqtekzevujeeyn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1eWppYnNxdGVremV2dWplZXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NTU3ODMsImV4cCI6MjAwMDQzMTc4M30.zcyddhvPqaxcEchy7dpNiMjF_hiUvzvm09votKkDAHU'

//exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
