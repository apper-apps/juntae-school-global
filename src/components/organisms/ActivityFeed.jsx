import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import UserAvatar from "@/components/molecules/UserAvatar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { activityService } from "@/services/api/activityService";

const ActivityFeed = ({ limit = 10 }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await activityService.getRecent(limit);
      setActivities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [limit]);

  const getActivityIcon = (type) => {
    const icons = {
      post_created: "FileText",
      lesson_completed: "CheckCircle",
      event_joined: "Calendar",
      resource_downloaded: "Download",
      comment_added: "MessageCircle",
      like_added: "Heart",
    };
    return icons[type] || "Activity";
  };

  const getActivityColor = (type) => {
    const colors = {
      post_created: "primary",
      lesson_completed: "success",
      event_joined: "accent",
      resource_downloaded: "secondary",
      comment_added: "default",
      like_added: "error",
    };
    return colors[type] || "default";
  };

  const getActivityText = (activity) => {
    const texts = {
      post_created: "새 게시글을 작성했습니다",
      lesson_completed: "강의를 완료했습니다",
      event_joined: "이벤트에 참여했습니다",
      resource_downloaded: "자료를 다운로드했습니다",
      comment_added: "댓글을 작성했습니다",
      like_added: "좋아요를 눌렀습니다",
    };
    return texts[activity.type] || "활동했습니다";
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadActivities} />;
  if (activities.length === 0) {
    return (
      <Empty
        title="최근 활동이 없습니다"
        description="커뮤니티 활동이 시작되면 여기에 표시됩니다."
        actionText="첫 게시글 작성하기"
        onAction={() => console.log("Create first post")}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">최근 활동</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          전체 보기
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card hover={false} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <UserAvatar user={activity.user} size="sm" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {activity.user.display_name}
                      </span>
                      <Badge variant={getActivityColor(activity.type)} className="text-xs">
                        <ApperIcon name={getActivityIcon(activity.type)} size={12} className="mr-1" />
                        {getActivityText(activity)}
                      </Badge>
                    </div>
                    
                    {activity.content_title && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        "{activity.content_title}"
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {formatDistanceToNow(new Date(activity.created_at), { 
                          addSuffix: true, 
                          locale: ko 
                        })}
                      </span>
                      {activity.space_name && (
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          {activity.space_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;