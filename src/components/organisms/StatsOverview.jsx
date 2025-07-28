import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { statsService } from "@/services/api/statsService";

const StatsOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await statsService.getOverview();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadStats} />;
  if (!stats) return null;

  const statItems = [
    {
      label: "전체 회원",
      value: stats.totalMembers,
      icon: "Users",
      color: "primary",
      change: "+12%",
    },
    {
      label: "활성 강의",
      value: stats.activeLessons,
      icon: "BookOpen",
      color: "secondary",
      change: "+8%",
    },
    {
      label: "이번 달 이벤트",
      value: stats.monthlyEvents,
      icon: "Calendar",
      color: "accent",
      change: "+25%",
    },
    {
      label: "총 자료",
      value: stats.totalResources,
      icon: "FolderOpen",
      color: "success",
      change: "+15%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    {item.label}
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-success text-sm font-medium mb-0.5">
                      {item.change}
                    </span>
                  </div>
                </div>
                
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                  item.color === "primary" ? "from-primary-500 to-primary-600" :
                  item.color === "secondary" ? "from-secondary-500 to-secondary-600" :
                  item.color === "accent" ? "from-accent-500 to-accent-600" :
                  "from-green-500 to-green-600"
                } flex items-center justify-center shadow-lg`}>
                  <ApperIcon name={item.icon} size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;