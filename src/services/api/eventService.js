import eventData from "@/services/mockData/events.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const eventService = {
  async getAll() {
    await delay(300);
    return [...eventData];
  },

  async getById(id) {
    await delay(200);
    const event = eventData.find(item => item.Id === parseInt(id));
    if (!event) {
      throw new Error("이벤트를 찾을 수 없습니다.");
    }
    return { ...event };
  },

  async getUpcoming(limit = 10) {
    await delay(250);
    const now = new Date();
    return eventData
      .filter(event => new Date(event.starts_at) > now)
      .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at))
      .slice(0, limit);
  },

  async create(eventData) {
    await delay(400);
    const maxId = Math.max(...eventData.map(item => item.Id));
    const newEvent = {
      ...eventData,
      Id: maxId + 1,
      participants: 0
    };
    eventData.push(newEvent);
    return { ...newEvent };
  },

  async update(id, updateData) {
    await delay(300);
    const index = eventData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("이벤트를 찾을 수 없습니다.");
    }
    
    eventData[index] = { ...eventData[index], ...updateData };
    return { ...eventData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = eventData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("이벤트를 찾을 수 없습니다.");
    }
    
    const deleted = eventData.splice(index, 1)[0];
    return { ...deleted };
  }
};