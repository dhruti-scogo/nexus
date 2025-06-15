"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const analyticsOptions = [
  { name: "User Analytics", href: "/dashboard/analytics" },
  { name: "Global Analytics", href: "/dashboard/analytics/global" },
  { name: "Depth Analytics", href: "/dashboard/analytics/depth" },
];

export function AnalyticsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const currentOption = analyticsOptions.find(option => 
    pathname === option.href || 
    (pathname.startsWith("/dashboard/analytics") && option.href === "/dashboard/analytics" && pathname === "/dashboard/analytics")
  ) || analyticsOptions.find(option => pathname.startsWith(option.href)) || analyticsOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 font-semibold text-sm hover:text-gray-600"
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        Analytics
        <ChevronDown className="h-3 w-3" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[160px]">
          {analyticsOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                pathname === option.href ? "bg-gray-50 text-indigo-600 font-medium" : "text-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 