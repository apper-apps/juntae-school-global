import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}) => {
  const variants = {
    default: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border border-primary-300",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 border border-secondary-300",
    accent: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700 border border-accent-300",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border border-yellow-300",
    error: "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300",
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;