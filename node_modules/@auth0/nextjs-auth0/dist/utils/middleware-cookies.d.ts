import { Cookies } from '../auth0-session/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';
export default class MiddlewareCookies extends Cookies {
    protected getSetCookieHeader(res: NextResponse): string[];
    protected setSetCookieHeader(res: NextResponse, cookies: string[]): void;
    getAll(req: NextRequest): Record<string, string>;
}
/**
 * Handle cookies with commas, eg `foo=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
 * @source https://github.com/vercel/edge-runtime/blob/90160abc42e6139c41494c5d2e98f09e9a5fa514/packages/cookies/src/response-cookies.ts#L128
 */
export declare function splitCookiesString(cookiesString: string): string[];
//# sourceMappingURL=middleware-cookies.d.ts.map