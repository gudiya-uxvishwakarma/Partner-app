import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../constants/index';
import { AMENITIES_LIST } from '../constants/index';

const AMENITY_ICONS = {
  'Lift': '🛗', 'Parking': '🅿️', 'Power Backup': '⚡', 'Water Supply': '💧',
  'Security': '🔒', 'CCTV': '📹', 'Swimming Pool': '🏊', 'Gym': '🏋️',
  'Garden': '🌿', 'Clubhouse': '🏛️', "Children's Play Area": '🎠',
  'Jogging Track': '🏃', 'Community Hall': '🏠', 'Sports Area': '⚽',
};

const AmenitySelector = ({ selected = [], onToggle, style }) => (
  <View style={[styles.container, style]}>
    {AMENITIES_LIST.map(amenity => {
      const isSelected = selected.includes(amenity);
      return (
        <TouchableOpacity
          key={amenity}
          style={[styles.chip, isSelected && styles.chipActive]}
          onPress={() => onToggle(amenity)}
          activeOpacity={0.8}
        >
          <Text style={styles.chipIcon}>{AMENITY_ICONS[amenity] || '✓'}</Text>
          <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>{amenity}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.inputBg },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipIcon: { fontSize: 14, marginRight: SPACING.xs },
  chipText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  chipTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
});

export default AmenitySelector;
