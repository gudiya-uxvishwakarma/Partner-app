import api from './api';
import { MOCK_BOOKINGS } from './mockData';

let _bookings = [...MOCK_BOOKINGS];

export const bookingService = {
  getAll: async () => {
    try { const r = await api.get('/api/partner/bookings'); return r.data; }
    catch { return { success: true, data: _bookings }; }
  },
  accept: async (id, remarks) => {
    try { const r = await api.put(`/api/partner/bookings/${id}/confirm`, { remarks }); return r.data; }
    catch {
      _bookings = _bookings.map(b => b.id === id ? { ...b, status: 'confirmed', partnerRemarks: remarks } : b);
      return { success: true, message: 'Booking confirmed' };
    }
  },
  reject: async (id, remarks) => {
    try { const r = await api.put(`/api/partner/bookings/${id}/reject`, { remarks }); return r.data; }
    catch {
      _bookings = _bookings.map(b => b.id === id ? { ...b, status: 'rejected', partnerRemarks: remarks } : b);
      return { success: true, message: 'Booking rejected' };
    }
  },
  reschedule: async (id, { newDate, newTimeSlot, remarks }) => {
    try { const r = await api.put(`/api/partner/bookings/${id}/reschedule`, { newDate, newTimeSlot, remarks }); return r.data; }
    catch {
      _bookings = _bookings.map(b => b.id === id ? { ...b, status: 'rescheduled', visitDate: newDate, timeSlot: newTimeSlot, partnerRemarks: remarks } : b);
      return { success: true, message: 'Booking rescheduled' };
    }
  },
  complete: async (id) => {
    try { const r = await api.put(`/api/partner/bookings/${id}/complete`); return r.data; }
    catch {
      _bookings = _bookings.map(b => b.id === id ? { ...b, status: 'completed' } : b);
      return { success: true };
    }
  },
};
