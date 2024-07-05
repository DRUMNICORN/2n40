import { handleConnectionsGet } from '@/exports/handler';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse): Promise<Response> => {
  return handleConnectionsGet(req, res);
};
