'use client';

import { useSignIn } from '@clerk/nextjs';
import { EmailCodeFactor, SignInFirstFactor } from '@clerk/types';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verifying, setVerifying] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const codeRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    setLoading(true);
    e.preventDefault();

    if (!isLoaded && !signIn) return null;

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: email,
      });

      const isMailCodeFactor = (
        factor: SignInFirstFactor,
      ): factor is EmailCodeFactor => {
        return factor.strategy === 'email_code';
      };
      const mailCodeFactor = supportedFirstFactors?.find(isMailCodeFactor);

      if (mailCodeFactor) {
        const { emailAddressId } = mailCodeFactor;

        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        });

        setVerifying(true);

        const interval = setTimeout(() => {
          codeRef.current?.focus();
        }, 200);

        return () => clearInterval(interval);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.errors?.[0]?.code === 'form_identifier_exists') {
        setError('Este e-mail já está cadastrado, faça o login.');
      }
      console.error('Error:', JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerification(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();

    if (!isLoaded && !signIn) return null;

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push('/');
      } else {
        console.error(signInAttempt);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.errors?.[0]?.code === 'form_code_incorrect') {
        setError('Confirme o código e tente novamente.');
      }
      console.error('Error:', JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  }

  if (verifying) {
    return (
      <form onSubmit={handleVerification} className="mt-6 animate-fade">
        <label htmlFor="code" className="text-sm text-muted-foreground">
          Enviamos um código para o seu email. Insira-o abaixo.
        </label>
        <Input
          value={code}
          id="code"
          name="code"
          onChange={e => setCode(e.target.value)}
          placeholder="Ex: 123456"
          ref={codeRef}
          autoFocus
        />
        {error && (
          <label
            htmlFor="email"
            className="text-sm text-destructive dark:text-destructive-foreground"
          >
            {error}
          </label>
        )}
        <Button type="submit" className="mt-4 w-full" loading={loading}>
          Confirmar código
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 animate-fade-right">
      <label htmlFor="email" className="text-sm text-muted-foreground">
        Entrar com e-mail
      </label>
      <Input
        value={email}
        id="email"
        name="email"
        type="email"
        placeholder="E-mail"
        onChange={e => setEmail(e.target.value)}
      />
      {error && (
        <label htmlFor="email" className="text-sm text-destructive">
          {error}
        </label>
      )}
      <Button
        type="submit"
        variant="secondary"
        className="mt-4 w-full"
        loading={loading}
      >
        Continue
      </Button>
    </form>
  );
}
