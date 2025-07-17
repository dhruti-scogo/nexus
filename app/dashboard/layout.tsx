import { ClientProviders } from "@/components/client-providers";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { AnalyticsDropdown } from "@/components/analytics-dropdown";
import { Shield, BarChart3, Settings, Home, Sparkles } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Premium Navbar */}
        <nav className="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-700/60 shadow-lg backdrop-blur-sm sticky top-0 z-50">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-3 group transition-all duration-300"
              >
                <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Shield className="h-6 w-6 text-slate-100" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
                    Nexus
                  </span>
                  <Sparkles className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium group"
              >
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                Dashboard
              </Link>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium group">
                <BarChart3 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <AnalyticsDropdown />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <ThemeSwitcher />
              </div>
              <div className="flex items-center gap-3">
                <AuthButton />
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />

        <div className="flex-1 flex flex-col gap-20 max-w-7xl p-6 w-full">
          <ClientProviders>{children}</ClientProviders>
        </div>
      </div>
    </main>
  );
}
