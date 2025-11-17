import { SignOutButton } from '@/app/_components/auth';
import { GoogleSignInButton } from '@/app/_components/auth/google';
import { SessionInfo } from '@/app/_components/auth/session-info';
import { Button } from '@omizu/components';
import { cn } from '@omizu/helpers';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className={cn("flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white", "dark:bg-black", "sm:items-start")}>
        <Button variant="outline">Button</Button>
        <GoogleSignInButton />
        <SignOutButton />
        <SessionInfo />
      </main>
    </div>
  );
}
