"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Clock } from "lucide-react";

export function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Card className="w-fit">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold tracking-wide">
              --:--:--
            </div>
            <div className="text-sm text-muted-foreground mt-1">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-fit bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-slate-300/40 dark:border-slate-600/40 shadow-2xl backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-md">
              <Clock className="h-5 w-5 text-slate-100" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Current Time
            </span>
          </div>
          <div className="text-3xl font-mono font-bold tracking-wider bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent mb-2">
            {formatTime(time)}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium tracking-wide">
            {formatDate(time)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
