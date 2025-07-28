import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transform hover:scale-[1.02] shadow-md hover:shadow-lg",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600 transform hover:scale-[1.02]",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 transform hover:scale-[1.02]",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 transform hover:scale-[1.02] shadow-md hover:shadow-lg",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;