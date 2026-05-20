import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function cloneCookies(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie.name, cookie.value, cookie);
  });
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = user?.user_metadata?.role;
  const isAdmin = role === "admin";
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname.startsWith("/login");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isLoginRoute && user && isAdmin) {
    const redirectResponse = NextResponse.redirect(new URL("/admin", request.url));
    cloneCookies(response, redirectResponse);
    return redirectResponse;
  }

  if (isAdminRoute && (!user || !isAdmin)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname + request.nextUrl.search);
    if (user && !isAdmin) {
      loginUrl.searchParams.set("error", "forbidden");
    }

    const redirectResponse = NextResponse.redirect(loginUrl);
    cloneCookies(response, redirectResponse);
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
