import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import client from "@/app/lib/OAuth2Client";
import { TokenPayload } from "google-auth-library";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code')

    if (!code) {
        return NextResponse.json({ message: 'Code is missing' }, { status: 400 })
    }

    let payload: TokenPayload | undefined

    try {
        const { tokens } = await client.getToken(code)
        client.setCredentials(tokens)

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_TOKEN_ID
        })

        payload = ticket.getPayload()

        console.log(payload?.email)
        console.log(payload?.name)

        if (!payload) {
            return NextResponse.json({ message: 'Ticket\'s payload is missing. ' }, { status: 500 })
        }

    } catch (error) {
        return NextResponse.json({ message: 'An error occurred during authentication.' }, { status: 500 });
    }

    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!)
}