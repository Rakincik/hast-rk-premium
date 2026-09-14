import React from "react";

interface FlagIconProps {
  code: "tr" | "en" | "de" | "ar";
  size?: number;
  className?: string;
}

export default function FlagIcon({ code, size = 16, className = "" }: FlagIconProps) {
  const radius = size / 2;

  switch (code) {
    case "tr":
      // Turkish Flag (SVG circle)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: "50%", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
        >
          <circle cx="18" cy="18" r="18" fill="#E30A17" />
          {/* White crescent */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5 9C12.5294 9 8.5 13.0294 8.5 18C8.5 22.9706 12.5294 27 17.5 27C20.1517 27 22.5284 25.8576 24.1627 24.0323C23.2382 24.338 22.2513 24.5 21.2222 24.5C16.8041 24.5 13.2222 20.9181 13.2222 16.5C13.2222 12.5312 16.108 9.23668 19.8973 8.59918C19.1172 8.53372 18.3182 8.5 17.5 8.5V9Z"
            fill="#FFFFFF"
          />
          {/* White 5-pointed star */}
          <polygon
            points="24.5,13.5 25.6,16.5 28.8,16.6 26.2,18.4 27.2,21.5 24.5,19.6 21.8,21.5 22.8,18.4 20.2,16.6 23.4,16.5"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "en":
      // UK Union Jack (SVG circle)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: "50%", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
        >
          <clipPath id="uk-circle">
            <circle cx="18" cy="18" r="18" />
          </clipPath>
          <g clipPath="url(#uk-circle)">
            <rect width="36" height="36" fill="#012169" />
            {/* White diagonals */}
            <path d="M0 0L36 36M36 0L0 36" stroke="#FFFFFF" strokeWidth="6" />
            {/* Red diagonals */}
            <path d="M0 0L36 36M36 0L0 36" stroke="#C8102E" strokeWidth="2.5" />
            {/* White cross */}
            <path d="M18 0V36M0 18H36" stroke="#FFFFFF" strokeWidth="10" />
            {/* Red cross */}
            <path d="M18 0V36M0 18H36" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    case "de":
      // Germany Flag (SVG circle)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: "50%", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
        >
          <clipPath id="de-circle">
            <circle cx="18" cy="18" r="18" />
          </clipPath>
          <g clipPath="url(#de-circle)">
            <rect y="0" width="36" height="12" fill="#111111" />
            <rect y="12" width="36" height="12" fill="#DD0000" />
            <rect y="24" width="36" height="12" fill="#FFCE00" />
          </g>
        </svg>
      );

    case "ar":
      // Arabic / Saudi Green Flag with White Emblem (SVG circle)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: "50%", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
        >
          <circle cx="18" cy="18" r="18" fill="#006C35" />
          {/* Stylized Arabic calligraphy / emblem */}
          <text
            x="18"
            y="21"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            ع
          </text>
          {/* Underline blade */}
          <rect x="10" y="24" width="16" height="1.5" rx="0.75" fill="#FFFFFF" />
        </svg>
      );
  }
}
