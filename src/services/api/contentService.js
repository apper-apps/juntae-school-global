import contentData from "@/services/mockData/content.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const contentService = {
  async getAll() {
    await delay(300);
    return [...contentData];
  },

  async getById(id) {
    await delay(200);
    const content = contentData.find(item => item.Id === parseInt(id));
    if (!content) {
      throw new Error("콘텐츠를 찾을 수 없습니다.");
    }
    return { ...content };
  },

  async getBySpace(spaceId) {
    await delay(250);
    const spaceContentMap = {
      courses: "lesson",
      forums: "post", 
      events: "event",
      resources: "resource"
    };
    
    const contentType = spaceContentMap[spaceId];
    if (!contentType) {
      return [...contentData];
    }
    
    return contentData.filter(item => item.type === contentType);
  },

  async create(contentData) {
    await delay(400);
    const maxId = Math.max(...contentData.map(item => item.Id));
    const newContent = {
      ...contentData,
      Id: maxId + 1,
      created_at: new Date().toISOString(),
      is_pinned: false,
      likes: 0,
      comments: 0
    };
    contentData.push(newContent);
    return { ...newContent };
  },

  async update(id, updateData) {
    await delay(300);
    const index = contentData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("콘텐츠를 찾을 수 없습니다.");
    }
    
    contentData[index] = { ...contentData[index], ...updateData };
    return { ...contentData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = contentData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("콘텐츠를 찾을 수 없습니다.");
    }
    
    const deleted = contentData.splice(index, 1)[0];
    return { ...deleted };
  }
};