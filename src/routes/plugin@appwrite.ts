/* eslint-disable no-empty */
import type { RequestHandler } from "@builder.io/qwik-city";
import { createSessionClient } from "~/lib/appwrite.server";
import type { SharedMap } from "~/types";

export const onRequest: RequestHandler = async ({ request, sharedMap }) => {
  try {
    const { account } = createSessionClient(request);

    const user = (await account.get()) as SharedMap["user"];

    sharedMap.set("user", user || null);
  } catch {}
};
