import { toast } from 'react-toastify';

export const userService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "user_id" } },
          { field: { Name: "display_name" } },
          { field: { Name: "photo_url" } },
          { field: { Name: "bio" } },
          { field: { Name: "expertise_tag" } }
        ]
      };

      const response = await apperClient.fetchRecords("app_User", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching users:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("사용자를 불러오는 중 오류가 발생했습니다.");
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "user_id" } },
          { field: { Name: "display_name" } },
          { field: { Name: "photo_url" } },
          { field: { Name: "bio" } },
          { field: { Name: "expertise_tag" } }
        ]
      };

      const response = await apperClient.getRecordById("app_User", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching user with ID ${id}:`, error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("사용자를 불러오는 중 오류가 발생했습니다.");
      }
      return null;
    }
  },

  async getCurrentProfile() {
    try {
      // Return current user from Redux or authentication context
      // This would typically get the current authenticated user's profile
      const users = await this.getAll();
      if (users.length > 0) {
        const currentUser = users[0]; // For demo purposes, use first user
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
      }
      return null;
    } catch (error) {
      console.error("Error fetching current profile:", error.message);
      return null;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateRecord = { Id: parseInt(id) };
      
      if (updateData.Name !== undefined) updateRecord.Name = updateData.Name;
      if (updateData.Tags !== undefined) updateRecord.Tags = updateData.Tags;
      if (updateData.Owner !== undefined) updateRecord.Owner = parseInt(updateData.Owner);
      if (updateData.user_id !== undefined) updateRecord.user_id = updateData.user_id;
      if (updateData.display_name !== undefined) updateRecord.display_name = updateData.display_name;
      if (updateData.photo_url !== undefined) updateRecord.photo_url = updateData.photo_url;
      if (updateData.bio !== undefined) updateRecord.bio = updateData.bio;
      if (updateData.expertise_tag !== undefined) updateRecord.expertise_tag = updateData.expertise_tag;

      const params = { records: [updateRecord] };
      const response = await apperClient.updateRecord("app_User", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update user ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("사용자 정보가 성공적으로 업데이트되었습니다.");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating user:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("사용자 정보 업데이트 중 오류가 발생했습니다.");
      }
      return null;
    }
  }
};