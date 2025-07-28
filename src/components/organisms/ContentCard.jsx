import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import UserAvatar from "@/components/molecules/UserAvatar";
import ApperIcon from "@/components/ApperIcon";

const ContentCard = ({ content }) => {
  const getContentTypeInfo = (type) => {
    const types = {
      post: { label: "게시글", icon: "FileText", color: "primary" },
      lesson: { label: "강의", icon: "Play", color: "secondary" },
      event: { label: "이벤트", icon: "Calendar", color: "accent" },
      resource: { label: "자료", icon: "Download", color: "success" },
    };
    return types[type] || types.post;
  };

  const typeInfo = getContentTypeInfo(content.type);
  const timeAgo = formatDistanceToNow(new Date(content.created_at), { 
    addSuffix: true, 
    locale: ko 
  });

  const renderContentPreview = () => {
    switch (content.type) {
      case "lesson":
        return (
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <ApperIcon name="Play" size={32} className="text-white z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-3 left-3 text-white text-sm font-medium z-10">
              {content.title}
            </div>
          </div>
        );
      
      case "event":
        return (
          <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg p-4 mb-4 border border-accent-200">
            <div className="flex items-center gap-2 text-accent-700 mb-2">
              <ApperIcon name="Calendar" size={16} />
              <span className="text-sm font-medium">
                {new Date(content.starts_at).toLocaleDateString("ko-KR")}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{content.description}</p>
          </div>
        );
      
      case "resource":
        return (
          <div className="bg-gradient-to-r from-success-50 to-success-100 rounded-lg p-4 mb-4 border border-success-200">
            <div className="flex items-center gap-2 text-success-700 mb-2">
              <ApperIcon name="Download" size={16} />
              <span className="text-sm font-medium">다운로드 가능</span>
            </div>
            {content.tag && (
              <Badge variant="success" className="text-xs">
                {content.tag}
              </Badge>
            )}
          </div>
        );
      
      default:
        return (
          <div className="mb-4">
            <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
              {content.body || content.description}
            </p>
          </div>
        );
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={typeInfo.color} className="text-xs">
              <ApperIcon name={typeInfo.icon} size={12} className="mr-1" />
              {typeInfo.label}
            </Badge>
            {content.is_pinned && (
              <Badge variant="warning" className="text-xs">
                <ApperIcon name="Pin" size={12} className="mr-1" />
                고정
              </Badge>
            )}
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {timeAgo}
          </span>
        </div>
        
        <CardTitle className="text-base line-clamp-2 group-hover:text-primary-600 transition-colors">
          {content.title || (content.body?.substring(0, 50) + "...")}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {renderContentPreview()}
        
        {/* Author info */}
        {content.author && (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <UserAvatar user={content.author} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {content.author.display_name}
              </p>
              {content.author.expertise_tag && (
                <p className="text-xs text-gray-500 truncate">
                  {content.author.expertise_tag}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-gray-500">
            <button className="flex items-center gap-1 text-sm hover:text-primary-600 transition-colors">
              <ApperIcon name="Heart" size={16} />
              <span>{content.likes || 0}</span>
            </button>
            {content.type !== "resource" && (
              <button className="flex items-center gap-1 text-sm hover:text-primary-600 transition-colors">
                <ApperIcon name="MessageCircle" size={16} />
                <span>{content.comments || 0}</span>
              </button>
            )}
          </div>
          
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
            {content.type === "lesson" ? "학습하기" : 
             content.type === "event" ? "참여하기" : 
             content.type === "resource" ? "다운로드" : "더보기"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;