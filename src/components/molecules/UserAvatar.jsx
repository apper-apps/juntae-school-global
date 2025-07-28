import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const UserAvatar = ({ 
  user, 
  size = "md", 
  className,
  showOnline = false,
  ...props 
}) => {
  const sizes = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <div
        className={cn(
          "rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium ring-2 ring-white shadow-lg",
          sizes[size]
        )}
      >
        {user?.photo_url ? (
          <img
            src={user.photo_url}
            alt={user.display_name || "사용자"}
            className="w-full h-full rounded-full object-cover"
          />
        ) : user?.display_name ? (
          <span className="font-semibold">
            {user.display_name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <ApperIcon name="User" size={iconSizes[size]} />
        )}
      </div>
      {showOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-white"></div>
      )}
    </div>
  );
};

export default UserAvatar;