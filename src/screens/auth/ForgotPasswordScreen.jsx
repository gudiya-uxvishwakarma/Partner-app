import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants/index';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { authService } from '../../services/authService';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return Alert.alert('Error', 'Please enter your email');
    setLoading(true);
    try { await authService.forgotPassword({ email }); setSent(true); }
    catch (e) { Alert.alert('Error', e.message); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Forgot Password" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        {sent ? (
          <View style={styles.successBox}>
            <Text style={styles.successIcon}>✉️</Text>
            <Text style={styles.successTitle}>Check your email</Text>
            <Text style={styles.successMsg}>Reset link sent to {email}</Text>
            <CustomButton title="Back to Login" onPress={() => navigation.navigate('Login')} style={{ width: 200 }} />
          </View>
        ) : (
          <>
            <Text style={styles.icon}>🔑</Text>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your registered email address</Text>
            <CustomInput label="Email Address" placeholder="Your email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <CustomButton title="Send Reset Link" onPress={handleSubmit} loading={loading} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, paddingHorizontal: SPACING.base, paddingTop: SPACING.xxl },
  icon: { fontSize: 56, textAlign: 'center', marginBottom: SPACING.md },
  title: { fontSize: FONT_SIZES.xxl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', textAlign: 'center', marginBottom: SPACING.sm },
  subtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.xl },
  successBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  successIcon: { fontSize: 64, marginBottom: SPACING.md },
  successTitle: { fontSize: FONT_SIZES.xxl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: SPACING.sm },
  successMsg: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.xl },
});

export default ForgotPasswordScreen;
