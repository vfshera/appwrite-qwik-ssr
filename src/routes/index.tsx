import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useAuthUser } from "./plugin@auth";

export default component$(() => {
  const user = useAuthUser();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      {user.value ? (
        <>
          <p style={{ fontSize: "1.25rem" }}>
            Hello {user.value.name || user.value.email}
          </p>
          <Link href="/account" class="button is-secondary is-full-width">
            Go to Account
          </Link>
        </>
      ) : (
        <>
          <Link href="/signin" class="button is-secondary is-full-width">
            Sign in
          </Link>
          <Link href="/signup" class="button is-secondary is-full-width">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
});
