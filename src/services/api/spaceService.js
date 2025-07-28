import { toast } from 'react-toastify';

export const spaceService = {
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
          { field: { Name: "icon" } },
          { field: { Name: "sort_order" } },
          { field: { Name: "space_type" } },
          { field: { Name: "totalContent" } },
          { field: { Name: "activeMembers" } },
          { field: { Name: "thisWeek" } },
          { field: { Name: "engagement" } }
        ],
        orderBy: [{ fieldName: "sort_order", sorttype: "ASC" }]
      };

      const response = await apperClient.fetchRecords("space", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching spaces:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("스페이스를 불러오는 중 오류가 발생했습니다.");
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
          { field: { Name: "icon" } },
          { field: { Name: "sort_order" } },
          { field: { Name: "space_type" } },
          { field: { Name: "totalContent" } },
          { field: { Name: "activeMembers" } },
          { field: { Name: "thisWeek" } },
          { field: { Name: "engagement" } }
        ]
      };

      const response = await apperClient.getRecordById("space", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching space with ID ${id}:`, error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("스페이스를 불러오는 중 오류가 발생했습니다.");
      }
      return null;
    }
  },

  async create(spaceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: spaceData.Name,
          Tags: spaceData.Tags,
          Owner: parseInt(spaceData.Owner),
          icon: spaceData.icon,
          sort_order: parseInt(spaceData.sort_order) || 0,
          space_type: spaceData.space_type,
          totalContent: parseInt(spaceData.totalContent) || 0,
          activeMembers: parseInt(spaceData.activeMembers) || 0,
          thisWeek: parseInt(spaceData.thisWeek) || 0,
          engagement: parseInt(spaceData.engagement) || 0
        }]
      };

      const response = await apperClient.createRecord("space", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create space ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("스페이스가 성공적으로 생성되었습니다.");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating space:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("스페이스 생성 중 오류가 발생했습니다.");
      }
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
      if (updateData.icon !== undefined) updateRecord.icon = updateData.icon;
      if (updateData.sort_order !== undefined) updateRecord.sort_order = parseInt(updateData.sort_order);
      if (updateData.space_type !== undefined) updateRecord.space_type = updateData.space_type;
      if (updateData.totalContent !== undefined) updateRecord.totalContent = parseInt(updateData.totalContent);
      if (updateData.activeMembers !== undefined) updateRecord.activeMembers = parseInt(updateData.activeMembers);
      if (updateData.thisWeek !== undefined) updateRecord.thisWeek = parseInt(updateData.thisWeek);
      if (updateData.engagement !== undefined) updateRecord.engagement = parseInt(updateData.engagement);

      const params = { records: [updateRecord] };
      const response = await apperClient.updateRecord("space", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update space ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("스페이스가 성공적으로 업데이트되었습니다.");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating space:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("스페이스 업데이트 중 오류가 발생했습니다.");
      }
      return null;
    }
  },

  async delete(recordIds) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: Array.isArray(recordIds) ? recordIds.map(id => parseInt(id)) : [parseInt(recordIds)]
      };

      const response = await apperClient.deleteRecord("space", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete space ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("스페이스가 성공적으로 삭제되었습니다.");
        }
        
        return successfulDeletions.length === params.RecordIds.length;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting space:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("스페이스 삭제 중 오류가 발생했습니다.");
      }
      return false;
    }
  }
};