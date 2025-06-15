"use client";
import { usePathname } from "next/navigation";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDepthAnalytics = pathname === "/dashboard/analytics/depth";

  return (
    <div className="w-full">
      <div className={isDepthAnalytics ? "" : "py-8"}>{children}</div>
    </div>
  );
} 