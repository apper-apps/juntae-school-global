import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ContentList from "@/components/organisms/ContentList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { spaceService } from "@/services/api/spaceService";

const SpacePage = ({ searchQuery }) => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSpace = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await spaceService.getById(spaceId);
      setSpace(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpace();
  }, [spaceId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadSpace} />;
  if (!space) return <Error message="스페이스를 찾을 수 없습니다." onRetry={loadSpace} />;

  const getSpaceDescription = (type) => {
    const descriptions = {
      course: "강의 영상과 학습 자료를 확인하고 진도를 관리하세요.",
      forum: "다른 학습자들과 자유롭게 소통하고 정보를 공유하세요.",
      event: "온라인 세미나, 워크샵 등 다양한 이벤트에 참여하세요.",
      resource: "학습에 도움이 되는 자료들을 다운로드하고 활용하세요.",
    };
    return descriptions[type] || "이 스페이스에서 다양한 콘텐츠를 확인하세요.";
  };

  const getActionButtonText = (type) => {
    const texts = {
      course: "새 강의 추가",
      forum: "새 게시글 작성",
      event: "새 이벤트 만들기",
      resource: "자료 업로드",
    };
    return texts[type] || "콘텐츠 추가";
  };

  const getActionButtonIcon = (type) => {
    const icons = {
      course: "Plus",
      forum: "PenTool",
      event: "Calendar",
      resource: "Upload",
    };
    return icons[type] || "Plus";
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Space Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ApperIcon name={space.icon} size={32} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900 mb-2">
                    {space.name}
                  </CardTitle>
                  <p className="text-gray-600">
                    {getSpaceDescription(space.space_type)}
                  </p>
                </div>
              </div>
              
              <Button className="flex items-center gap-2">
                <ApperIcon name={getActionButtonIcon(space.space_type)} size={16} />
                {getActionButtonText(space.space_type)}
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Space Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {space.stats?.totalContent || 0}
            </div>
            <div className="text-sm text-gray-600">
              {space.space_type === "course" ? "강의" : 
               space.space_type === "forum" ? "게시글" :
               space.space_type === "event" ? "이벤트" : "자료"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600 mb-1">
              {space.stats?.activeMembers || 0}
            </div>
            <div className="text-sm text-gray-600">활성 회원</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {space.stats?.thisWeek || 0}
            </div>
            <div className="text-sm text-gray-600">이번 주</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {space.stats?.engagement || 0}%
            </div>
            <div className="text-sm text-gray-600">참여도</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <ContentList 
          spaceId={spaceId} 
          contentType={space.space_type} 
          searchQuery={searchQuery}
        />
      </motion.div>
    </div>
  );
};

export default SpacePage;