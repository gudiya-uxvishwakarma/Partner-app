import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../../constants/index';
import CustomInput from '../../../components/CustomInput';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

const Step3Location = ({ form, updateForm, errors }) => (
  <View>
    <Text style={styles.stepTitle}>Location Details</Text>
    <Text style={styles.stepSubtitle}>Help buyers find your property</Text>

    <CustomInput label="Country" value={form.country} onChangeText={v => updateForm({ country: v })} />

    <Text style={styles.fieldLabel}>State *</Text>
    <View style={styles.stateGrid}>
      {INDIAN_STATES.map(s => (
        <TouchableOpacity
          key={s}
          style={[styles.stateChip, form.state === s && styles.stateChipActive]}
          onPress={() => updateForm({ state: s })}
        >
          <Text style={[styles.stateChipText, form.state === s && styles.stateChipTextActive]}>{s}</Text>
        </TouchableOpacity>
      ))}
    </View>
    {errors?.state && <Text style={styles.error}>{errors.state}</Text>}

    <CustomInput label="City *" placeholder="e.g. Bangalore" value={form.city} onChangeText={v => updateForm({ city: v })} error={errors?.city} />
    <CustomInput label="Area / Zone" placeholder="e.g. North Bangalore" value={form.area} onChangeText={v => updateForm({ area: v })} />
    <CustomInput label="Locality" placeholder="e.g. Koramangala" value={form.locality} onChangeText={v => updateForm({ locality: v })} />
    <CustomInput label="Complete Address *" placeholder="Street, Building No, etc." value={form.address} onChangeText={v => updateForm({ address: v })} multiline numberOfLines={2} error={errors?.address} />
    <CustomInput label="Landmark" placeholder="Near Forum Mall, etc." value={form.landmark} onChangeText={v => updateForm({ landmark: v })} />
    <CustomInput label="Pincode" placeholder="6-digit pincode" value={form.pincode} onChangeText={v => updateForm({ pincode: v })} keyboardType="numeric" maxLength={6} />

    <Text style={styles.mapSectionTitle}>GPS Coordinates (Optional)</Text>
    <View style={styles.coordRow}>
      <CustomInput label="Latitude" placeholder="e.g. 12.9716" value={form.latitude} onChangeText={v => updateForm({ latitude: v })} keyboardType="decimal-pad" style={styles.coordInput} />
      <CustomInput label="Longitude" placeholder="e.g. 77.5946" value={form.longitude} onChangeText={v => updateForm({ longitude: v })} keyboardType="decimal-pad" style={styles.coordInput} />
    </View>

    <View style={styles.mapPlaceholder}>
      <Text style={styles.mapPlaceholderIcon}>🗺️</Text>
      <Text style={styles.mapPlaceholderText}>
        Map-based location picker will appear here once the backend is connected. Enter coordinates above for now.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  fieldLabel: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.medium, color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' },
  stateGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  stateChip: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.inputBg },
  stateChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  stateChipText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  stateChipTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  error: { fontSize: FONT_SIZES.xs, color: COLORS.error, marginBottom: SPACING.sm },
  mapSectionTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginTop: SPACING.md, marginBottom: SPACING.sm },
  coordRow: { flexDirection: 'row', gap: SPACING.md },
  coordInput: { flex: 1, marginBottom: 0 },
  mapPlaceholder: { backgroundColor: '#F5F7FF', borderRadius: RADIUS.lg, padding: SPACING.xl, alignItems: 'center', marginTop: SPACING.md },
  mapPlaceholderIcon: { fontSize: 40, marginBottom: SPACING.md },
  mapPlaceholderText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 },
});

export default Step3Location;
