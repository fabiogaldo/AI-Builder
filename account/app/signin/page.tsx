// app/signin/page.tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signIn, type FormState } from '@/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const initialState: FormState = {
    message: '',
};

function SignInButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Entrando...' : 'Entrar'}
        </Button>
    );
}

export default function SignInPage() {
    const [state, formAction] = useActionState(signIn, initialState);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Entrar</CardTitle>
                    <CardDescription>Insira seu e-mail e senha para acessar sua conta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="seu@email.com"
                                type="email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <SignInButton />
                    </form>
                    {state.message && (
                        <p className="text-sm text-red-500">
                            {state.message}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}