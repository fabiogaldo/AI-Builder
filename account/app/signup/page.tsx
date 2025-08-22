'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setMessage(`Erro no cadastro: ${error.message}`);
        } else {
            setMessage('Cadastro realizado com sucesso! Verifique seu e-mail para confirmação.');
            // Opcional: Redirecionar o usuário
            // router.push('/signin');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Criar uma conta</CardTitle>
                    <CardDescription>Insira seu e-mail e senha para se cadastrar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="seu@email.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" onClick={handleSignUp} disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                    {message && (
                        <p className={message.startsWith('Erro') ? 'text-red-500' : 'text-green-500'}>
                            {message}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}