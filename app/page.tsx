import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import {
  Shield,
  BarChart3,
  Users,
  Settings,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Lock,
  Clock,
} from "lucide-react";

export default function Home() {
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

        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hero Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                <Zap className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                Enterprise-Grade Domain Management
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Secure. Manage.
                </span>
                <br />
                <span className="bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 dark:from-slate-300 dark:via-slate-400 dark:to-slate-500 bg-clip-text text-transparent">
                  Control.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Advanced domain restrictions and time management for modern
                organizations.
                <br />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Keep your team focused and secure.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Link href="/dashboard" passHref>
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                Powerful Features for
                <span className="bg-gradient-to-r from-slate-600 to-slate-500 dark:from-slate-400 dark:to-slate-300 bg-clip-text text-transparent">
                  {" "}
                  Modern Teams
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Everything you need to manage domain access, monitor usage, and
                maintain security across your organization.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-lg w-fit mb-6">
                  <Shield className="h-6 w-6 text-slate-100" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                  Domain Restrictions
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Granular control over website access with time-based
                  restrictions and comprehensive monitoring.
                </p>
                <div className="mt-6 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Real-time enforcement
                  </span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-lg w-fit mb-6">
                  <BarChart3 className="h-6 w-6 text-slate-100" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                  Advanced Analytics
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Deep insights into user behavior, productivity patterns, and
                  security metrics with detailed reporting.
                </p>
                <div className="mt-6 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Comprehensive dashboards
                  </span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-lg w-fit mb-6">
                  <Users className="h-6 w-6 text-slate-100" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                  User Management
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Seamless user onboarding, role-based permissions, and
                  pod-based organization management.
                </p>
                <div className="mt-6 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Scalable architecture
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-16 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                  99.9%
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  Uptime
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                  24/7
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  Monitoring
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                  <span className="bg-gradient-to-r from-slate-600 to-slate-500 dark:from-slate-400 dark:to-slate-300 bg-clip-text text-transparent">
                    Enterprise
                  </span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  Security
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                  <span className="bg-gradient-to-r from-slate-600 to-slate-500 dark:from-slate-400 dark:to-slate-300 bg-clip-text text-transparent">
                    Real-time
                  </span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  Updates
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Nexus
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Powered by Scogo AI • Enterprise-grade domain management
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
