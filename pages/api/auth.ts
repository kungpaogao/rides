import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

export async function checkAuth(req: NextApiRequest) {
  let authError;

  // check authorization
  const auth = req.headers.authorization;
  if (!auth) {
    // if missing authorization headers, return 401
    authError = new Error("Unauthorized");
    authError.name = "401";
    throw authError;
  }

  // get user
  const { user, error } = await supabase.auth.api.getUser(auth!);
  if (!user || error) {
    authError = new Error("Unauthorized");
    authError.name = "401";
    throw authError;
  }
  if (user && !user.email?.endsWith("@cornell.edu")) {
    authError = new Error("Forbidden");
    authError.name = "403";
    throw authError;
  }

  return user;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  supabase.auth.api.setAuthCookie(req, res);
};
