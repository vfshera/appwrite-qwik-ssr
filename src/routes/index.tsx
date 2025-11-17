import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ sharedMap, redirect, url }) => {
  const user = sharedMap.get("user");

  if (!user) {
    throw redirect(302, new URL("/signin", url).toString());
  }

  throw redirect(302, new URL("/account", url).toString());
};
