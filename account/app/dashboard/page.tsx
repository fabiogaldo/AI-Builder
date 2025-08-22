/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx
'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Essa função verifica se o usuário está logado
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/signin'); // Se não estiver logado, redireciona para a página de login
            } else {
                setUser(user);
            }
        };

        checkUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/signin');
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Bem-vindo, {user.email}!</h1>
            <p>Você está logado e pode ver o conteúdo protegido.</p>
            <Button onClick={handleSignOut}>Sair</Button>
        </div>
    );
}