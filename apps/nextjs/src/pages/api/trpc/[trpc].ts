import { appRouter, createContext } from "@acme/api";
import { getAuth } from "@clerk/nextjs/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.cookie && req.headers.cookie != "") {
    req.headers["x-clerk-auth-status"] = "signed-in";
  }
  let userId = null;
  try {
    const auth = getAuth(req);
    userId = auth.userId;
  } catch {
    console.log("Public call or something is break, can log error here");
  }

  if (!userId) {
    req.headers.cookie = "";
  }
  return createNextApiHandler({
    router: appRouter,
    createContext,
  })(req, res);
// if (req.headers.cookie && req.headers.cookie != "") {
// req.headers["x-clerk-auth-status"] = "signed-in";
// }
// const { userId } = getAuth(req);
// if (!userId) {
// req.headers.cookie = "";
// }
// return createNextApiHandler({
// router: appRouter,
// createContext,
// })(req, res);
};
export default handler;
