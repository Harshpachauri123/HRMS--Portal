'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyRound, UserRound } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();

  // Mock user data (replace or adapt as needed since useAuth was removed)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Profile &amp; password</h2>
        <p className="mt-1 text-sm text-slate-600">Review your account details and manage your password.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
            <UserRound className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">Account details</h3>
            <p className="text-sm text-slate-500">Your signed-in profile</p>
          </div>
        </div>
        <dl className="grid gap-4 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
            <dd className="mt-1 break-all text-sm font-medium text-slate-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role</dt>
            <dd className="mt-1 text-sm font-medium capitalize text-slate-900">{user.role.replaceAll('_', ' ').toLowerCase()}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <KeyRound className="mt-0.5 h-5 w-5 text-slate-500" />
          <div>
            <h3 className="font-semibold text-slate-900">Password</h3>
            <p className="mt-1 text-sm text-slate-600">Request a secure password reset using your email.</p>
          </div>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Change password
        </Link>
      </div>
    </section>
  );
}
