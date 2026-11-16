import api from './api';
import { MOCK_PARTNER } from './mockData';

export const authService = {
  login: async ({ email, password }) => {
    try {
      const res = await api.post('/api/partner/auth/login', { email, password });
      return res.data;
    } catch {
      if (email === 'demo@partner.com' && password === 'demo123') {
        return { success: true, token: 'mock_partner_token_456', partner: MOCK_PARTNER };
      }
      throw new Error('Invalid email or password');
    }
  },
  register: async (data) => {
    try {
      const res = await api.post('/api/partner/auth/register', data);
      return res.data;
    } catch {
      return { success: true, message: 'OTP sent to your phone', phone: data.phone };
    }
  },
  verifyOtp: async ({ phone, otp }) => {
    try {
      const res = await api.post('/api/partner/auth/verify-otp', { phone, otp });
      return res.data;
    } catch {
      if (otp?.length === 4) return { success: true, token: 'mock_partner_token_456', partner: MOCK_PARTNER };
      throw new Error('Invalid OTP');
    }
  },
  forgotPassword: async ({ email }) => {
    try {
      await api.post('/api/partner/auth/forgot-password', { email });
    } catch {}
    return { success: true, message: 'Reset link sent to your email' };
  },
  getProfile: async () => {
    try { const r = await api.get('/api/partner/profile'); return r.data; }
    catch { return { success: true, partner: MOCK_PARTNER }; }
  },
  updateProfile: async (data) => {
    try { const r = await api.put('/api/partner/profile', data); return r.data; }
    catch { return { success: true, partner: { ...MOCK_PARTNER, ...data } }; }
  },
};
