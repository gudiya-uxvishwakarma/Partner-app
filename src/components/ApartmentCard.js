import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../constants/index';
import { getStatusColor, getStatusLabel, formatDate } from '../utils/helpers';

const ApartmentCard = ({ apartment, onPress, onEdit, onDelete, style }) => {
  const statusColor = getStatusColor(apartment.status);

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: apartment.coverImage }} style={styles.image} resizeMode="cover" />
      <View style={[styles.statusBadge, { backgroundColor: `${statusColor}22` }]}>
        <Text style={[styles.statusText, { color: statusColor }]}>{getStatusLabel(apartment.status)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{apartment.name}</Text>
        <Text style={styles.location} numberOfLines={1}>📍 {apartment.address?.locality}, {apartment.address?.city}</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>🏢 {apartment.totalTowers} Towers</Text>
          <Text style={styles.stat}>🏠 {apartment.totalFlats} Flats</Text>
          <Text style={styles.stat}>📅 {apartment.possession}</Text>
        </View>
        {apartment.status === 'rejected' && apartment.rejectionReason && (
          <View style={styles.rejectBox}>
            <Text style={styles.rejectText} numberOfLines={2}>⚠ {apartment.rejectionReason}</Text>
          </View>
        )}
        {(onEdit || onDelete) && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.md, ...SHADOW.sm },
  image: { width: '100%', height: 160 },
  statusBadge: { position: 'absolute', top: SPACING.sm, right: SPACING.sm, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 3 },
  statusText: { fontSize: FONT_SIZES.xs, fontFamily: FONTS.bold, fontWeight: '700' },
  info: { padding: SPACING.md },
  name: { fontSize: FONT_SIZES.lg, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  location: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 2, marginBottom: SPACING.sm },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  stat: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  rejectBox: { backgroundColor: '#FEE2E2', borderRadius: RADIUS.sm, padding: SPACING.sm, marginTop: SPACING.sm },
  rejectText: { fontSize: FONT_SIZES.xs, color: COLORS.error, lineHeight: 18 },
  actions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md },
  editBtn: { flex: 1, paddingVertical: SPACING.sm, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.md, alignItems: 'center' },
  editText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  deleteBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderWidth: 1.5, borderColor: COLORS.error, borderRadius: RADIUS.md },
  deleteText: { fontSize: FONT_SIZES.sm, color: COLORS.error, fontFamily: FONTS.medium },
});

export default ApartmentCard;
