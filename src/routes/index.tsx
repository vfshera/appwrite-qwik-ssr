import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ sharedMap, redirect }) => {
  const user = sharedMap.get("user");

  if (!user) {
    throw redirect(302, "/signin");
  }

  throw redirect(302, "/account");
};
