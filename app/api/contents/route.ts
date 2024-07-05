import { handleFilesGet } from "@/exports/handler";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  return handleFilesGet(req, res);
};
