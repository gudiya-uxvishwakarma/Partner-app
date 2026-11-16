import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../constants/index';

const DashboardCard = ({ icon, label, value, color = COLORS.primary, onPress, style }) => (
  <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={onPress ? 0.8 : 1}>
    <View style={[styles.iconBox, { backgroundColor: `${color}18` }]}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
    <Text style={[styles.value, { color }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    alignItems: 'center',
    margin: SPACING.xs,
    ...SHADOW.sm,
  },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  icon: { fontSize: 22 },
  value: { fontSize: FONT_SIZES.xxl, fontFamily: FONTS.bold, fontWeight: '700' },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontFamily: FONTS.medium, textAlign: 'center', marginTop: 2 },
});

export default DashboardCard;
