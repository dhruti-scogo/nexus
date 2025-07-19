import Link from "next/link";
import Image from "next/image";
import { Shield, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
  title,
  description,
  linkHref,
  linkText,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        {/* Left Side - Auth Form */}
        <div className="flex items-center justify-center py-12 px-6">
          <div className="mx-auto w-full max-w-md">
            {/* Logo and Brand */}
            <div className="text-center mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group transition-all duration-300 mb-6"
              >
                <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Shield className="h-8 w-8 text-slate-100" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
                    Nexus
                  </span>
                  <Sparkles className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </div>
              </Link>

              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
                  {title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                  {description}
                </p>
              </div>
            </div>

            {/* Auth Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl backdrop-blur-sm p-8">
              {children}
            </div>

            {/* Additional Links */}
            {linkHref && linkText && (
              <div className="mt-6 text-center">
                <Link
                  href={linkHref}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  {linkText}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-slate-900/20 dark:from-slate-900/40 dark:via-slate-800/20 dark:to-slate-900/40 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
            alt="Nexus Security Dashboard"
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
            priority
          />
          {/* Overlay Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-6 inline-block">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
                  Enterprise Security Management
                </h2>
                <p className="text-lg text-white/95 max-w-md drop-shadow-md">
                  Advanced domain restrictions and time management for modern
                  organizations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
