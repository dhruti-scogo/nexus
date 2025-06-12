"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "User Analytics", href: "/dashboard/analytics" },
  { name: "Global Analytics", href: "/dashboard/analytics/global" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={classNames(
                pathname === tab.href
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              )}
              aria-current={pathname === tab.href ? "page" : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
} 