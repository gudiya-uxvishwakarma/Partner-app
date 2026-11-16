import api from './api';
import { MOCK_APARTMENTS, MOCK_DASHBOARD } from './mockData';
import { generateId } from '../utils/helpers';

let _apartments = [...MOCK_APARTMENTS];

export const apartmentService = {
  getAll: async () => {
    try { const r = await api.get('/api/partner/apartments'); return r.data; }
    catch { return { success: true, data: _apartments }; }
  },
  getById: async (id) => {
    try { const r = await api.get(`/api/partner/apartments/${id}`); return r.data; }
    catch {
      const found = _apartments.find(a => a.id === id);
      return { success: true, data: found };
    }
  },
  getDashboard: async () => {
    try { const r = await api.get('/api/partner/dashboard'); return r.data; }
    catch { return { success: true, data: MOCK_DASHBOARD }; }
  },
  create: async (data) => {
    try { const r = await api.post('/api/partner/apartments', data); return r.data; }
    catch {
      const newApt = { id: generateId(), ...data, createdAt: new Date().toISOString(), enquiries: 0, bookings: 0 };
      _apartments = [newApt, ..._apartments];
      return { success: true, data: newApt, message: 'Apartment submitted for review' };
    }
  },
  saveDraft: async (data) => {
    try { const r = await api.post('/api/partner/apartments/draft', data); return r.data; }
    catch {
      const draft = { id: generateId(), ...data, status: 'draft', createdAt: new Date().toISOString() };
      _apartments = [draft, ..._apartments];
      return { success: true, data: draft, message: 'Draft saved' };
    }
  },
  update: async (id, data) => {
    try { const r = await api.put(`/api/partner/apartments/${id}`, data); return r.data; }
    catch {
      _apartments = _apartments.map(a => a.id === id ? { ...a, ...data } : a);
      return { success: true, message: 'Apartment updated' };
    }
  },
  submit: async (id) => {
    try { const r = await api.put(`/api/partner/apartments/${id}/submit`); return r.data; }
    catch {
      _apartments = _apartments.map(a => a.id === id ? { ...a, status: 'submitted' } : a);
      return { success: true, message: 'Apartment submitted for review' };
    }
  },
  delete: async (id) => {
    try { await api.delete(`/api/partner/apartments/${id}`); }
    catch { _apartments = _apartments.filter(a => a.id !== id); }
    return { success: true, message: 'Apartment deleted' };
  },
};
