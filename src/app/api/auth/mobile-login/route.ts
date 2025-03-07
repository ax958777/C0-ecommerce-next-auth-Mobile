import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      return NextResponse.json(
        { message: "Already logged in" },
        { status: 200 }
      );
    }

    console.log(request);

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "1h" }
    );

    if (user.role === "ADMIN") {
      return NextResponse.json({
        message: "Login successful",
        token,
        isSuccess: true,
        redirect: "/admin",
      });
    } else {
      return NextResponse.json({
        message: "Login successful",
        token,
        isSuccess: true,
        redirect: "/",
      });
    }
  } catch (error: any) {
    console.error("Mobile login error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
