import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../../constants/index';
import CustomInput from '../../../components/CustomInput';
import { PROPERTY_TYPES, POSSESSION_STATUSES, PROJECT_STATUSES } from '../../../constants/index';

const Selector = ({ label, options, selected, onSelect, error }) => (
  <View style={styles.selectorContainer}>
    {!!label && <Text style={styles.selectorLabel}>{label}</Text>}
    <View style={styles.options}>
      {options.map(opt => (
        <View
          key={opt}
          style={[styles.option, selected === opt && styles.optionActive]}
          onTouchEnd={() => onSelect(opt)}
        >
          <Text style={[styles.optionText, selected === opt && styles.optionTextActive]}>{opt}</Text>
        </View>
      ))}
    </View>
    {!!error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const Step1BasicInfo = ({ form, updateForm, errors }) => (
  <View>
    <Text style={styles.stepTitle}>Basic Information</Text>
    <Text style={styles.stepSubtitle}>Tell us about your property</Text>

    <CustomInput
      label="Apartment Name *"
      placeholder="e.g. Prestige Skyline"
      value={form.name}
      onChangeText={v => updateForm({ name: v })}
      error={errors?.name}
    />
    <CustomInput
      label="Builder / Developer Name *"
      placeholder="e.g. Prestige Estates"
      value={form.builderName}
      onChangeText={v => updateForm({ builderName: v })}
      error={errors?.builderName}
    />
    <Selector
      label="Property Type *"
      options={PROPERTY_TYPES}
      selected={form.propertyType}
      onSelect={v => updateForm({ propertyType: v })}
      error={errors?.propertyType}
    />
    <CustomInput
      label="Apartment Description *"
      placeholder="Describe your property — highlights, unique features, target audience..."
      value={form.description}
      onChangeText={v => updateForm({ description: v })}
      error={errors?.description}
      multiline
      numberOfLines={4}
    />
    <Selector
      label="Project Status"
      options={PROJECT_STATUSES}
      selected={form.projectStatus}
      onSelect={v => updateForm({ projectStatus: v })}
    />
    <Selector
      label="Possession Status"
      options={POSSESSION_STATUSES}
      selected={form.possession}
      onSelect={v => updateForm({ possession: v })}
    />
    <View style={styles.row}>
      <CustomInput
        label="Total Towers"
        placeholder="e.g. 4"
        value={form.totalTowers}
        onChangeText={v => updateForm({ totalTowers: v })}
        keyboardType="numeric"
        style={styles.thirdInput}
      />
      <CustomInput
        label="Total Floors"
        placeholder="e.g. 20"
        value={form.totalFloors}
        onChangeText={v => updateForm({ totalFloors: v })}
        keyboardType="numeric"
        style={styles.thirdInput}
      />
      <CustomInput
        label="Total Flats"
        placeholder="e.g. 200"
        value={form.totalFlats}
        onChangeText={v => updateForm({ totalFlats: v })}
        keyboardType="numeric"
        style={styles.thirdInput}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  selectorContainer: { marginBottom: SPACING.md },
  selectorLabel: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.medium, color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  option: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.round,
    borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.inputBg,
  },
  optionActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optionText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  optionTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  error: { fontSize: FONT_SIZES.xs, color: COLORS.error, marginTop: 4 },
  row: { flexDirection: 'row', gap: SPACING.sm },
  thirdInput: { flex: 1, marginBottom: 0 },
});

export default Step1BasicInfo;
