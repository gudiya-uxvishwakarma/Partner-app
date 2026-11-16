import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../constants/index';

const LoadingComponent = ({ message = 'Loading...', fullScreen = false, size = 'large' }) => (
  <View style={[styles.container, fullScreen && styles.fullScreen]}>
    <ActivityIndicator size={size} color={COLORS.primary} />
    {!!message && <Text style={styles.text}>{message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: SPACING.xxl },
  fullScreen: { flex: 1, backgroundColor: COLORS.background },
  text: { marginTop: SPACING.md, fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.regular },
});

export default LoadingComponent;
