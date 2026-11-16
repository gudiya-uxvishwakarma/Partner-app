import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../../constants/index';

const ReviewRow = ({ label, value }) =>
  value ? (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{String(value)}</Text>
    </View>
  ) : null;

const ReviewSection = ({ title, children, stepNum, onEdit }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={() => onEdit(stepNum)} style={styles.editBtn}>
        <Text style={styles.editText}>✏ Edit</Text>
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

const Step9Review = ({ form, onEdit }) => (
  <View>
    <Text style={styles.stepTitle}>Review & Submit</Text>
    <Text style={styles.stepSubtitle}>Review all details before submitting your listing</Text>

    {/* Cover Image */}
    {form.coverImage && (
      <Image source={{ uri: form.coverImage.uri || form.coverImage }} style={styles.coverImage} resizeMode="cover" />
    )}

    <ReviewSection title="Basic Information" stepNum={1} onEdit={onEdit}>
      <ReviewRow label="Name" value={form.name} />
      <ReviewRow label="Builder" value={form.builderName} />
      <ReviewRow label="Type" value={form.propertyType} />
      <ReviewRow label="Project Status" value={form.projectStatus} />
      <ReviewRow label="Possession" value={form.possession} />
      <ReviewRow label="Towers" value={form.totalTowers} />
      <ReviewRow label="Floors" value={form.totalFloors} />
      <ReviewRow label="Flats" value={form.totalFlats} />
      <View style={styles.descRow}>
        <Text style={styles.reviewLabel}>Description</Text>
        <Text style={styles.reviewDesc}>{form.description}</Text>
      </View>
    </ReviewSection>

    <ReviewSection title="Photos" stepNum={2} onEdit={onEdit}>
      <Text style={styles.photoCount}>
        {(form.galleryImages?.length || 0) + (form.exteriorImages?.length || 0) + (form.interiorImages?.length || 0)} photos uploaded
      </Text>
    </ReviewSection>

    <ReviewSection title="Location" stepNum={3} onEdit={onEdit}>
      <ReviewRow label="Address" value={form.address} />
      <ReviewRow label="Locality" value={form.locality} />
      <ReviewRow label="City" value={form.city} />
      <ReviewRow label="State" value={form.state} />
      <ReviewRow label="Pincode" value={form.pincode} />
    </ReviewSection>

    <ReviewSection title="Holding Images" stepNum={4} onEdit={onEdit}>
      <Text style={styles.photoCount}>
        {[form.holdingImage, form.positionImage, form.floorPlan].filter(Boolean).length}/3 images uploaded
      </Text>
    </ReviewSection>

    <ReviewSection title="Towers & Flats" stepNum={5} onEdit={onEdit}>
      <Text style={styles.photoCount}>
        {form.towers?.length || 0} tower(s), {form.towers?.reduce((acc, t) => acc + (t.flats?.length || 0), 0) || 0} flat(s)
      </Text>
    </ReviewSection>

    <ReviewSection title="Amenities" stepNum={6} onEdit={onEdit}>
      <Text style={styles.photoCount}>
        {form.amenities?.length || 0} amenities, {form.features?.length || 0} features selected
      </Text>
      {form.amenities?.length > 0 && (
        <Text style={styles.amenitiesText}>{form.amenities.join(' · ')}</Text>
      )}
    </ReviewSection>

    <ReviewSection title="Events" stepNum={7} onEdit={onEdit}>
      <Text style={styles.photoCount}>{form.events?.length || 0} event(s)</Text>
    </ReviewSection>

    <ReviewSection title="Rent & Sale" stepNum={8} onEdit={onEdit}>
      {form.hasRent && <ReviewRow label="Monthly Rent" value={form.rent?.monthlyRent ? `₹${form.rent.monthlyRent}` : null} />}
      {form.hasSale && <ReviewRow label="Sale Price" value={form.sale?.salePrice ? `₹${form.sale.salePrice}` : null} />}
      {!form.hasRent && !form.hasSale && <Text style={styles.photoCount}>Not added — listing type not specified</Text>}
    </ReviewSection>

    <View style={styles.submitNote}>
      <Text style={styles.submitNoteTitle}>📋 Submission Process</Text>
      <Text style={styles.submitNoteText}>
        After submission, your listing will be reviewed by our admin team within 24–48 hours.
        You will receive a notification once it's approved or if changes are required.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  coverImage: { width: '100%', height: 200, borderRadius: RADIUS.xl, marginBottom: SPACING.md },
  section: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.md, paddingBottom: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  sectionTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  editBtn: { paddingHorizontal: SPACING.md, paddingVertical: 4, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.round },
  editText: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.xs, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  reviewLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  reviewValue: { fontSize: FONT_SIZES.sm, color: COLORS.text, fontFamily: FONTS.medium, maxWidth: '60%', textAlign: 'right' },
  descRow: { paddingVertical: SPACING.sm },
  reviewDesc: { fontSize: FONT_SIZES.sm, color: COLORS.text, marginTop: 4, lineHeight: 20 },
  photoCount: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  amenitiesText: { fontSize: FONT_SIZES.xs, color: COLORS.primary, marginTop: 4, lineHeight: 18 },
  submitNote: { backgroundColor: '#EEF2FF', borderRadius: RADIUS.xl, padding: SPACING.base, marginBottom: SPACING.xl },
  submitNoteTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.primary, fontWeight: '700', marginBottom: SPACING.sm },
  submitNoteText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },
});

export default Step9Review;
