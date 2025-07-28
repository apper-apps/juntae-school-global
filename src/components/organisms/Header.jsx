import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import UserAvatar from "@/components/molecules/UserAvatar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick, onSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "홈";
    if (path.startsWith("/space/")) {
      const spaceId = path.split("/")[2];
      const spaceNames = {
        courses: "강의",
        forums: "커뮤니티", 
        events: "이벤트",
        resources: "자료실"
      };
      return spaceNames[spaceId] || "스페이스";
    }
    if (path === "/profile") return "내 프로필";
    if (path === "/settings") return "설정";
    return "준태스쿨";
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const mockUser = {
    display_name: "준태 학습자",
    expertise_tag: "Korean Learner"
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <SearchBar
            placeholder="콘텐츠 검색..."
            onSearch={handleSearch}
            value={searchQuery}
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <ApperIcon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{mockUser.display_name}</p>
              <p className="text-xs text-gray-500">{mockUser.expertise_tag}</p>
            </div>
            <UserAvatar user={mockUser} showOnline={true} />
          </div>

          <div className="sm:hidden">
            <UserAvatar user={mockUser} showOnline={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;