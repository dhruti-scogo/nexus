"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, BarChart3, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        ) : (
          <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm">
          <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-2xl p-6">
            <div className="flex flex-col gap-6 mt-16">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="/dashboard/analytics"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 font-medium"
              >
                <BarChart3 className="h-5 w-5" />
                Analytics
              </Link>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Theme
                  </span>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
