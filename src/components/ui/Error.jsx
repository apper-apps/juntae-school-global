import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className, 
  message = "오류가 발생했습니다", 
  description = "문제가 지속되면 관리자에게 문의하세요.",
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center shadow-lg">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {showRetry && onRetry && (
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={onRetry}
              className="flex items-center gap-2"
            >
              <ApperIcon name="RefreshCw" size={16} />
              다시 시도
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <ApperIcon name="RotateCcw" size={16} />
              페이지 새로고침
            </Button>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            문제가 계속 발생하면{" "}
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              고객 지원팀
            </button>
            에 문의하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;