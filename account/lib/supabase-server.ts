/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/supabase-server.ts
import { createServerClient as createSupabaseServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

           
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            // O `cookieStore` retornado por `cookies()` é somente leitura em outros
            // contextos, mas em Server Actions ele é mutável. Fazemos um "cast"
            // para `any` para contornar a verificação de tipo do TypeScript.
            cookiesToSet.forEach(({ name, value, options }) => {
              (cookieStore as any).set(name, value, {
                ...options,
                domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
              })
            })
          } catch (error) {

             console.error("➡️ ~ setAll ~ console.error(error):", console.error(error));
            // O método `set` foi chamado de um Server Component.
            // Isso pode ser ignorado se você tiver um middleware atualizando as sessões.
          }
        },
      },
    }
  )
}