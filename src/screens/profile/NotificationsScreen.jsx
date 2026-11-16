import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/index';
import CustomHeader from '../../components/CustomHeader';
import EmptyState from '../../components/EmptyState';
import { formatDate } from '../../utils/helpers';

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'New Booking Request', body: 'Arun Kumar wants to visit Vikram Heights on Nov 18.', type: 'booking', read: false, createdAt: '2026-11-10T08:00:00Z' },
  { id: '2', title: 'Listing Approved ✅', body: 'Vikram Heights has been approved and is now published.', type: 'listing', read: true, createdAt: '2026-11-01T10:00:00Z' },
  { id: '3', title: 'New Enquiry', body: 'You have a new enquiry for Vikram Green Valley.', type: 'enquiry', read: false, createdAt: '2026-11-05T12:00:00Z' },
];

const ICONS = { booking: '📅', listing: '🏢', enquiry: '📬' };

const NotificationsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>
    <CustomHeader title="Notifications" onBack={() => navigation.goBack()} />
    {MOCK_NOTIFICATIONS.length === 0 ? (
      <EmptyState icon="🔔" title="No notifications" message="You're all caught up!" />
    ) : (
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.notif, !item.read && styles.unread]}>
            <View style={styles.iconBox}><Text style={styles.icon}>{ICONS[item.type] || '🔔'}</Text></View>
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.time}>{formatDate(item.createdAt)}</Text>
            </View>
            {!item.read && <View style={styles.dot} />}
          </TouchableOpacity>
        )}
      />
    )}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.base },
  notif: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm },
  unread: { backgroundColor: '#EEF2FF' },
  iconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.inputBg, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md },
  icon: { fontSize: 20 },
  info: { flex: 1 },
  title: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 2 },
  body: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },
  time: { fontSize: FONT_SIZES.xs, color: COLORS.textLight, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: SPACING.xs },
});

export default NotificationsScreen;
