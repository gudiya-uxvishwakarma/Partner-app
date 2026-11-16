import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  get: async (key) => {
    try { const v = await AsyncStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
  },
  set: async (key, value) => {
    try { await AsyncStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove: async (key) => {
    try { await AsyncStorage.removeItem(key); return true; } catch { return false; }
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'partner_auth_token',
  PARTNER_DATA: 'partner_data',
  DRAFT_APARTMENT: 'draft_apartment',
  ONBOARDING_DONE: 'partner_onboarding_done',
};
