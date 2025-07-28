import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ContentTypeSelector = ({ 
  selectedType, 
  onTypeChange, 
  types,
  className,
  ...props 
}) => {
  return (
    <div className={cn("flex gap-2 p-1 bg-gray-100 rounded-lg", className)} {...props}>
      {types.map((type) => (
        <button
          key={type.value}
          onClick={() => onTypeChange(type.value)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            selectedType === type.value
              ? "bg-white text-primary-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
          )}
        >
          <ApperIcon name={type.icon} size={16} />
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default ContentTypeSelector;