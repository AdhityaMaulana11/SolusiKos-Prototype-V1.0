"use client";

import { Suspense } from "react";
import ServicesProviderPageContent from "./ProviderDashboard";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ServicesProviderPageContent />
    </Suspense>
  );
}
