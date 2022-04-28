import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  supabase.auth.api.deleteAuthCookie(req, res, {});
};
