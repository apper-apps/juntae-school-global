import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ className, spaces = [] }) => {
  const defaultSpaces = [
    { id: "home", name: "홈", icon: "Home", space_type: "home", sort_order: 0 },
    { id: "courses", name: "강의", icon: "BookOpen", space_type: "course", sort_order: 1 },
    { id: "forums", name: "커뮤니티", icon: "MessageSquare", space_type: "forum", sort_order: 2 },
    { id: "events", name: "이벤트", icon: "Calendar", space_type: "event", sort_order: 3 },
    { id: "resources", name: "자료실", icon: "FolderOpen", space_type: "resource", sort_order: 4 },
  ];

  const sortedSpaces = [...defaultSpaces, ...spaces].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className={cn("h-full bg-white border-r border-gray-200 flex flex-col", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
            <ApperIcon name="GraduationCap" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              준태스쿨
            </h1>
            <p className="text-xs text-gray-500">Learning Community</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            스페이스
          </h2>
          <div className="space-y-1">
            {sortedSpaces.map((space) => (
              <NavItem
                key={space.id}
                to={space.space_type === "home" ? "/" : `/space/${space.id}`}
                icon={space.icon}
              >
                {space.name}
              </NavItem>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            계정
          </h2>
          <div className="space-y-1">
            <NavItem to="/profile" icon="User">
              내 프로필
            </NavItem>
            <NavItem to="/settings" icon="Settings">
              설정
            </NavItem>
          </div>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
            준
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">준태 학습자</p>
            <p className="text-xs text-gray-500">회원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;