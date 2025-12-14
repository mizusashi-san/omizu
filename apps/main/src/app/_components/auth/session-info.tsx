'use client';

import { authClient } from '@/lib/auth-client';

export const SessionInfo = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch,
  } = authClient.useSession();
  return (
    <div>
      {isPending && <p>Loading session...</p>}
      {error && <p>Error loading session: {error.message}</p>}
      {session ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
      <button type="button" onClick={() => refetch()}>
        Refresh Session
      </button>
    </div>
  );
};
