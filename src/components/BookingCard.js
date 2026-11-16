import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../constants/index';
import { getStatusColor, getStatusLabel, formatDate } from '../utils/helpers';

const BookingCard = ({ booking, onPress, style }) => {
  const statusColor = getStatusColor(booking.status);
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.top}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{booking.userName?.charAt(0)?.toUpperCase() || 'U'}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{booking.userName}</Text>
            <Text style={styles.userPhone}>{booking.userPhone}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}18` }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{getStatusLabel(booking.status)}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.details}>
        <Text style={styles.aptName} numberOfLines={1}>{booking.apartmentName}</Text>
        {(booking.tower || booking.flat) && <Text style={styles.flat}>{booking.tower || ''}{booking.flat ? ` · Flat ${booking.flat}` : ''}</Text>}
        <View style={styles.meta}>
          <Text style={styles.metaText}>📅 {formatDate(booking.visitDate)}</Text>
          <Text style={styles.metaText}>🕐 {booking.timeSlot}</Text>
          <Text style={styles.metaText}>👥 {booking.visitors}</Text>
        </View>
        {booking.message ? <Text style={styles.message} numberOfLines={1}>💬 {booking.message}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.sm },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.sm },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.sm },
  avatarText: { color: COLORS.white, fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, fontWeight: '700' },
  userName: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  userPhone: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 1 },
  statusBadge: { borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 3 },
  statusText: { fontSize: FONT_SIZES.xs, fontFamily: FONTS.bold, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: SPACING.sm },
  details: {},
  aptName: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 2 },
  flat: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  metaText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  message: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: SPACING.xs },
});

export default BookingCard;
