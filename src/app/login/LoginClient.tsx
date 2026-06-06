"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type LoginClientProps = {
  nextPath?: string;
  errorParam?: string;
};

function sanitizeNextPath(nextPath: string | undefined) {
  if (!nextPath || !nextPath.startsWith("/")) {
    return "/admin";
  }

  return nextPath;
}

export default function LoginClient({ nextPath, errorParam }: LoginClientProps) {
  const router = useRouter();
  const safeNextPath = useMemo(() => sanitizeNextPath(nextPath), [nextPath]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(errorParam === "forbidden" ? "No tenés permisos para entrar a admin." : "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setMessage("Email o contraseña inválidos.");
      setLoading(false);
      return;
    }

    const role = data.user.user_metadata?.role;
    if (role !== "admin") {
      await supabase.auth.signOut();
      setMessage("Tu usuario no tiene permisos de administrador.");
      setLoading(false);
      return;
    }

    router.replace(safeNextPath);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-rm-black relative overflow-hidden px-6 py-10 flex items-center justify-center">
      <div className="glow-bg-blue w-[700px] h-[700px] top-[-180px] left-1/2 -translate-x-1/2 opacity-50" />
      <div className="glow-bg-blue w-[420px] h-[420px] bottom-[-120px] right-[-100px] opacity-30" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <section className="liquid-glass glass-shine rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[520px]">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
              <Image src="/images/logo-rm.png" alt="RM Logo" width={180} height={60} className="object-contain h-14 w-auto shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rm-text-muted font-bold mb-1">Acceso privado</p>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">Ingreso al panel</h1>
              </div>
            </div>

            <p className="text-rm-text-muted text-lg leading-relaxed max-w-xl mb-8">
              Ingresá con tu cuenta de administrador para revisar inventario, órdenes y ventas. El acceso se valida por sesión y rol.
            </p>

            <div className="space-y-4">
              <div className="liquid-glass-subtle rounded-2xl p-4 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-rm-blue shrink-0" />
                <span className="text-sm text-rm-text-muted">Solo usuarios con rol <span className="text-white font-semibold">admin</span> pueden entrar.</span>
              </div>
              <div className="liquid-glass-subtle rounded-2xl p-4 flex items-center gap-3">
                <LockKeyhole className="w-5 h-5 text-rm-blue shrink-0" />
                <span className="text-sm text-rm-text-muted">La sesión queda persistida en cookies para proteger el panel en servidor.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-sm text-rm-text-muted">
            <Link href="/" className="hover:text-white transition-colors">Volver al sitio</Link>
            <span className="hidden sm:inline">RM Servicio Técnico</span>
          </div>
        </section>

        <section className="liquid-glass glass-shine rounded-3xl p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-rm-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="admin-input pl-11"
                  placeholder="admin@tuservicio.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">Contraseña</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input"
                placeholder="••••••••"
                required
              />
            </div>

            {message ? (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 btn-pill-blue px-6 py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Validando acceso..." : "Entrar al panel"}
              {!loading ? <ArrowRight className="w-5 h-5" /> : null}
            </button>

            <p className="text-xs text-rm-text-muted leading-relaxed">
              Si ves un error de permisos, revisá que tu usuario tenga <span className="text-white font-semibold">user_metadata.role = admin</span> en Supabase.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}