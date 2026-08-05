"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";
import Link from "next/link";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="card w-full max-w-[380px] p-8">
        <div className="mb-1 text-xl font-extrabold text-tx">
          Sali <b className="text-ac">Agency</b>
        </div>
        <div className="mb-8 text-[12.5px] text-tx3">Admin Console · Sign in to continue</div>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-tx2">Email</label>
            <input type="email" name="email" required placeholder="admin@saliagency.com" className="field" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-tx2">Password</label>
            <input type="password" name="password" required placeholder="Enter password" className="field" />
          </div>

          {state?.error && (
            <div className="rounded-full bg-red-50 px-4 py-2.5 text-center text-[13px] text-red-600 dark:bg-red-950 dark:text-red-300">
              {state.error}
            </div>
          )}

          <button type="submit" disabled={pending} className="mt-2 w-full rounded-full bg-[#4a5568] py-3 text-[15px] font-bold text-white shadow-neu transition-colors hover:bg-[#2d3748] disabled:opacity-60">
            {pending ? "Signing in…" : "Sign In"}
          </button>

          <Link href="/" className="mt-2 text-center text-[12.5px] text-tx3 hover:text-ac">
            ← Back to site
          </Link>
        </form>
      </div>
    </div>
  );
}
