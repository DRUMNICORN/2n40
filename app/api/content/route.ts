import { handleFileGet, handleFilePost } from "@/utils/handler";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  return handleFileGet(req, res);
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  return handleFilePost(req, res);
};
