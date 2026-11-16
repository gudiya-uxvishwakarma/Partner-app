import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants/index';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import { validatePartnerRegister, hasErrors } from '../../utils/validation';
import { authService } from '../../services/authService';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleRegister = async () => {
    const errs = validatePartnerRegister(form);
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    if (hasErrors(errs)) return;
    setLoading(true);
    try {
      await authService.register(form);
      navigation.navigate('OTP', { phone: form.phone });
    } catch (e) {
      Alert.alert('Registration Failed', e.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Partner Registration" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Create your partner account to start listing properties</Text>
        <CustomInput label="Full Name" placeholder="Your name" value={form.name} onChangeText={v => update('name', v)} error={errors.name} />
        <CustomInput label="Company / Builder Name" placeholder="e.g. Prestige Estates" value={form.company} onChangeText={v => update('company', v)} error={errors.company} />
        <CustomInput label="Email Address" placeholder="Business email" value={form.email} onChangeText={v => update('email', v)} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
        <CustomInput label="Phone Number" placeholder="10-digit mobile" value={form.phone} onChangeText={v => update('phone', v)} error={errors.phone} keyboardType="phone-pad" />
        <CustomInput label="Password" placeholder="Create password" value={form.password} onChangeText={v => update('password', v)} error={errors.password} secureTextEntry />
        <CustomInput label="Confirm Password" placeholder="Repeat password" value={form.confirmPassword} onChangeText={v => update('confirmPassword', v)} error={errors.confirmPassword} secureTextEntry />
        <CustomButton title="Create Partner Account" onPress={handleRegister} loading={loading} />
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flexGrow: 1, paddingHorizontal: SPACING.base, paddingBottom: SPACING.xxxl },
  subtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginTop: SPACING.md, marginBottom: SPACING.xl, lineHeight: 22 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.xl },
  loginText: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary },
  loginLink: { fontSize: FONT_SIZES.base, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
});

export default RegisterScreen;
