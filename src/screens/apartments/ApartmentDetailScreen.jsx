import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../constants/index';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { getStatusColor, getStatusLabel, formatDate } from '../../utils/helpers';
import { apartmentService } from '../../services/apartmentService';

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || '—'}</Text>
  </View>
);

const ApartmentDetailScreen = ({ navigation, route }) => {
  const { apartment: initial } = route.params || {};
  const [apt, setApt] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  if (!apt) return null;

  const statusColor = getStatusColor(apt.status);

  const handleSubmit = async () => {
    Alert.alert('Submit for Review', 'Submit this listing for admin review?', [
      { text: 'Cancel' },
      {
        text: 'Submit',
        onPress: async () => {
          setSubmitting(true);
          try {
            await apartmentService.submit(apt.id);
            setApt(a => ({ ...a, status: 'submitted' }));
            Alert.alert('Submitted!', 'Your listing has been submitted for review.');
          } catch (e) {
            Alert.alert('Error', e.message);
          } finally {
            setSubmitting(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <CustomHeader
        title="Apartment Details"
        onBack={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate('AddApartment', { apartment: apt, isEdit: true })}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image source={{ uri: apt.coverImage }} style={styles.coverImage} resizeMode="cover" />

        {/* Status Banner */}
        <View style={[styles.statusBanner, { backgroundColor: `${statusColor}18` }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusLabel, { color: statusColor }]}>{getStatusLabel(apt.status)}</Text>
          {apt.rejectionReason && (
            <Text style={styles.rejectionNote}>⚠ Review required</Text>
          )}
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.aptName}>{apt.name}</Text>
          <Text style={styles.builderName}>{apt.builderName}</Text>
          <Text style={styles.location}>📍 {apt.address?.locality}, {apt.address?.city}, {apt.address?.state}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>{apt.propertyType}</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>{apt.possession}</Text></View>
            {apt.listingType?.map(t => (
              <View key={t} style={[styles.badge, t === 'rent' ? styles.rentBadge : styles.saleBadge]}>
                <Text style={[styles.badgeText, { color: t === 'rent' ? COLORS.success : COLORS.primary }]}>
                  {t === 'rent' ? 'For Rent' : 'For Sale'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Rejection Reason */}
        {apt.rejectionReason && (
          <View style={styles.rejectionCard}>
            <Text style={styles.rejectionTitle}>Rejection Reason</Text>
            <Text style={styles.rejectionText}>{apt.rejectionReason}</Text>
            <Text style={styles.rejectionHint}>Please edit and resubmit your listing.</Text>
          </View>
        )}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{apt.enquiries || 0}</Text>
            <Text style={styles.statLabel}>Enquiries</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{apt.bookings || 0}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{apt.totalFlats || 0}</Text>
            <Text style={styles.statLabel}>Total Flats</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{apt.totalTowers || 0}</Text>
            <Text style={styles.statLabel}>Towers</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Property Details</Text>
          <InfoRow label="Project Status" value={apt.projectStatus} />
          <InfoRow label="Possession" value={apt.possession} />
          <InfoRow label="Total Towers" value={String(apt.totalTowers || 0)} />
          <InfoRow label="Total Floors" value={String(apt.totalFloors || 0)} />
          <InfoRow label="Total Flats" value={String(apt.totalFlats || 0)} />
          <InfoRow label="Listed On" value={formatDate(apt.createdAt)} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('AddApartment', { apartment: apt, isEdit: true })}
        >
          <Text style={styles.editBtnText}>✏ Edit Listing</Text>
        </TouchableOpacity>
        {(apt.status === 'draft' || apt.status === 'rejected') && (
          <CustomButton
            title="Submit for Review"
            onPress={handleSubmit}
            loading={submitting}
            style={styles.submitBtn}
            fullWidth={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  coverImage: { width: '100%', height: 220 },
  statusBanner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, gap: SPACING.sm },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusLabel: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, fontWeight: '700', flex: 1 },
  rejectionNote: { fontSize: FONT_SIZES.sm, color: COLORS.error, fontFamily: FONTS.medium },
  section: { backgroundColor: COLORS.white, padding: SPACING.base, marginBottom: SPACING.sm },
  aptName: { fontSize: FONT_SIZES.xxl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  builderName: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginTop: 2, marginBottom: SPACING.sm },
  location: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.md },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  badge: { paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.sm, backgroundColor: COLORS.inputBg },
  rentBadge: { backgroundColor: '#DCFCE7' },
  saleBadge: { backgroundColor: '#EEF2FF' },
  badgeText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  rejectionCard: { backgroundColor: '#FEF2F2', marginHorizontal: SPACING.base, marginBottom: SPACING.sm, borderRadius: RADIUS.lg, padding: SPACING.base, borderLeftWidth: 4, borderLeftColor: COLORS.error },
  rejectionTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.error, fontWeight: '700', marginBottom: SPACING.sm },
  rejectionText: { fontSize: FONT_SIZES.sm, color: COLORS.text, lineHeight: 20, marginBottom: SPACING.sm },
  rejectionHint: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontStyle: 'italic' },
  statsRow: { flexDirection: 'row', backgroundColor: COLORS.white, marginBottom: SPACING.sm },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: SPACING.md, borderRightWidth: 1, borderRightColor: COLORS.border },
  statValue: { fontSize: FONT_SIZES.xxl, fontFamily: FONTS.bold, color: COLORS.primary, fontWeight: '700' },
  statLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  detailsCard: { backgroundColor: COLORS.white, padding: SPACING.base, marginBottom: SPACING.sm },
  detailsTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: SPACING.md },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  infoValue: { fontSize: FONT_SIZES.sm, color: COLORS.text, fontFamily: FONTS.medium },
  bottomCTA: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: SPACING.md, backgroundColor: COLORS.white, paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border, ...SHADOW.md },
  editBtn: { flex: 1, height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.lg },
  editBtnText: { fontSize: FONT_SIZES.base, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  submitBtn: { flex: 2, height: 48 },
  editIcon: { fontSize: 22 },
});

export default ApartmentDetailScreen;
