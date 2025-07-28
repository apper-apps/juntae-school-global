import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContentCard from "@/components/organisms/ContentCard";
import ContentTypeSelector from "@/components/molecules/ContentTypeSelector";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { contentService } from "@/services/api/contentService";

const ContentList = ({ spaceId, contentType, searchQuery }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(contentType || "all");

  const contentTypes = [
    { value: "all", label: "전체", icon: "Grid3x3" },
    { value: "post", label: "게시글", icon: "FileText" },
    { value: "lesson", label: "강의", icon: "Play" },
    { value: "event", label: "이벤트", icon: "Calendar" },
    { value: "resource", label: "자료", icon: "Download" },
  ];

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (spaceId) {
        data = await contentService.getBySpace(spaceId);
      } else {
        data = await contentService.getAll();
      }
      
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [spaceId]);

  const filteredContent = content.filter(item => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesSearch = !searchQuery || 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const sortedContent = filteredContent.sort((a, b) => {
    // Pinned posts first
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    
    // Then by creation date
    return new Date(b.created_at) - new Date(a.created_at);
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadContent} />;

  return (
    <div className="space-y-6">
      {/* Content Type Filter */}
      <div className="flex justify-between items-center">
        <ContentTypeSelector
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          types={contentTypes}
        />
        
        <div className="text-sm text-gray-500">
          {sortedContent.length}개의 콘텐츠
        </div>
      </div>

      {/* Content Grid */}
      {sortedContent.length === 0 ? (
        <Empty
          title="콘텐츠가 없습니다"
          description={searchQuery ? "검색 조건에 맞는 콘텐츠를 찾을 수 없습니다." : "아직 콘텐츠가 없습니다. 첫 번째 콘텐츠를 만들어보세요!"}
          actionText="콘텐츠 추가"
          onAction={() => console.log("Add content")}
        />
      ) : (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {sortedContent.map((item, index) => (
            <motion.div
              key={item.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <ContentCard content={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ContentList;