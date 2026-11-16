import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Alert, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../constants/index';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { getStatusColor, getStatusLabel, formatDate, capitalize } from '../../utils/helpers';
import { bookingService } from '../../services/bookingService';

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value || '—'}</Text>
  </View>
);

const BookingDetailScreen = ({ navigation, route }) => {
  const { booking: initial, onUpdate } = route.params || {};
  const [booking, setBooking] = useState(initial);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(null); // 'accept' | 'reject' | 'reschedule' | 'complete'

  if (!booking) return null;

  const statusColor = getStatusColor(booking.status);
  const canAct = ['pending', 'rescheduled'].includes(booking.status);
  const canComplete = booking.status === 'confirmed';

  const updateBooking = (updated) => {
    setBooking(updated);
    onUpdate?.(updated);
  };

  const handleAccept = async () => {
    setLoading('accept');
    try {
      await bookingService.accept(booking.id, remarks || 'Visit confirmed.');
      updateBooking({ ...booking, status: 'confirmed', partnerRemarks: remarks || 'Visit confirmed.' });
      Alert.alert('Confirmed', 'Booking has been confirmed.');
    } catch { Alert.alert('Error', 'Could not confirm booking.'); }
    finally { setLoading(null); }
  };

  const handleReject = () => {
    if (!remarks.trim()) return Alert.alert('Add Remarks', 'Please add a reason for rejection.');
    Alert.alert('Reject Booking', 'Reject this visit request?', [
      { text: 'Cancel' },
      {
        text: 'Reject', style: 'destructive',
        onPress: async () => {
          setLoading('reject');
          try {
            await bookingService.reject(booking.id, remarks);
            updateBooking({ ...booking, status: 'rejected', partnerRemarks: remarks });
            Alert.alert('Rejected', 'Booking has been rejected.');
          } catch { Alert.alert('Error', 'Could not reject booking.'); }
          finally { setLoading(null); }
        },
      },
    ]);
  };

  const handleComplete = async () => {
    setLoading('complete');
    try {
      await bookingService.complete(booking.id);
      updateBooking({ ...booking, status: 'completed' });
      Alert.alert('Completed', 'Visit marked as completed.');
    } catch { Alert.alert('Error', 'Could not mark as completed.'); }
    finally { setLoading(null); }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Booking Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Status Banner */}
        <View style={[styles.statusBanner, { backgroundColor: `${statusColor}15` }]}>
          <Text style={styles.statusIcon}>
            {booking.status === 'confirmed' ? '✅' : booking.status === 'pending' ? '⏳' : booking.status === 'cancelled' ? '❌' : booking.status === 'completed' ? '🏁' : booking.status === 'rejected' ? '⛔' : '🔄'}
          </Text>
          <View>
            <Text style={[styles.statusLabel, { color: statusColor }]}>{getStatusLabel(booking.status)}</Text>
            <Text style={styles.statusSub}>Booking #{booking.id?.slice(-6)?.toUpperCase()}</Text>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Visitor Information</Text>
          <DetailRow label="Name" value={booking.userName} />
          <DetailRow label="Phone" value={booking.userPhone} />
          <DetailRow label="Visitors" value={`${booking.visitors} person${booking.visitors > 1 ? 's' : ''}`} />
          {booking.message && <DetailRow label="Message" value={booking.message} />}
        </View>

        {/* Visit Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Visit Details</Text>
          <DetailRow label="Apartment" value={booking.apartmentName} />
          {booking.tower && <DetailRow label="Tower" value={booking.tower} />}
          {booking.flat && <DetailRow label="Flat" value={`Flat ${booking.flat}`} />}
          <DetailRow label="Date" value={formatDate(booking.visitDate)} />
          <DetailRow label="Time" value={booking.timeSlot} />
          <DetailRow label="Submitted" value={formatDate(booking.createdAt)} />
        </View>

        {/* Partner Remarks */}
        {booking.partnerRemarks && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Remarks</Text>
            <Text style={styles.remarksText}>{booking.partnerRemarks}</Text>
          </View>
        )}

        {/* Action Area */}
        {(canAct || canComplete) && (
          <View style={styles.actionCard}>
            <Text style={styles.cardTitle}>Actions</Text>
            <Text style={styles.remarksLabel}>Add Remarks (optional for confirm, required for reject)</Text>
            <TextInput
              style={styles.remarksInput}
              placeholder="e.g. Please bring ID proof / Not available on this date..."
              placeholderTextColor={COLORS.textLight}
              value={remarks}
              onChangeText={setRemarks}
              multiline
              numberOfLines={3}
            />
            {canAct && (
              <View style={styles.actionButtons}>
                <CustomButton
                  title="✅ Confirm Visit"
                  onPress={handleAccept}
                  loading={loading === 'accept'}
                  disabled={!!loading}
                  variant="success"
                  style={styles.actionBtn}
                  fullWidth={false}
                />
                <CustomButton
                  title="⛔ Reject"
                  onPress={handleReject}
                  loading={loading === 'reject'}
                  disabled={!!loading}
                  variant="danger"
                  style={styles.actionBtn}
                  fullWidth={false}
                />
              </View>
            )}
            {canComplete && (
              <CustomButton
                title="🏁 Mark as Completed"
                onPress={handleComplete}
                loading={loading === 'complete'}
                disabled={!!loading}
              />
            )}
          </View>
        )}

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: SPACING.base, paddingTop: SPACING.md },
  statusBanner: { flexDirection: 'row', alignItems: 'center', borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: SPACING.md, gap: SPACING.md },
  statusIcon: { fontSize: 32 },
  statusLabel: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, fontWeight: '700' },
  statusSub: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 2 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: SPACING.md },
  cardTitle: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: SPACING.md },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  detailLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  detailValue: { fontSize: FONT_SIZES.sm, color: COLORS.text, fontFamily: FONTS.medium, maxWidth: '60%', textAlign: 'right' },
  remarksText: { fontSize: FONT_SIZES.base, color: COLORS.text, lineHeight: 22 },
  actionCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: SPACING.md },
  remarksLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  remarksInput: {
    backgroundColor: COLORS.inputBg, borderRadius: RADIUS.lg, borderWidth: 1.5, borderColor: COLORS.border,
    padding: SPACING.md, minHeight: 80, textAlignVertical: 'top', fontSize: FONT_SIZES.base,
    color: COLORS.text, marginBottom: SPACING.md,
  },
  actionButtons: { flexDirection: 'row', gap: SPACING.md },
  actionBtn: { flex: 1 },
});

export default BookingDetailScreen;
