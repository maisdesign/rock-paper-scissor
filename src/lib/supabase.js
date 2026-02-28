import { createClient } from '@supabase/supabase-js'
const viteUrl = import.meta.env.VITE_URL
const viteAnon = import.meta.env.VITE_ANON_KEY

export const supaClient = createClient(viteUrl, viteAnon) 