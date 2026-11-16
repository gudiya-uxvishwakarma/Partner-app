import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/index';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validatePartnerLogin, hasErrors } from '../../utils/validation';
import { authService } from '../../services/authService';
import { usePartner } from '../../context/PartnerContext';

const LoginScreen = ({ navigation }) => {
  const { login } = usePartner();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const errs = validatePartnerLogin(form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    setLoading(true);
    try {
      const res = await authService.login(form);
      await login(res.token, res.partner);
    } catch (e) {
      Alert.alert('Login Failed', e.message || 'Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>🏗️</Text>
          <Text style={styles.title}>Partner Login</Text>
          <Text style={styles.subtitle}>Sign in to manage your property listings</Text>
        </View>

        <View style={styles.demoBox}>
          <Text style={styles.demoText}>Demo: demo@partner.com / demo123</Text>
        </View>

        <CustomInput
          label="Email Address" placeholder="Your registered email"
          value={form.email} onChangeText={v => setForm(p => ({ ...p, email: v }))}
          error={errors.email} keyboardType="email-address" autoCapitalize="none"
        />
        <CustomInput
          label="Password" placeholder="Your password"
          value={form.password} onChangeText={v => setForm(p => ({ ...p, password: v }))}
          error={errors.password} secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotLink}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <CustomButton title="Login" onPress={handleLogin} loading={loading} />

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>New partner? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flexGrow: 1, paddingHorizontal: SPACING.base, paddingBottom: SPACING.xxxl },
  header: { alignItems: 'center', marginTop: SPACING.xxl, marginBottom: SPACING.xxl },
  logo: { fontSize: 56, marginBottom: SPACING.md },
  title: { fontSize: 28, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  subtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, textAlign: 'center', marginTop: SPACING.sm, lineHeight: 22 },
  demoBox: { backgroundColor: '#EEF2FF', borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.xl, alignItems: 'center' },
  demoText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.medium },
  forgotLink: { alignSelf: 'flex-end', marginBottom: SPACING.xl, marginTop: -SPACING.xs },
  forgotText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.medium },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.xl },
  registerText: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary },
  registerLink: { fontSize: FONT_SIZES.base, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
});

export default LoginScreen;
