'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export type FormState = {
  message: string;
}

export async function signIn(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  // Validação básica
  if (!email || !password) {
    return { message: 'E-mail e senha são obrigatórios.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { message: `Erro no login: ${error.message}` };
  }

  return redirect(process.env.NEXT_PUBLIC_DASHBOARD_URL!)
}