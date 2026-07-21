import React from "react";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12">
      {children}
    </div>
  );
}
