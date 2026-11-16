export const validateBasicInfo = (data) => {
  const e = {};
  if (!data.name?.trim()) e.name = 'Apartment name is required';
  if (!data.builderName?.trim()) e.builderName = 'Builder name is required';
  if (!data.propertyType) e.propertyType = 'Property type is required';
  if (!data.description?.trim()) e.description = 'Description is required';
  return e;
};

export const validateLocation = (data) => {
  const e = {};
  if (!data.city?.trim()) e.city = 'City is required';
  if (!data.state?.trim()) e.state = 'State is required';
  if (!data.address?.trim()) e.address = 'Address is required';
  return e;
};

export const validatePartnerLogin = ({ email, password }) => {
  const e = {};
  if (!email?.trim()) e.email = 'Email is required';
  if (!password?.trim()) e.password = 'Password is required';
  return e;
};

export const validatePartnerRegister = ({ name, email, phone, company, password }) => {
  const e = {};
  if (!name?.trim()) e.name = 'Name is required';
  if (!email?.trim()) e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
  if (!phone?.trim()) e.phone = 'Phone is required';
  if (!company?.trim()) e.company = 'Company name is required';
  if (!password?.trim()) e.password = 'Password is required';
  else if (password.length < 6) e.password = 'Min 6 characters';
  return e;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;
