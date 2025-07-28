import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";
import Header from "@/components/organisms/Header";
import HomePage from "@/components/pages/HomePage";
import SpacePage from "@/components/pages/SpacePage";
import ProfilePage from "@/components/pages/ProfilePage";
import SettingsPage from "@/components/pages/SettingsPage";

const Layout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuClick = () => {
    setIsMobileSidebarOpen(true);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={handleMobileSidebarClose} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuClick={handleMenuClick}
          onSearch={handleSearch}
        />
        
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/space/:spaceId" element={<SpacePage searchQuery={searchQuery} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Layout;