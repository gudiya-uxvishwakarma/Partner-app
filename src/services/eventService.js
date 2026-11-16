import api from './api';
import { MOCK_EVENTS } from './mockData';
import { generateId } from '../utils/helpers';

let _events = [...MOCK_EVENTS];

export const eventService = {
  getAll: async () => {
    try { const r = await api.get('/api/partner/events'); return r.data; }
    catch { return { success: true, data: _events }; }
  },
  create: async (data) => {
    try { const r = await api.post('/api/partner/events', data); return r.data; }
    catch {
      const evt = { id: generateId(), ...data, status: 'active', registeredCount: 0 };
      _events = [evt, ..._events];
      return { success: true, data: evt };
    }
  },
  update: async (id, data) => {
    try { const r = await api.put(`/api/partner/events/${id}`, data); return r.data; }
    catch {
      _events = _events.map(e => e.id === id ? { ...e, ...data } : e);
      return { success: true };
    }
  },
  delete: async (id) => {
    try { await api.delete(`/api/partner/events/${id}`); }
    catch { _events = _events.filter(e => e.id !== id); }
    return { success: true };
  },
};
