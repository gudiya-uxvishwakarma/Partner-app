import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../constants/index';
import { usePartner } from '../../context/PartnerContext';

const MenuItem = ({ icon, label, onPress, danger }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
      <Text style={styles.menuIconText}>{icon}</Text>
    </View>
    <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const { partner, logout } = usePartner();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>My Profile</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{partner?.name?.charAt(0)?.toUpperCase() || 'P'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{partner?.name || 'Partner'}</Text>
            <Text style={styles.profileCompany}>{partner?.company || ''}</Text>
            <Text style={styles.profileEmail}>{partner?.email || ''}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Listings Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Manage</Text>
          <View style={styles.menuCard}>
            <MenuItem icon="🏢" label="My Apartments" onPress={() => navigation.navigate('Apartments')} />
            <MenuItem icon="📅" label="Booking Requests" onPress={() => navigation.navigate('Bookings')} />
            <MenuItem icon="🎉" label="My Events" onPress={() => navigation.navigate('Events')} />
            <MenuItem icon="➕" label="Add New Apartment" onPress={() => navigation.navigate('AddApartment')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Account</Text>
          <View style={styles.menuCard}>
            <MenuItem icon="👤" label="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <MenuItem icon="🔔" label="Notifications" onPress={() => navigation.navigate('Notifications')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>More</Text>
          <View style={styles.menuCard}>
            <MenuItem icon="🚪" label="Logout" onPress={handleLogout} danger />
          </View>
        </View>

        <Text style={styles.version}>HomeQuest Partner Portal v1.0.0</Text>
        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  pageTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', paddingHorizontal: SPACING.base, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: SPACING.base, borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: SPACING.md, ...SHADOW.sm },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md },
  avatarText: { fontSize: FONT_SIZES.xxl, color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: FONT_SIZES.lg, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  profileCompany: { fontSize: FONT_SIZES.sm, color: COLORS.primary, marginTop: 1 },
  profileEmail: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 1 },
  editBtn: { padding: SPACING.sm },
  editIcon: { fontSize: 20 },
  section: { paddingHorizontal: SPACING.base, marginBottom: SPACING.md },
  sectionLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontFamily: FONTS.medium, textTransform: 'uppercase', letterSpacing: 1, marginBottom: SPACING.sm, marginLeft: SPACING.sm },
  menuCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, overflow: 'hidden', ...SHADOW.sm },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.base, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: COLORS.inputBg, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md },
  menuIconDanger: { backgroundColor: '#FEE2E2' },
  menuIconText: { fontSize: 18 },
  menuLabel: { flex: 1, fontSize: FONT_SIZES.base, color: COLORS.text },
  menuLabelDanger: { color: COLORS.error },
  arrow: { fontSize: 20, color: COLORS.textLight },
  version: { textAlign: 'center', fontSize: FONT_SIZES.xs, color: COLORS.textLight, marginVertical: SPACING.md },
});

export default ProfileScreen;
