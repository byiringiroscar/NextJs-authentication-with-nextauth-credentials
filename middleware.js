export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/', '/add', '/dashboard', '/profile', '/update/:path*']
}