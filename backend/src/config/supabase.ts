import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Tenta ler diretamente o arquivo backend/.env se existir
const backendEnvPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(backendEnvPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(backendEnvPath));
    // Força a sobrescrita das variáveis de ambiente
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
    console.log(`Loaded env from: ${backendEnvPath}`);
} else {
    console.log(`Env file not found at: ${backendEnvPath}, trying cwd...`);
    dotenv.config(); // Fallback
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;



if (!supabaseUrl || !supabaseKey) {
  throw new Error('Credenciais do Supabase não configuradas (SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY faltando)');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
