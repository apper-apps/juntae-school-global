import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className,
  icon = "Inbox",
  title = "데이터가 없습니다",
  description = "아직 항목이 없습니다. 첫 번째 항목을 만들어보세요!",
  actionText = "새 항목 만들기",
  onAction,
  showAction = true 
}) => {
  return (
    <div className={cn("flex items-center justify-center p-12", className)}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} size={40} className="text-gray-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {showAction && onAction && (
          <Button 
            onClick={onAction}
            className="flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="Plus" size={16} />
            {actionText}
          </Button>
        )}
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ApperIcon name="Lightbulb" size={16} />
              <span>팁과 가이드</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="HelpCircle" size={16} />
              <span>도움말</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;