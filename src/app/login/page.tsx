import { Suspense } from "react";
import LoginClient from "./LoginClient";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <Suspense fallback={null}>
      <LoginClient nextPath={resolvedSearchParams?.next} errorParam={resolvedSearchParams?.error} />
    </Suspense>
  );
}