import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/index';
import BookingCard from '../../components/BookingCard';
import LoadingComponent from '../../components/LoadingComponent';
import EmptyState from '../../components/EmptyState';
import { bookingService } from '../../services/bookingService';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'rescheduled', label: 'Rescheduled' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const BookingRequestsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const fetchBookings = async () => {
    try {
      const res = await bookingService.getAll();
      setBookings(res.data || []);
    } catch { setBookings([]); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { fetchBookings(); }, []);
  const onRefresh = useCallback(() => { setRefreshing(true); fetchBookings(); }, []);

  const filtered = activeTab === 'all' ? bookings : bookings.filter(b => b.status === activeTab);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  if (loading) return <LoadingComponent fullScreen />;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Booking Requests</Text>
        {pendingCount > 0 && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>{pendingCount} pending</Text>
          </View>
        )}
      </View>

      {/* Tabs */}
      <FlatList
        data={TABS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        keyExtractor={i => i.key}
        renderItem={({ item }) => {
          const count = item.key === 'all' ? bookings.length : bookings.filter(b => b.status === item.key).length;
          return (
            <TouchableOpacity
              style={[styles.tab, activeTab === item.key && styles.tabActive]}
              onPress={() => setActiveTab(item.key)}
            >
              <Text style={[styles.tabText, activeTab === item.key && styles.tabTextActive]}>
                {item.label} {count > 0 ? `(${count})` : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="📅"
          title={`No ${activeTab === 'all' ? '' : activeTab} bookings`}
          message="Booking requests from buyers will appear here"
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
          renderItem={({ item }) => (
            <BookingCard
              booking={item}
              onPress={() => navigation.navigate('BookingDetail', { booking: item, onUpdate: (updated) => {
                setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
              }})}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.base, paddingTop: SPACING.md, paddingBottom: SPACING.sm,
    backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  title: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  pendingBadge: { backgroundColor: '#FEF3C7', borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 4 },
  pendingBadgeText: { fontSize: FONT_SIZES.xs, color: '#B45309', fontFamily: FONTS.bold, fontWeight: '700' },
  tabs: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.white },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  tabTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  list: { paddingHorizontal: SPACING.base, paddingTop: SPACING.md },
});

export default BookingRequestsScreen;
