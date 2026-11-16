import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../../constants/index';
import AmenitySelector from '../../../components/AmenitySelector';
import CustomInput from '../../../components/CustomInput';

const ADDITIONAL_FEATURES = [
  'Vastu Compliant', 'Earthquake Resistant', 'Green Building',
  'Smart Home', 'Solar Power', 'Rainwater Harvesting',
  'Organic Garden', 'EV Charging', 'Rooftop Terrace',
  'Private Elevator', 'Imported Marble', 'German Engineered',
];

const Step6Amenities = ({ form, updateForm }) => {
  const toggleAmenity = (amenity) => {
    const current = form.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    updateForm({ amenities: updated });
  };

  const toggleFeature = (feature) => {
    const current = form.features || [];
    const updated = current.includes(feature)
      ? current.filter(f => f !== feature)
      : [...current, feature];
    updateForm({ features: updated });
  };

  return (
    <View>
      <Text style={styles.stepTitle}>Amenities & Features</Text>
      <Text style={styles.stepSubtitle}>Select all available amenities and key features</Text>

      <Text style={styles.sectionTitle}>Amenities ({form.amenities?.length || 0} selected)</Text>
      <AmenitySelector selected={form.amenities || []} onToggle={toggleAmenity} />

      <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Key Features ({form.features?.length || 0} selected)</Text>
      <View style={styles.featuresGrid}>
        {ADDITIONAL_FEATURES.map(f => {
          const isSelected = (form.features || []).includes(f);
          return (
            <TouchableOpacity
              key={f}
              style={[styles.featureChip, isSelected && styles.featureChipActive]}
              onPress={() => toggleFeature(f)}
            >
              <Text style={[styles.featureChipText, isSelected && styles.featureChipTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {(form.amenities?.length > 0 || form.features?.length > 0) && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Selected</Text>
          <Text style={styles.summaryText}>
            {form.amenities?.length || 0} amenities, {form.features?.length || 0} features
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  sectionTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: SPACING.md },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  featureChip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.inputBg,
  },
  featureChipActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  featureChipText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  featureChipTextActive: { color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  summaryBox: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#DCFCE7', borderRadius: RADIUS.lg, padding: SPACING.md, marginTop: SPACING.xl },
  summaryTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.success, fontWeight: '700' },
  summaryText: { fontSize: FONT_SIZES.sm, color: COLORS.success },
});

export default Step6Amenities;
