export function generateCookie(token: string): string {
    // cookie includes the token and the HttpOnly flag
    // HttpOnly flag prevents client-side JS from reading the cookie
    // Path=/ means the cookie is available on all routes
    return `Authorization=${token}; HttpOnly; Path=/; Max-Age=3600*24`;
}