"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import NextJsError from "next/error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextJsError statusCode={500} />

        <button onClick={() => reset()}>Try Again</button>
      </body>
    </html>
  );
}
