import { Platform } from 'react-native';

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const getStatusColor = (status) => {
  const map = {
    draft: '#6B7280', submitted: '#3B82F6', under_review: '#F59E0B',
    approved: '#10B981', rejected: '#EF4444', published: '#0A2463',
    pending: '#F59E0B', confirmed: '#10B981', cancelled: '#EF4444', completed: '#0A2463',
  };
  return map[status?.toLowerCase()] || '#6B7280';
};

export const getStatusLabel = (status) => {
  const map = {
    draft: 'Draft', submitted: 'Submitted', under_review: 'Under Review',
    approved: 'Approved', rejected: 'Rejected', published: 'Published',
    pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled', completed: 'Completed',
  };
  return map[status?.toLowerCase()] || status;
};

export const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const platformShadow = (elevation = 4) => Platform.select({
  ios: { shadowColor: '#0A2463', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  android: { elevation },
});
