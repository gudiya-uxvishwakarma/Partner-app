import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../constants/index';
import DashboardCard from '../../components/DashboardCard';
import LoadingComponent from '../../components/LoadingComponent';
import { apartmentService } from '../../services/apartmentService';
import { usePartner } from '../../context/PartnerContext';

const QuickActionBtn = ({ icon, label, onPress, color = COLORS.primary }) => (
  <TouchableOpacity style={[styles.qaBtn, { borderColor: color }]} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.qaIcon}>{icon}</Text>
    <Text style={[styles.qaLabel, { color }]}>{label}</Text>
  </TouchableOpacity>
);

const DashboardScreen = ({ navigation }) => {
  const { partner } = usePartner();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await apartmentService.getDashboard();
      setStats(res.data);
    } catch {
      setStats({ totalApartments: 0, publishedApartments: 0, pendingApartments: 0, rejectedApartments: 0, draftApartments: 0, totalEnquiries: 0, bookingRequests: 0, upcomingEvents: 0 });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);
  const onRefresh = useCallback(() => { setRefreshing(true); fetchDashboard(); }, []);

  if (loading) return <LoadingComponent fullScreen message="Loading dashboard..." />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.partnerName}>{partner?.name || partner?.company || 'Partner'}</Text>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.notifIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <DashboardCard icon="🏢" label="Total" value={stats?.totalApartments ?? 0} color={COLORS.primary} onPress={() => navigation.navigate('Apartments')} />
            <DashboardCard icon="✅" label="Published" value={stats?.publishedApartments ?? 0} color={COLORS.success} onPress={() => navigation.navigate('Apartments')} />
            <DashboardCard icon="⏳" label="Pending" value={stats?.pendingApartments ?? 0} color={COLORS.warning} onPress={() => navigation.navigate('Apartments')} />
            <DashboardCard icon="❌" label="Rejected" value={stats?.rejectedApartments ?? 0} color={COLORS.error} onPress={() => navigation.navigate('Apartments')} />
          </View>
          <View style={styles.statsGrid}>
            <DashboardCard icon="📬" label="Enquiries" value={stats?.totalEnquiries ?? 0} color={COLORS.accent} />
            <DashboardCard icon="📅" label="Bookings" value={stats?.bookingRequests ?? 0} color={COLORS.primary} onPress={() => navigation.navigate('Bookings')} />
            <DashboardCard icon="🎉" label="Events" value={stats?.upcomingEvents ?? 0} color={COLORS.secondary} onPress={() => navigation.navigate('Events')} />
            <DashboardCard icon="📝" label="Drafts" value={stats?.draftApartments ?? 0} color={COLORS.textSecondary} />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.qaGrid}>
            <QuickActionBtn
              icon="➕" label="Add Apartment"
              onPress={() => navigation.navigate('AddApartment')}
            />
            <QuickActionBtn
              icon="🏢" label="My Apartments"
              onPress={() => navigation.navigate('Apartments')}
              color={COLORS.success}
            />
            <QuickActionBtn
              icon="🎉" label="Add Event"
              onPress={() => navigation.navigate('AddEvent')}
              color={COLORS.secondary}
            />
            <QuickActionBtn
              icon="📅" label="Bookings"
              onPress={() => navigation.navigate('Bookings')}
              color={COLORS.accent}
            />
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <View style={styles.tipInfo}>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipText}>
              Listings with complete photos, floor plans and accurate pricing get 3x more enquiries.
            </Text>
          </View>
        </View>

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.base, paddingTop: SPACING.md, paddingBottom: SPACING.md,
    backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  greeting: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  partnerName: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  notifBtn: {
    width: 44, height: 44, backgroundColor: COLORS.inputBg, borderRadius: RADIUS.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  notifIcon: { fontSize: 20 },
  statsSection: { paddingHorizontal: SPACING.base, paddingTop: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: SPACING.md },
  statsGrid: { flexDirection: 'row', marginBottom: SPACING.sm },
  quickActions: { paddingHorizontal: SPACING.base, marginTop: SPACING.md },
  qaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  qaBtn: {
    flex: 1, minWidth: '45%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: SPACING.sm, backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    borderWidth: 1.5, paddingVertical: SPACING.md, paddingHorizontal: SPACING.md,
    ...SHADOW.sm,
  },
  qaIcon: { fontSize: 20 },
  qaLabel: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.bold, fontWeight: '700' },
  tipCard: {
    flexDirection: 'row', marginHorizontal: SPACING.base, marginTop: SPACING.lg,
    backgroundColor: '#EEF2FF', borderRadius: RADIUS.xl, padding: SPACING.md, gap: SPACING.md,
  },
  tipIcon: { fontSize: 28 },
  tipInfo: { flex: 1 },
  tipTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.primary, fontWeight: '700', marginBottom: 4 },
  tipText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },
});

export default DashboardScreen;
