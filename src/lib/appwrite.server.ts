/* eslint-disable qwik/loader-location */
import { Client, Account } from "node-appwrite";
import { env } from "./env.server";
import {
  zod$,
  type Cookie,
  z,
  globalAction$,
  routeLoader$,
  type RequestHandler,
} from "@builder.io/qwik-city";
import type { SharedMap } from "~/types";

// The name of your cookie that will store the session
export const SESSION_COOKIE_NAME = "appwrite-qwik-ssr-session";

/**
 * Admin client, used to create new accounts
 */
export function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.APPWRITE_ENDPOINT)
    .setProject(env.APPWRITE_PROJECT_ID)
    .setKey(env.APPWRITE_API_KEY);

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
  };
}

/**
 * Session client, used to make requests on behalf of the logged in user
 */
export function createSessionClient(cookie: Cookie) {
  const client = new Client()
    .setEndpoint(env.APPWRITE_ENDPOINT)
    .setProject(env.APPWRITE_PROJECT_ID);

  const session = cookie.get(SESSION_COOKIE_NAME);

  if (!session || !session.value) {
    throw new Error("Session not found!");
  }

  client.setSession(session.value);

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
  };
}

/**
 * Signin action
 */
export const useAuthSignin = globalAction$(
  async (
    { redirectTo = "/account", ...credentials },
    { cookie, redirect, fail }
  ) => {
    try {
      const { account } = await createAdminClient();

      const session = await account.createEmailPasswordSession(credentials);

      if (!session) {
        return fail(500, { message: "Failed to sign in" });
      }

      cookie.set(SESSION_COOKIE_NAME, session.secret, {
        path: "/",
        expires: new Date(session.expire),
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      throw redirect(302, redirectTo);
    } catch (err) {
      return fail(500, {
        message:
          (err as any).code === 401
            ? "Invalid credentials."
            : " Failed to sign in",
      });
    }
  },
  zod$({
    email: z.string().email(),
    password: z.string(),
    redirectTo: z.string().optional(),
  })
);

/**
 * Get the current user
 */
export const useAuthSession = routeLoader$(async ({ sharedMap, redirect }) => {
  const user = sharedMap.get("user") as SharedMap["user"];

  if (!user) {
    throw redirect(302, "/signin");
  }

  return user;
});

/**
 * Signout action
 */
export const useAuthSignout = globalAction$(
  async ({ redirectTo = "/signin" }, { cookie, redirect }) => {
    const { account } = await createSessionClient(cookie);
    cookie.delete(SESSION_COOKIE_NAME);
    await account.deleteSession({ sessionId: "current" });

    throw redirect(302, redirectTo);
  },
  zod$({
    redirectTo: z.string().optional(),
  })
);

export const SessionMiddleware: RequestHandler = async ({
  sharedMap,
  cookie,
  url,
  redirect,
}) => {
  try {
    const { account } = createSessionClient(cookie);

    const user = (await account.get()) as SharedMap["user"];

    sharedMap.set("user", user || null);

    if (
      user &&
      ["signin", "signup"].includes(url.pathname.replace(/\//g, ""))
    ) {
      throw redirect(302, "/account");
    }
  } catch {
    sharedMap.set("user", null);
  }
};
