import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex h-full items-center justify-center align-middle">
      <SignIn path="/sign-in" />
    </div>
  );
}
