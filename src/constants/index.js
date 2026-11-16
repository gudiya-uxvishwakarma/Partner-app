export { COLORS, default as COLORS_DEFAULT } from './colors';

export const SPACING = {
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, xxl: 32, xxxl: 40,
};

export const RADIUS = {
  sm: 6, md: 10, lg: 14, xl: 20, round: 50,
};

export const SHADOW = {
  sm: { shadowColor: '#0A2463', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
  md: { shadowColor: '#0A2463', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 6 },
};

import { Platform } from 'react-native';
export const FONTS = {
  regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
  medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
};

export const FONT_SIZES = {
  xs: 10, sm: 12, md: 14, base: 16, lg: 18, xl: 20, xxl: 24, xxxl: 28, display: 32,
};

export const AMENITIES_LIST = [
  'Lift', 'Parking', 'Power Backup', 'Water Supply', 'Security',
  'CCTV', 'Swimming Pool', 'Gym', 'Garden', 'Clubhouse',
  "Children's Play Area", 'Jogging Track', 'Community Hall', 'Sports Area',
];

export const PROPERTY_TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Studio', 'Penthouse'];
export const BHK_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Studio', 'Villa', 'Penthouse'];
export const POSSESSION_STATUSES = ['Ready to Move', 'Under Construction', 'Pre-Launch'];
export const PROJECT_STATUSES = ['Upcoming', 'Ongoing', 'Completed'];
export const FURNISHING_TYPES = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];

export const LISTING_STATUSES = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PUBLISHED: 'published',
};

export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  RESCHEDULED: 'rescheduled',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const EVENT_CATEGORIES = ['Launch', 'Expo', 'Meeting', 'Open House', 'Workshop', 'Other'];

export const TOTAL_FORM_STEPS = 9;
