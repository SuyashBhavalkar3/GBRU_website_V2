"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function MaintenanceGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Avoid running on API routes
    if (pathname.startsWith("/api")) return;

    const checkMaintenance = async () => {
      try {
        const res = await fetch(`/api/maintenance-status?t=${Date.now()}`, {
          cache: "no-store"
        });
        if (res.ok) {
          const data = await res.json();
          if (data.maintenance) {
            if (pathname !== "/maintenance") {
              router.replace("/maintenance");
            }
          } else {
            if (pathname === "/maintenance") {
              router.replace("/");
            }
          }
        }
      } catch (err) {
        
      }
    };

    checkMaintenance();
    
    // Check every 10 seconds to respond dynamically to Firestore changes
    const interval = setInterval(checkMaintenance, 10000);
    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
