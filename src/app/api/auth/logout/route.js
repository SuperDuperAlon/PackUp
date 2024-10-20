export async function POST(req) {
    return new Response(null, {
        status: 200,
        headers: {
            'Set-Cookie': `token=${``}; HttpOnly; Secure; Max-Age=0; Path=/`,
        }
    });
}