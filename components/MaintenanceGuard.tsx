"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function MaintenanceGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Avoid running on API routes or maintenance page itself to avoid redirect loops
    if (pathname.startsWith("/api")) return;

    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connectSSE = () => {
      eventSource = new EventSource("/api/maintenance-status");

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.maintenance) {
            if (pathname !== "/maintenance") {
              router.replace("/maintenance");
            }
          } else {
            if (pathname === "/maintenance") {
              router.replace("/");
            }
          }
        } catch (e) {}
      };

      eventSource.onerror = () => {
        // Automatically attempt to reconnect after 3 seconds on drop
        if (eventSource) {
          eventSource.close();
        }
        reconnectTimeout = setTimeout(connectSSE, 3000);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [pathname, router]);

  return null;
}
