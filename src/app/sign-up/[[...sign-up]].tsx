'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const codeRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true);

      const interval = setTimeout(() => {
        codeRef.current?.focus();
      }, 200);

      return () => clearInterval(interval);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.errors?.[0]?.code === 'form_identifier_exists') {
        setError('Este e-mail já está cadastrado, faça o login.');
      }

      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.errors?.[0]?.code === 'form_code_incorrect') {
        setError('Confirme o código e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <form onSubmit={handleVerify} className="mt-6">
        <label htmlFor="code" className="text-sm text-muted-foreground">
          Enviamos um código para o seu email. Insira-o abaixo.
        </label>
        <Input
          value={code}
          id="code"
          name="code"
          onChange={e => setCode(e.target.value)}
          placeholder="Ex: 123456"
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

        <Button type="submit" className="mt-4 w-full" isLoading={loading}>
          Confirmar código
        </Button>
      </form>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label htmlFor="email" className="text-sm text-muted-foreground">
        Cadastrar com e-mail
      </label>

      <Input
        value={emailAddress}
        id="email"
        name="email"
        type="email"
        placeholder="E-mail"
        onChange={e => setEmailAddress(e.target.value)}
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
      <Button
        type="submit"
        variant="secondary"
        className="mt-4 w-full"
        isLoading={loading}
      >
        Continue
      </Button>
    </form>
  );
}
