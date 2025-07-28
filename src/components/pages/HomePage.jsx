import React from "react";
import { motion } from "framer-motion";
import StatsOverview from "@/components/organisms/StatsOverview";
import ActivityFeed from "@/components/organisms/ActivityFeed";
import UpcomingEvents from "@/components/organisms/UpcomingEvents";
import ContentList from "@/components/organisms/ContentList";

const HomePage = ({ searchQuery }) => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
          준태스쿨에 오신 것을 환영합니다
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          한국어 학습자들을 위한 커뮤니티 플랫폼입니다. 
          강의를 듣고, 이벤트에 참여하고, 다른 학습자들과 소통해보세요.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <StatsOverview />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {searchQuery ? `"${searchQuery}" 검색 결과` : "최신 콘텐츠"}
            </h2>
            <ContentList searchQuery={searchQuery} />
          </div>
        </motion.div>

        {/* Right Column - Activity & Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="space-y-8"
        >
          {/* Upcoming Events */}
          <UpcomingEvents limit={3} />
          
          {/* Recent Activity */}
          <ActivityFeed limit={5} />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;