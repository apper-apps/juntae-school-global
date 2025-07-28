import activityData from "@/services/mockData/activities.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const activityService = {
  async getAll() {
    await delay(250);
    return [...activityData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  async getRecent(limit = 10) {
    await delay(200);
    return [...activityData]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);
  },

  async getByUser(userId) {
    await delay(300);
    return activityData
      .filter(activity => activity.user.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  async create(activityData) {
    await delay(200);
    const maxId = Math.max(...activityData.map(item => item.Id));
    const newActivity = {
      ...activityData,
      Id: maxId + 1,
      created_at: new Date().toISOString()
    };
    activityData.push(newActivity);
    return { ...newActivity };
  }
};