import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      events: true,
      comments: false,
    },
    privacy: {
      showProfile: true,
      showActivity: false,
      allowMessages: true,
    },
    preferences: {
      language: "ko",
      theme: "light",
      timezone: "Asia/Seoul",
    },
  });

  const [profileData, setProfileData] = useState({
    displayName: "준태 학습자",
    email: "juntae@example.com",
    bio: "Korean language enthusiast",
    expertiseTag: "Korean Learner",
  });

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    toast.success("설정이 저장되었습니다!");
  };

  const handleSaveProfile = () => {
    toast.success("프로필이 업데이트되었습니다!");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">설정</h1>
          <p className="text-gray-600">계정 및 앱 설정을 관리하세요.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="User" size={20} className="text-primary-600" />
                프로필 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="표시 이름"
                value={profileData.displayName}
                onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
              />
              
              <Input
                label="이메일"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              />
              
              <Input
                label="소개"
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              />
              
              <Input
                label="전문 분야"
                value={profileData.expertiseTag}
                onChange={(e) => setProfileData(prev => ({ ...prev, expertiseTag: e.target.value }))}
              />
              
              <Button onClick={handleSaveProfile} className="w-full">
                프로필 저장
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Bell" size={20} className="text-secondary-600" />
                알림 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {key === "email" ? "이메일 알림" :
                       key === "push" ? "푸시 알림" :
                       key === "events" ? "이벤트 알림" : "댓글 알림"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {key === "email" ? "이메일로 알림을 받습니다" :
                       key === "push" ? "브라우저 푸시 알림을 받습니다" :
                       key === "events" ? "새 이벤트 알림을 받습니다" : "댓글 알림을 받습니다"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Shield" size={20} className="text-accent-600" />
                개인정보 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {key === "showProfile" ? "프로필 공개" :
                       key === "showActivity" ? "활동 공개" : "메시지 허용"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {key === "showProfile" ? "다른 사용자에게 프로필을 공개합니다" :
                       key === "showActivity" ? "활동 내역을 다른 사용자에게 공개합니다" : 
                       "다른 사용자로부터 메시지를 받을 수 있습니다"}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Settings" size={20} className="text-success" />
                환경 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  언어
                </label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange("language", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  테마
                </label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handlePreferenceChange("theme", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                >
                  <option value="light">라이트 모드</option>
                  <option value="dark">다크 모드</option>
                  <option value="auto">자동</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  시간대
                </label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Asia/Seoul">서울 (GMT+9)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                  <option value="America/New_York">뉴욕 (GMT-5)</option>
                </select>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                설정 저장
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;