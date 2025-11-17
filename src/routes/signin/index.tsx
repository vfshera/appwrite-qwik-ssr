import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="u-max-width-500 u-width-full-line">
      <h1 class="heading-level-2 u-margin-block-start-auto">Demo sign in</h1>
      <div class="u-margin-block-start-24">
        <form class="form common-section">
          <ul class="form-list" style={{ "--form-list-gap": "1.5rem" }}>
            <li class="form-item">
              <p>
                This is a demo project for{" "}
                <a href="https://appwrite.io">Appwrite</a> server side
                rendering. View the source code on the{" "}
                <a
                  class="link"
                  href="https://github.com/vfshera/appwrite-qwik-ssr"
                >
                  GitHub repository
                </a>
                .
              </p>
            </li>
            <li class="form-item">
              <label class="label is-required" for="email">
                Email
              </label>
              <div class="input-text-wrapper">
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  class="input-text"
                  autoComplete="off"
                />
              </div>
            </li>
            <li class="form-item">
              <label class="label is-required" for="password">
                Password
              </label>
              <div
                class="input-text-wrapper"
                style={{ "--amount-of-buttons": "1" }}
              >
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  minLength={8}
                  type="password"
                  class="input-text"
                  autoComplete="off"
                />
                <button
                  type="button"
                  class="show-password-button"
                  aria-label="show password"
                >
                  <span aria-hidden="true" class="icon-eye" />
                </button>
              </div>
            </li>
            <li class="form-item">
              <button class="button is-full-width" type="submit">
                Sign in
              </button>
            </li>
            <span class="with-separators eyebrow-heading-3">or</span>
            <li class="form-item"></li>
          </ul>
        </form>
        {/* <form action={signInWithGithub}>
          <button class="button is-github is-full-width" type="submit">
            <span class="icon-github" aria-hidden="true" />
            <span class="text">Sign up with GitHub</span>
          </button>
        </form> */}
      </div>
      <ul class="inline-links is-center is-with-sep u-margin-block-start-32">
        <li class="inline-links-item">
          <span class="text">
            Don't have an account?{" "}
            <Link class="link" href="/signup">
              Sign up
            </Link>
          </span>
        </li>
      </ul>
    </div>
  );
});
