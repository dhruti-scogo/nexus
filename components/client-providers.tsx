"use client";
import { SWRConfig } from "swr";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
} 