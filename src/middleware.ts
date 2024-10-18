import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  console.log(isSignInPage(request), convexAuth.isAuthenticated());
  if (isSignInPage(request) && convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/");
  }
  if (!isSignInPage(request) && !convexAuth.isAuthenticated()) {
    console.log("eesa");
    return nextjsMiddlewareRedirect(request, "/auth");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
