import { useId, type SVGProps } from "react";

import { cn } from "cn";

const PETAL_ANGLES = [-64, -48, -32, -16, 0, 16, 32, 48, 64];

/** Manisa Travel emblem (sun and waves) without wordmark. */
export function ManisaTravelMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  const clipId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn("shrink-0", className)}
      {...props}
    >
      <clipPath id={clipId}>
        <circle cx="50" cy="48" r="42" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {PETAL_ANGLES.map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="34"
            rx="5.5"
            ry="16"
            fill="#D64C27"
            transform={`rotate(${angle} 50 48)`}
          />
        ))}
        <path fill="#FEBF38" d="M31 57a19 19 0 0 1 38 0v3H31z" />
        <path fill="#063A54" d="M0 58c8-4 18-2 26 2s18 4 28 2 20-2 28 2 18 6 18 6v34H0z" />
        <path fill="#125A7F" d="M0 66c10-3 20-1 30 2s22 5 34 2 18-3 26-1 10 2 10 2v26H0z" />
        <path fill="#7DAFCF" d="M0 74c12-2 22 0 32 3s24 4 36 1 14-2 22 0 10 2 10 2v18H0z" />
        <path fill="#063A54" d="M0 84c14-1 24 1 34 3s26 3 38 0 12-2 18 0 10 1 10 1v12H0z" />
      </g>
    </svg>
  );
}
