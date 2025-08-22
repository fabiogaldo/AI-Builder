import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // Cria uma resposta para que possamos manipular os cookies
  const response = NextResponse.next();

  // Cria o cliente Supabase para o servidor
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          request.cookies.set({ name, value, ...options });
        },
        remove(name: string, options) {
          request.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Obtém o usuário da sessão do Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Se o usuário não estiver autenticado, redireciona para a página de login
 if (!user) {
    // Redireciona para a URL completa da aplicação de autenticação
    const redirectUrl = process.env.NEXT_PUBLIC_AUTH_URL! + '/signin';
    return NextResponse.redirect(redirectUrl);
  }

  // Se o usuário estiver autenticado, continua para a rota solicitada
  return response;
}

// Configura quais rotas serão protegidas pelo middleware
export const config = {
  matcher: ['/'],
};