import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../../constants/index';
import CustomInput from '../../../components/CustomInput';
import { BHK_TYPES, FURNISHING_TYPES } from '../../../constants/index';
import { TouchableOpacity } from 'react-native';

const Selector = ({ label, options, selected, onSelect }) => (
  <View style={{ marginBottom: SPACING.md }}>
    {!!label && <Text style={styles.fieldLabel}>{label}</Text>}
    <View style={styles.optionRow}>
      {options.map(opt => (
        <TouchableOpacity key={opt} style={[styles.option, selected === opt && styles.optionActive]} onPress={() => onSelect(opt)}>
          <Text style={[styles.optionText, selected === opt && styles.optionTextActive]}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const Step8RentSale = ({ form, updateForm }) => {
  const updateRent = (updates) => updateForm({ rent: { ...form.rent, ...updates } });
  const updateSale = (updates) => updateForm({ sale: { ...form.sale, ...updates } });

  return (
    <View>
      <Text style={styles.stepTitle}>Rent & Sale Listings</Text>
      <Text style={styles.stepSubtitle}>Add pricing information for rent or sale. You can skip this step and add it later.</Text>

      {/* Rent Section */}
      <View style={styles.section}>
        <View style={styles.sectionToggle}>
          <View>
            <Text style={styles.sectionTitle}>🔑 For Rent</Text>
            <Text style={styles.sectionSubtitle}>List this apartment for rental</Text>
          </View>
          <Switch
            value={form.hasRent}
            onValueChange={v => updateForm({ hasRent: v })}
            trackColor={{ true: COLORS.success }}
            thumbColor={COLORS.white}
          />
        </View>
        {form.hasRent && (
          <View style={styles.sectionFields}>
            <View style={styles.row}>
              <CustomInput label="Monthly Rent (₹)" placeholder="e.g. 35000" value={form.rent?.monthlyRent} onChangeText={v => updateRent({ monthlyRent: v })} keyboardType="numeric" style={styles.halfInput} />
              <CustomInput label="Security Deposit (₹)" placeholder="e.g. 70000" value={form.rent?.securityDeposit} onChangeText={v => updateRent({ securityDeposit: v })} keyboardType="numeric" style={styles.halfInput} />
            </View>
            <View style={styles.row}>
              <CustomInput label="Available From" placeholder="YYYY-MM-DD" value={form.rent?.availableFrom} onChangeText={v => updateRent({ availableFrom: v })} style={styles.halfInput} />
              <CustomInput label="Maintenance Charges (₹)" placeholder="Optional" value={form.rent?.maintenanceCharges} onChangeText={v => updateRent({ maintenanceCharges: v })} keyboardType="numeric" style={styles.halfInput} />
            </View>
            <Selector label="BHK Type" options={BHK_TYPES.slice(0, 6)} selected={form.rent?.bhk} onSelect={v => updateRent({ bhk: v })} />
            <Selector label="Furnishing" options={FURNISHING_TYPES} selected={form.rent?.furnishing} onSelect={v => updateRent({ furnishing: v })} />
          </View>
        )}
      </View>

      {/* Sale Section */}
      <View style={styles.section}>
        <View style={styles.sectionToggle}>
          <View>
            <Text style={styles.sectionTitle}>🏠 For Sale</Text>
            <Text style={styles.sectionSubtitle}>List this apartment for sale</Text>
          </View>
          <Switch
            value={form.hasSale}
            onValueChange={v => updateForm({ hasSale: v })}
            trackColor={{ true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>
        {form.hasSale && (
          <View style={styles.sectionFields}>
            <View style={styles.row}>
              <CustomInput label="Sale Price (₹)" placeholder="e.g. 8500000" value={form.sale?.salePrice} onChangeText={v => updateSale({ salePrice: v })} keyboardType="numeric" style={styles.halfInput} />
              <CustomInput label="Carpet Area (sq ft)" placeholder="e.g. 1200" value={form.sale?.carpetArea} onChangeText={v => updateSale({ carpetArea: v })} keyboardType="numeric" style={styles.halfInput} />
            </View>
            <Selector label="BHK Type" options={BHK_TYPES.slice(0, 6)} selected={form.sale?.bhk} onSelect={v => updateSale({ bhk: v })} />
            <CustomInput label="Flat Details" placeholder="Floor, view, specific unit info" value={form.sale?.flatDetails} onChangeText={v => updateSale({ flatDetails: v })} multiline />
            <Selector
              label="Availability"
              options={['Available', 'Under Negotiation', 'Sold']}
              selected={form.sale?.availability}
              onSelect={v => updateSale({ availability: v })}
            />
          </View>
        )}
      </View>

      {!form.hasRent && !form.hasSale && (
        <View style={styles.skipNote}>
          <Text style={styles.skipNoteText}>
            💡 You can skip this step and add rent/sale information later by editing the listing.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl, lineHeight: 22 },
  section: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  sectionToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  sectionSubtitle: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 2 },
  sectionFields: { marginTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: SPACING.md },
  fieldLabel: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.medium, color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  option: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.inputBg },
  optionActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optionText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  optionTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  row: { flexDirection: 'row', gap: SPACING.sm },
  halfInput: { flex: 1, marginBottom: 0 },
  skipNote: { backgroundColor: '#FEF9C3', borderRadius: RADIUS.lg, padding: SPACING.md },
  skipNoteText: { fontSize: FONT_SIZES.sm, color: '#92400E', lineHeight: 20 },
});

export default Step8RentSale;
