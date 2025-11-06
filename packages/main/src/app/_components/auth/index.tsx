'use client';

import { authClient } from '@/lib/auth-client';

export const SignOutButton = () => {
  return (
    <button type="button" onClick={() => authClient.signOut()}>
      SignOut
    </button>
  );
};
