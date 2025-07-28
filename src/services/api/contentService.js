import { toast } from 'react-toastify';

export const contentService = {
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
          { field: { Name: "type" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "adilo_url" } },
          { field: { Name: "space_id" } },
          { field: { Name: "author" } },
          { field: { Name: "created_at" } },
          { field: { Name: "is_pinned" } },
          { field: { Name: "likes" } },
          { field: { Name: "comments" } },
          { field: { Name: "sort_order" } },
          { field: { Name: "body" } },
          { field: { Name: "url" } },
          { field: { Name: "participants" } },
          { field: { Name: "tag" } },
          { field: { Name: "file_url" } },
          { field: { Name: "downloads" } }
        ],
        orderBy: [{ fieldName: "created_at", sorttype: "DESC" }]
      };

      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching content:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("콘텐츠를 불러오는 중 오류가 발생했습니다.");
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
          { field: { Name: "type" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "adilo_url" } },
          { field: { Name: "space_id" } },
          { field: { Name: "author" } },
          { field: { Name: "created_at" } },
          { field: { Name: "is_pinned" } },
          { field: { Name: "likes" } },
          { field: { Name: "comments" } },
          { field: { Name: "sort_order" } },
          { field: { Name: "body" } },
          { field: { Name: "url" } },
          { field: { Name: "participants" } },
          { field: { Name: "tag" } },
          { field: { Name: "file_url" } },
          { field: { Name: "downloads" } }
        ]
      };

      const response = await apperClient.getRecordById("content", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching content with ID ${id}:`, error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("콘텐츠를 불러오는 중 오류가 발생했습니다.");
      }
      return null;
    }
  },

  async getBySpace(spaceId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const spaceContentMap = {
        courses: "lesson",
        forums: "post", 
        events: "event",
        resources: "resource"
      };
      
      const contentType = spaceContentMap[spaceId];
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "type" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "adilo_url" } },
          { field: { Name: "space_id" } },
          { field: { Name: "author" } },
          { field: { Name: "created_at" } },
          { field: { Name: "is_pinned" } },
          { field: { Name: "likes" } },
          { field: { Name: "comments" } },
          { field: { Name: "sort_order" } },
          { field: { Name: "body" } },
          { field: { Name: "url" } },
          { field: { Name: "participants" } },
          { field: { Name: "tag" } },
          { field: { Name: "file_url" } },
          { field: { Name: "downloads" } }
        ],
        orderBy: [{ fieldName: "created_at", sorttype: "DESC" }]
      };

      if (contentType) {
        params.where = [
          {
            FieldName: "type",
            Operator: "EqualTo",
            Values: [contentType]
          }
        ];
      }

      const response = await apperClient.fetchRecords("content", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching content by space:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("스페이스 콘텐츠를 불러오는 중 오류가 발생했습니다.");
      }
      return [];
    }
  },

  async create(contentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: contentData.Name,
          Tags: contentData.Tags,
          Owner: parseInt(contentData.Owner),
          type: contentData.type,
          title: contentData.title,
          description: contentData.description,
          adilo_url: contentData.adilo_url,
          space_id: parseInt(contentData.space_id?.Id || contentData.space_id),
          author: parseInt(contentData.author?.Id || contentData.author),
          created_at: contentData.created_at || new Date().toISOString(),
          is_pinned: contentData.is_pinned || false,
          likes: parseInt(contentData.likes) || 0,
          comments: parseInt(contentData.comments) || 0,
          sort_order: parseInt(contentData.sort_order) || 0,
          body: contentData.body,
          url: contentData.url,
          participants: parseInt(contentData.participants) || 0,
          tag: contentData.tag,
          file_url: contentData.file_url,
          downloads: parseInt(contentData.downloads) || 0
        }]
      };

      const response = await apperClient.createRecord("content", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create content ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("콘텐츠가 성공적으로 생성되었습니다.");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating content:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("콘텐츠 생성 중 오류가 발생했습니다.");
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
      if (updateData.type !== undefined) updateRecord.type = updateData.type;
      if (updateData.title !== undefined) updateRecord.title = updateData.title;
      if (updateData.description !== undefined) updateRecord.description = updateData.description;
      if (updateData.adilo_url !== undefined) updateRecord.adilo_url = updateData.adilo_url;
      if (updateData.space_id !== undefined) updateRecord.space_id = parseInt(updateData.space_id?.Id || updateData.space_id);
      if (updateData.author !== undefined) updateRecord.author = parseInt(updateData.author?.Id || updateData.author);
      if (updateData.created_at !== undefined) updateRecord.created_at = updateData.created_at;
      if (updateData.is_pinned !== undefined) updateRecord.is_pinned = updateData.is_pinned;
      if (updateData.likes !== undefined) updateRecord.likes = parseInt(updateData.likes);
      if (updateData.comments !== undefined) updateRecord.comments = parseInt(updateData.comments);
      if (updateData.sort_order !== undefined) updateRecord.sort_order = parseInt(updateData.sort_order);
      if (updateData.body !== undefined) updateRecord.body = updateData.body;
      if (updateData.url !== undefined) updateRecord.url = updateData.url;
      if (updateData.participants !== undefined) updateRecord.participants = parseInt(updateData.participants);
      if (updateData.tag !== undefined) updateRecord.tag = updateData.tag;
      if (updateData.file_url !== undefined) updateRecord.file_url = updateData.file_url;
      if (updateData.downloads !== undefined) updateRecord.downloads = parseInt(updateData.downloads);

      const params = { records: [updateRecord] };
      const response = await apperClient.updateRecord("content", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update content ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("콘텐츠가 성공적으로 업데이트되었습니다.");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating content:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("콘텐츠 업데이트 중 오류가 발생했습니다.");
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

      const response = await apperClient.deleteRecord("content", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete content ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("콘텐츠가 성공적으로 삭제되었습니다.");
        }
        
        return successfulDeletions.length === params.RecordIds.length;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting content:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("콘텐츠 삭제 중 오류가 발생했습니다.");
      }
      return false;
    }
  }
};