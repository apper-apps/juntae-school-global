const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const statsService = {
  async getOverview() {
    await delay(300);
    return {
      totalMembers: 1247,
      activeLessons: 56,
      monthlyEvents: 12,
      totalResources: 89,
      weeklyActive: 423,
      completionRate: 78,
      satisfaction: 4.8,
      growth: 15.2
    };
  },

  async getSpaceStats(spaceId) {
    await delay(250);
    const baseStats = {
      totalContent: Math.floor(Math.random() * 50) + 10,
      activeMembers: Math.floor(Math.random() * 100) + 20,
      thisWeek: Math.floor(Math.random() * 20) + 5,
      engagement: Math.floor(Math.random() * 30) + 60
    };

    return baseStats;
  },

  async getUserStats(userId) {
    await delay(200);
    return {
      lessonsCompleted: 12,
      hoursStudied: 48,
      postsCreated: 8,
      commentsPosted: 24,
      likesReceived: 156,
      resourcesDownloaded: 18,
      eventsAttended: 5,
      joinDate: "2024-01-15",
      currentStreak: 7,
      totalPoints: 2840
    };
  }
};