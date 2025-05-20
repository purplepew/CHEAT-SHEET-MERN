import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import client from '@/app/lib/OAuth2Client';

export async function GET(req: NextRequest){
    const url = client.generateAuthUrl({
        scope: ['email', 'profile'],
        access_type: 'offline',
        client_id: process.env.GOOGLE_CLIENT_TOKEN_ID
    })

    return NextResponse.json(url)
}