// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { apiClient } from '../../../services/apiClient';
// import toast from 'react-hot-toast';

// // -- QUERIES --
// // Change useMyIdeas to accept an 'enabled' flag
// export const useMyIdeas = (enabled = true) => useQuery({
//   queryKey: ['myIdeas'],
//   queryFn: async () => (await apiClient.get('/api/ideas/my')).data,
//   enabled: enabled, // Query will only run when enabled is true
// });

// export const useAdminStats = () => useQuery({
//   queryKey: ['adminStats'],
//   queryFn: async () => (await apiClient.get('/api/admin/ideas/stats')).data
// });

// export const useAdminPool = (filters) => useQuery({
//   queryKey: ['adminPool', filters],
//   queryFn: async () => (await apiClient.get('/api/admin/ideas', { params: filters })).data,
//   // Force refetch on every render when the component is active
//   staleTime: 0, 
//   refetchOnMount: true,
//   refetchOnWindowFocus: true
// });

// export const useIdeaDetails = (id) => useQuery({
//   queryKey: ['idea', id],
//   queryFn: async () => (await apiClient.get(`/api/ideas/${id}`)).data,
//   enabled: !!id
// });

// // -- MUTATIONS --

// // UPDATED: Now sends JSON body { status: ... } to match StatusUpdateRequest schema
// // -- MUTATIONS --

// export const useUpdatePipelineStatus = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ id, status }) => 
//       (await apiClient.patch(`/api/admin/ideas/${id}/status`, { status })).data,
    
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ['idea', data.id] });
//       // Using queryKey prefix with exact: false invalidates all filter combinations
//       queryClient.invalidateQueries({ queryKey: ['adminPool'], exact: false });
//       queryClient.invalidateQueries({ queryKey: ['adminStats'] });
//       toast.success(`Status updated to ${data.status}`);
//     },
//     onError: (err) => {
//       const message = err.response?.data?.detail || 'Failed to update status';
//       toast.error(typeof message === 'string' ? message : JSON.stringify(message));
//     }
//   });
// };

// export const useSubmitScorecard = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ id, payload }) => {
//       return (await apiClient.post(`/api/admin/ideas/${id}/evaluate`, payload)).data;
//     },
//     onSuccess: (_, { id }) => {
//       queryClient.invalidateQueries({ queryKey: ['idea', id] });
//       // Invalidate all variations of the admin pool to ensure the dashboard reflects new scores
//       queryClient.invalidateQueries({ queryKey: ['adminPool'], exact: false });
//       queryClient.invalidateQueries({ queryKey: ['adminStats'] });
//       toast.success('Scorecard finalized.');
//     },
//     onError: (err) => {
//       const message = err.response?.data?.detail || 'Evaluation failed';
//       toast.error(typeof message === 'string' ? message : 'Invalid evaluation data');
//     }
//   });
// };

// export const useUpdateIdea = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ id, data }) => (await apiClient.put(`/api/ideas/${id}`, data)).data,
//     onSuccess: (updatedIdea) => {
//       queryClient.invalidateQueries(['idea', updatedIdea.id]);
//       queryClient.invalidateQueries(['myIdeas']);
//       toast.success('Idea entry updated successfully!');
//     },
//     onError: (err) => toast.error(err.response?.data?.detail || 'Update failed')
//   });
// };

// export const useCreateIdea = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ ideaPayload, files }) => {
//       const { data: idea } = await apiClient.post('/api/ideas', ideaPayload);
//       if (files?.length > 0) {
//         for (const file of files) {
//           const formData = new FormData();
//           formData.append('file', file);
//           await apiClient.post(`/api/ideas/${idea.id}/attachments`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' },
//           });
//         }
//       }
//       return idea;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['myIdeas']);
//       toast.success('Project idea submitted!');
//     },
//     onError: (err) => toast.error(err.response?.data?.detail || 'Submission failed')
//   });
// };

// // Add this to your -- MUTATIONS -- section in ideasApi.js
// export const useDownloadAttachment = () => {
//   return useMutation({
//     mutationFn: async ({ attachmentId, originalName }) => {
//       const response = await apiClient.get(`/api/ideas/attachments/download/${attachmentId}`, {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', originalName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     },
//     onError: (err) => {
//       toast.error('Failed to download document.');
//       console.error(err);
//     }
//   });
// };

// export const useDeleteAttachment = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (attachmentId) => {
//       return await apiClient.delete(`/api/ideas/attachments/${attachmentId}`);
//     },
//     onSuccess: () => {
//       // Invalidate all queries starting with 'idea' to ensure the detail view refreshes
//       queryClient.invalidateQueries({ queryKey: ['idea'], exact: false });
//       toast.success('Document deleted successfully.');
//     },
//     onError: (err) => {
//       const message = err.response?.data?.detail || 'Failed to delete document.';
//       toast.error(message);
//     }
//   });
// };


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../services/apiClient';
import toast from 'react-hot-toast';

// -- QUERIES --
// Change useMyIdeas to accept an 'enabled' flag
export const useMyIdeas = (enabled = true) => useQuery({
  queryKey: ['myIdeas'],
  queryFn: async () => (await apiClient.get('/api/ideas/my')).data,
  enabled: enabled, // Query will only run when enabled is true
});

export const useAdminStats = () => useQuery({
  queryKey: ['adminStats'],
  queryFn: async () => (await apiClient.get('/api/admin/ideas/stats')).data
});

export const useAdminPool = (filters) => useQuery({
  queryKey: ['adminPool', filters],
  queryFn: async () => (await apiClient.get('/api/admin/ideas', { params: filters })).data,
  // Force refetch on every render when the component is active
  staleTime: 0, 
  refetchOnMount: true,
  refetchOnWindowFocus: true
});

export const useIdeaDetails = (id) => useQuery({
  queryKey: ['idea', id],
  queryFn: async () => (await apiClient.get(`/api/ideas/${id}`)).data,
  enabled: !!id
});

// -- ADMINISTRATIVE USER AUDITING GATEWAYS --

export const useAdminUsers = () => useQuery({
  queryKey: ['adminUsers'],
  queryFn: async () => (await apiClient.get('/api/admin/ideas/users')).data
});

export const useAdminUserDetails = (userId) => useQuery({
  queryKey: ['adminUserDetails', userId],
  queryFn: async () => (await apiClient.get(`/api/admin/ideas/users/${userId}`)).data,
  enabled: !!userId
});

// -- MUTATIONS --

// UPDATED: Now sends JSON body { status: ... } to match StatusUpdateRequest schema
export const useUpdatePipelineStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => 
      (await apiClient.patch(`/api/admin/ideas/${id}/status`, { status })).data,
    
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['idea', data.id] });
      // Using queryKey prefix with exact: false invalidates all filter combinations
      queryClient.invalidateQueries({ queryKey: ['adminPool'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success(`Status updated to ${data.status}`);
    },
    onError: (err) => {
      const message = err.response?.data?.detail || 'Failed to update status';
      toast.error(typeof message === 'string' ? message : JSON.stringify(message));
    }
  });
};

export const useSubmitScorecard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      return (await apiClient.post(`/api/admin/ideas/${id}/evaluate`, payload)).data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['idea', id] });
      // Invalidate all variations of the admin pool to ensure the dashboard reflects new scores
      queryClient.invalidateQueries({ queryKey: ['adminPool'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('Scorecard finalized.');
    },
    onError: (err) => {
      const message = err.response?.data?.detail || 'Evaluation failed';
      toast.error(typeof message === 'string' ? message : 'Invalid evaluation data');
    }
  });
};

export const useUpdateIdea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => (await apiClient.put(`/api/ideas/${id}`, data)).data,
    onSuccess: (updatedIdea) => {
      queryClient.invalidateQueries(['idea', updatedIdea.id]);
      queryClient.invalidateQueries(['myIdeas']);
      toast.success('Idea entry updated successfully!');
    },
    onError: (err) => toast.error(err.response?.data?.detail || 'Update failed')
  });
};

export const useCreateIdea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ideaPayload, files }) => {
      const { data: idea } = await apiClient.post('/api/ideas', ideaPayload);
      if (files?.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          await apiClient.post(`/api/ideas/${idea.id}/attachments`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
      }
      return idea;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myIdeas']);
      toast.success('Project idea submitted!');
    },
    onError: (err) => toast.error(err.response?.data?.detail || 'Submission failed')
  });
};

export const useDownloadAttachment = () => {
  return useMutation({
    mutationFn: async ({ attachmentId, originalName }) => {
      const response = await apiClient.get(`/api/ideas/attachments/download/${attachmentId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (err) => {
      toast.error('Failed to download document.');
      console.error(err);
    }
  });
};

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attachmentId) => {
      return await apiClient.delete(`/api/ideas/attachments/${attachmentId}`);
    },
    onSuccess: () => {
      // Invalidate all queries starting with 'idea' to ensure the detail view refreshes
      queryClient.invalidateQueries({ queryKey: ['idea'], exact: false });
      toast.success('Document deleted successfully.');
    },
    onError: (err) => {
      const message = err.response?.data?.detail || 'Failed to delete document.';
      toast.error(message);
    }
  });
};

export const useDownloadUserResume = () => {
  return useMutation({
    mutationFn: async ({ userId, filename }) => {
      const response = await apiClient.get(`/api/admin/ideas/users/${userId}/resume/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename || 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (err) => {
      toast.error('Failed to download resume.');
      console.error(err);
    }
  });
};