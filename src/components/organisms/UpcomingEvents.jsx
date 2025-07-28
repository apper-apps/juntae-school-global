import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow } from "date-fns";
import { ko } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { eventService } from "@/services/api/eventService";

const UpcomingEvents = ({ limit = 5 }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventService.getUpcoming(limit);
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [limit]);

  const getDateLabel = (date) => {
    if (isToday(date)) return "오늘";
    if (isTomorrow(date)) return "내일";
    return format(date, "M월 d일", { locale: ko });
  };

  const getTimeLabel = (date) => {
    return format(date, "HH:mm", { locale: ko });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadEvents} />;
  if (events.length === 0) {
    return (
      <Empty
        title="예정된 이벤트가 없습니다"
        description="새로운 이벤트가 예정되면 여기에 표시됩니다."
        actionText="이벤트 만들기"
        onAction={() => console.log("Create event")}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <ApperIcon name="Calendar" size={20} className="text-primary-600" />
          다가오는 이벤트
        </h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          전체 보기
        </button>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => (
          <motion.div
            key={event.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Date indicator */}
                  <div className="flex-shrink-0 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex flex-col items-center justify-center text-white shadow-lg">
                      <span className="text-xs font-medium leading-none">
                        {getDateLabel(new Date(event.starts_at))}
                      </span>
                      <span className="text-xs opacity-90 mt-0.5">
                        {getTimeLabel(new Date(event.starts_at))}
                      </span>
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {event.title}
                    </h3>
                    
                    {event.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ApperIcon name="Users" size={14} />
                        <span>{event.participants || 0}명 참여</span>
                      </div>

                      <Button size="sm" className="text-xs">
                        <ApperIcon name="ExternalLink" size={14} className="mr-1" />
                        참여하기
                      </Button>
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

export default UpcomingEvents;