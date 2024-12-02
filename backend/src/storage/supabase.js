const { createClient } = require('@supabase/supabase-js')
const { supabaseKey, supabaseUrl } = require('../config/config')

exports.supabase = createClient(supabaseUrl, supabaseKey)