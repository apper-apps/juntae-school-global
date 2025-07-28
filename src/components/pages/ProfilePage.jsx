import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import UserAvatar from "@/components/molecules/UserAvatar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { userService } from "@/services/api/userService";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getCurrentProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProfile} />;
  if (!profile) return <Error message="프로필을 불러올 수 없습니다." onRetry={loadProfile} />;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600"></div>
          <CardContent className="p-6 -mt-16 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <UserAvatar user={profile} size="xl" className="ring-4 ring-white" />
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {profile.display_name}
                    </h1>
                    {profile.expertise_tag && (
                      <Badge variant="primary" className="mb-2">
                        {profile.expertise_tag}
                      </Badge>
                    )}
                    <p className="text-gray-600">
                      {profile.bio || "아직 소개가 없습니다."}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <ApperIcon name="Edit" size={16} />
                    프로필 편집
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ApperIcon name="BookOpen" size={20} className="text-primary-600" />
              학습 진도
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">완료된 강의</span>
                <span className="font-semibold">{profile.stats?.completedLessons || 0}개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">학습 시간</span>
                <span className="font-semibold">{profile.stats?.studyHours || 0}시간</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profile.stats?.progress || 0}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600">
                전체 진도 {profile.stats?.progress || 0}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ApperIcon name="Users" size={20} className="text-secondary-600" />
              커뮤니티 활동
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">작성한 게시글</span>
                <span className="font-semibold">{profile.stats?.posts || 0}개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">댓글</span>
                <span className="font-semibold">{profile.stats?.comments || 0}개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">받은 좋아요</span>
                <span className="font-semibold">{profile.stats?.likes || 0}개</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ApperIcon name="Calendar" size={20} className="text-accent-600" />
              이벤트 참여
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">참여한 이벤트</span>
                <span className="font-semibold">{profile.stats?.events || 0}개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">다운로드한 자료</span>
                <span className="font-semibold">{profile.stats?.downloads || 0}개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">가입일</span>
                <span className="font-semibold">
                  {new Date(profile.created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Activity" size={20} className="text-primary-600" />
              최근 활동
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.recentActivity?.length > 0 ? (
                profile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="CheckCircle" size={16} className="text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="Clock" size={48} className="mx-auto mb-3 text-gray-400" />
                  <p>아직 활동 기록이 없습니다.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;