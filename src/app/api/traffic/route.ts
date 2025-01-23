import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await prisma.traffic.create({ data });
    return NextResponse.json(
      { message: "Traffic data recorded" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error recording traffic data:", error);
    return NextResponse.json(
      { message: "Error recording traffic data" },
      { status: 500 }
    );
  }
}
