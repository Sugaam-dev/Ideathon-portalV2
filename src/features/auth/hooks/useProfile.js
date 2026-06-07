// import { useQuery } from '@tanstack/react-query';
// import { apiClient } from '../../../services/apiClient';
// import { useDispatch } from 'react-redux';
// import { setUser, setLoading } from '../store/authSlice';
// import { useEffect } from 'react';

// export const useProfile = () => {
//   const dispatch = useDispatch();

//   const query = useQuery({
//     queryKey: ['profile'],
//     queryFn: async () => {
//       const { data } = await apiClient.get('/api/auth/me');
//       return data;
//     },
//     retry: false, // Don't retry on 401
//     staleTime: 1000 * 60 * 5, // Cache for 5 minutes
//   });

//   // Sync React Query data to Redux for your existing components
//   useEffect(() => {
//     if (query.isSuccess) {
//       dispatch(setUser(query.data));
//       dispatch(setLoading(false));
//     } else if (query.isError) {
//       dispatch(setUser(null));
//       dispatch(setLoading(false));
//     }
//   }, [query.isSuccess, query.isError, query.data, dispatch]);

//   return query;
// };




import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../services/apiClient';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../store/authSlice';
import { useEffect } from 'react';

export const useProfile = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/auth/me');
      return data;
    },
    retry: false, // Don't retry on 401
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setUser(query.data));
      dispatch(setLoading(false));
    } else if (query.isError) {
      dispatch(setUser(null));
      dispatch(setLoading(false));
    }
  }, [query.isSuccess, query.isError, query.data, dispatch]);

  return query;
};