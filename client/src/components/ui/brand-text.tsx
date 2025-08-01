import brandTextPath from "@assets/brand_sample_text_1754028925379.png";

interface BrandTextProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
};

export function BrandText({ className = "", size = "md" }: BrandTextProps) {
  return (
    <img
      src={brandTextPath}
      alt="ADmyBRAND"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
