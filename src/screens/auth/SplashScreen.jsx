import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated } from 'react-native';
import { COLORS, FONTS, FONT_SIZES } from '../../constants/index';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(() => navigation.replace('Onboarding'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>🏗️</Text>
        </View>
        <Text style={styles.appName}>Partner Portal</Text>
        <Text style={styles.tagline}>Manage Your Properties</Text>
      </Animated.View>
      <Text style={styles.version}>HomeQuest Partner v1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center' },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  logoIcon: { fontSize: 48 },
  appName: { fontSize: 32, fontFamily: FONTS.bold, color: COLORS.white, fontWeight: '700', letterSpacing: 1 },
  tagline: { fontSize: FONT_SIZES.base, color: 'rgba(255,255,255,0.75)', fontFamily: FONTS.regular, marginTop: 8 },
  version: { position: 'absolute', bottom: 40, fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.4)' },
});

export default SplashScreen;
