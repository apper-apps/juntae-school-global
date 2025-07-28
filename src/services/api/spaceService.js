import spaceData from "@/services/mockData/spaces.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const spaceService = {
  async getAll() {
    await delay(200);
    return [...spaceData];
  },

  async getById(id) {
    await delay(250);
    const space = spaceData.find(item => item.id === id);
    if (!space) {
      throw new Error("스페이스를 찾을 수 없습니다.");
    }
    return { ...space };
  },

  async create(spaceData) {
    await delay(300);
    const newSpace = {
      ...spaceData,
      id: `space_${Date.now()}`,
      sort_order: spaceData.length
    };
    spaceData.push(newSpace);
    return { ...newSpace };
  },

  async update(id, updateData) {
    await delay(250);
    const index = spaceData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("스페이스를 찾을 수 없습니다.");
    }
    
    spaceData[index] = { ...spaceData[index], ...updateData };
    return { ...spaceData[index] };
  },

  async delete(id) {
    await delay(200);
    const index = spaceData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("스페이스를 찾을 수 없습니다.");
    }
    
    const deleted = spaceData.splice(index, 1)[0];
    return { ...deleted };
  }
};