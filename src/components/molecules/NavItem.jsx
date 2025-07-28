import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavItem = ({ 
  to, 
  icon, 
  children, 
  badge,
  className,
  ...props 
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
          isActive
            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-sm",
          className
        )
      }
      {...props}
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            size={20} 
            className={cn(
              "transition-all duration-200",
              isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
            )}
          />
          <span className="flex-1">{children}</span>
          {badge && (
            <span className={cn(
              "inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full min-w-[20px]",
              isActive 
                ? "bg-white/20 text-white" 
                : "bg-primary-100 text-primary-700"
            )}>
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;