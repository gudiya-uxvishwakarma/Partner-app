import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../constants/index';
import { formatDate } from '../utils/helpers';

const EventCard = ({ event, onPress, onEdit, style }) => (
  <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.9}>
    <View style={styles.top}>
      <View style={styles.categoryBadge}>
        <Text style={styles.category}>{event.category}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: event.status === 'active' ? '#DCFCE7' : '#F3F4F6' }]}>
        <Text style={[styles.statusText, { color: event.status === 'active' ? COLORS.success : COLORS.textSecondary }]}>
          {event.status === 'active' ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </View>
    <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
    <Text style={styles.meta}>📅 {formatDate(event.date)}</Text>
    <Text style={styles.meta}>🕐 {event.startTime} – {event.endTime}</Text>
    <Text style={styles.meta} numberOfLines={1}>📍 {event.location}</Text>
    <Text style={styles.registered}>👥 {event.registeredCount} registered</Text>
    {onEdit && (
      <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
        <Text style={styles.editText}>Edit Event</Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.sm },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.sm },
  categoryBadge: { backgroundColor: COLORS.inputBg, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 3 },
  category: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontFamily: FONTS.medium },
  statusBadge: { borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 3 },
  statusText: { fontSize: FONT_SIZES.xs, fontFamily: FONTS.bold, fontWeight: '700' },
  title: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: SPACING.sm },
  meta: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: 2 },
  registered: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.medium, marginTop: SPACING.sm },
  editBtn: { marginTop: SPACING.md, paddingVertical: SPACING.sm, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.md, alignItems: 'center' },
  editText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
});

export default EventCard;
