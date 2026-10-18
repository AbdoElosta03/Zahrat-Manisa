"use client";

import { AccessError } from "../_components/access/access-feedback";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return <AccessError error={error} retry={reset} />;
}
