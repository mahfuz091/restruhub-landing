export const DASHBOARD_URL = "https://dashboard.restruhub.com/";

type Props = {
  label: string;
  /** `lg` = full-size CTA with arrow, `sm` = compact header button. */
  size?: "lg" | "sm";
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Campaign CTA — the Hyperion hover (fill wipe + label roll) lives entirely
 * in campaign.css; the markup only has to supply the `.lbl > span` structure.
 */
export default function CampaignCta({
  label,
  size = "lg",
  className = "",
  style,
}: Props) {
  return (
    <a
      href={DASHBOARD_URL}
      className={`${size === "lg" ? "cta" : "cta-sm"} ${className}`.trim()}
      style={style}
    >
      <span className="lbl">
        <span>{label}</span>
      </span>
      {size === "lg" && (
        <svg
          width="9"
          height="18"
          viewBox="0 0 8 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l6 6-6 6"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}
