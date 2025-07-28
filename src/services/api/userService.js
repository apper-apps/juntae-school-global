import userData from "@/services/mockData/users.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getAll() {
    await delay(300);
    return [...userData];
  },

  async getById(id) {
    await delay(200);
    const user = userData.find(item => item.user_id === id);
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    return { ...user };
  },

  async getCurrentProfile() {
    await delay(250);
    // Mock current user profile
    const currentUser = userData[0];
    return { 
      ...currentUser,
      stats: {
        completedLessons: 12,
        studyHours: 48,
        progress: 75,
        posts: 8,
        comments: 24,
        likes: 156,
        events: 5,
        downloads: 18
      },
      recentActivity: [
        {
          description: "Korean Grammar Basics 강의를 완료했습니다",
          timestamp: "2시간 전"
        },
        {
          description: "Weekly Korean Practice 이벤트에 참여했습니다",
          timestamp: "1일 전"
        },
        {
          description: "새로운 학습 자료를 다운로드했습니다",
          timestamp: "3일 전"
        }
      ],
      created_at: "2024-01-15T09:00:00Z"
    };
  },

  async update(id, updateData) {
    await delay(300);
    const index = userData.findIndex(item => item.user_id === id);
    if (index === -1) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    
    userData[index] = { ...userData[index], ...updateData };
    return { ...userData[index] };
  }
};