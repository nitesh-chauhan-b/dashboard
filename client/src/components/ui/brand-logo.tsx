import brandLogoPath from "@assets/brand_logo_1754028925378.png";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  return (
    <img
      src={brandLogoPath}
      alt="ADmyBRAND Logo"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
