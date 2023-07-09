import { withClerkMiddleware } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export default withClerkMiddleware((_req: NextRequest) => {
//   return NextResponse.next();
// });
export default authMiddleware({
  publicRoutes: [
    "/(.*)",
    // "/sign-in",
    // "sign-up",
  ],
  debug: true,
});
// Stop Middleware running on static files
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: [
  //   /*
  //    * Match request paths except for the ones starting with:
  //    * - _next
  //    * - static (static files)
  //    * - favicon.ico (favicon file)
  //    *
  //    * This includes images, and requests from TRPC.
  //    */
  //   "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  // ],
};
