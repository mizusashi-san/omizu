'use client';

import { authClient } from '@/lib/auth-client';

export const GoogleSignInButton = () => {
  return (
    <button
      type="button"
      onClick={async () =>
        await authClient.signIn.social({
          provider: 'google',
        })
      }
    >
      Google SignIn
    </button>
  );
};
