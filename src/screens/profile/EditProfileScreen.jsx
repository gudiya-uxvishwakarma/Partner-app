import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants/index';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { authService } from '../../services/authService';
import { usePartner } from '../../context/PartnerContext';

const EditProfileScreen = ({ navigation }) => {
  const { partner, login, token } = usePartner();
  const [form, setForm] = useState({
    name: partner?.name || '',
    email: partner?.email || '',
    phone: partner?.phone || '',
    company: partner?.company || '',
  });
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim()) return Alert.alert('Error', 'Name is required');
    setLoading(true);
    try {
      const res = await authService.updateProfile(form);
      await login(token, res.partner);
      Alert.alert('Success', 'Profile updated.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Edit Profile" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <CustomInput label="Full Name" value={form.name} onChangeText={v => update('name', v)} />
        <CustomInput label="Company Name" value={form.company} onChangeText={v => update('company', v)} />
        <CustomInput label="Email" value={form.email} onChangeText={v => update('email', v)} keyboardType="email-address" autoCapitalize="none" />
        <CustomInput label="Phone" value={form.phone} onChangeText={v => update('phone', v)} keyboardType="phone-pad" />
        <CustomButton title="Save Changes" onPress={handleSave} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  scroll: { padding: SPACING.base },
});

export default EditProfileScreen;
