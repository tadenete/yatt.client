import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated" || session?.error === "RefreshAccessTokenError") {
      router.replace("/auth/login");
    }
  }, [session]);

  return (
    <section className="container col-sm-10">
      {session && (
        <>
          <p className="no-overflow">{session.accessToken}</p>
          <button className="btn btn-primary" onClick={signOut}>
            sign out
          </button>
        </>
      )}
    </section>
  );
}

export default Home;
