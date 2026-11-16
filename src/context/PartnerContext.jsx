import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

const PartnerContext = createContext(null);

export const PartnerProvider = ({ children }) => {
  const [partner, setPartner] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [draftApartment, setDraftApartment] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const t = await storage.get(STORAGE_KEYS.AUTH_TOKEN);
        const p = await storage.get(STORAGE_KEYS.PARTNER_DATA);
        const d = await storage.get(STORAGE_KEYS.DRAFT_APARTMENT);
        if (t) setToken(t);
        if (p) setPartner(p);
        if (d) setDraftApartment(d);
      } catch (e) {
        console.warn('Session restore error:', e.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (newToken, partnerData) => {
    await storage.set(STORAGE_KEYS.AUTH_TOKEN, newToken);
    await storage.set(STORAGE_KEYS.PARTNER_DATA, partnerData);
    setToken(newToken);
    setPartner(partnerData);
  };

  const logout = async () => {
    await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    await storage.remove(STORAGE_KEYS.PARTNER_DATA);
    setToken(null);
    setPartner(null);
  };

  const saveDraftApartment = async (data) => {
    const draft = { ...draftApartment, ...data, updatedAt: new Date().toISOString() };
    setDraftApartment(draft);
    await storage.set(STORAGE_KEYS.DRAFT_APARTMENT, draft);
  };

  const clearDraft = async () => {
    setDraftApartment(null);
    await storage.remove(STORAGE_KEYS.DRAFT_APARTMENT);
  };

  return (
    <PartnerContext.Provider value={{
      partner, token, isLoggedIn: !!token, isLoading,
      draftApartment, login, logout, saveDraftApartment, clearDraft,
    }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => {
  const ctx = useContext(PartnerContext);
  if (!ctx) throw new Error('usePartner must be used inside PartnerProvider');
  return ctx;
};

export default PartnerContext;
