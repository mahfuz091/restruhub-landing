import type { SVGProps } from "react";

export function StarIcon({
  filled = true,
  ...props
}: { filled?: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.08155 1.53288C9.24417 1.1419 9.79803 1.1419 9.96065 1.53288L11.9278 6.26247C11.9964 6.4273 12.1514 6.53992 12.3293 6.55418L17.4353 6.96353C17.8574 6.99737 18.0285 7.52412 17.707 7.7996L13.8167 11.132C13.6812 11.2481 13.6219 11.4304 13.6634 11.604L14.8519 16.5866C14.9501 16.9985 14.5021 17.324 14.1407 17.1033L9.76925 14.4332C9.6169 14.3402 9.4253 14.3402 9.27296 14.4332L4.90152 17.1033C4.54015 17.324 4.09206 16.9985 4.19031 16.5866L5.37884 11.604C5.42026 11.4304 5.36105 11.2481 5.22547 11.132L1.33525 7.7996C1.01366 7.52413 1.18481 6.99737 1.60691 6.96353L6.7129 6.55418C6.89084 6.53992 7.04585 6.4273 7.1144 6.26247L9.08155 1.53288Z"
        fill={filled ? "#FFBF0F" : "#E2E2E2"}
      />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.52116 17.4548C13.9031 17.4548 17.4554 13.9025 17.4554 9.52055C17.4554 5.13859 13.9031 1.5863 9.52116 1.5863C5.1392 1.5863 1.58691 5.13859 1.58691 9.52055C1.58691 13.9025 5.1392 17.4548 9.52116 17.4548Z"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.42817"
      />
      <path
        d="M9.51947 6.34692V9.52062L11.1063 11.1075"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.42817"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({
  strokeWidth = 1.6,
  ...props
}: { strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 12.5L9.5 17L19 7"
        stroke="#009f6b"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GoogleMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.12A6.97 6.97 0 0 1 5.46 12c0-.74.13-1.45.38-2.12V7.04H2.18A11 11 0 0 0 1 12c0 1.77.43 3.44 1.18 4.96l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.5c1.62 0 3.07.56 4.21 1.65l3.16-3.16C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.43 9.14 5.5 12 5.5z"
      />
    </svg>
  );
}
