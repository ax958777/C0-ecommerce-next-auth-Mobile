import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import jwt from "jsonwebtoken";

export async function verifySession(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return false;
  }
  return true;
}

export async function verifyMobileToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    return !!decoded;
  } catch (error) {
    return false;
  }
}
