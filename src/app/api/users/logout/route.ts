import { clearSessionCookie } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    clearSessionCookie(res);
    return res.redirect(303, "/auth/login");
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end("Method not Allowed.");
}
