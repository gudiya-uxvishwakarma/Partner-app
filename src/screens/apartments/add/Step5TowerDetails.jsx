import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView,
} from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../../constants/index';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { BHK_TYPES } from '../../../constants/index';
import { generateId } from '../../../utils/helpers';

const FlatEditor = ({ flat, onUpdate, onRemove }) => (
  <View style={styles.flatCard}>
    <View style={styles.flatHeader}>
      <Text style={styles.flatTitle}>Flat {flat.number || '—'}</Text>
      <TouchableOpacity onPress={onRemove}><Text style={styles.removeText}>✕ Remove</Text></TouchableOpacity>
    </View>
    <View style={styles.row}>
      <CustomInput label="Flat No." placeholder="e.g. 101" value={flat.number} onChangeText={v => onUpdate({ number: v })} style={styles.halfInput} />
      <CustomInput label="Area (sq ft)" placeholder="e.g. 1200" value={flat.area} onChangeText={v => onUpdate({ area: v })} keyboardType="numeric" style={styles.halfInput} />
    </View>
    <Text style={styles.bhkLabel}>BHK Type</Text>
    <View style={styles.bhkRow}>
      {BHK_TYPES.map(b => (
        <TouchableOpacity key={b} style={[styles.bhkChip, flat.bhk === b && styles.bhkChipActive]} onPress={() => onUpdate({ bhk: b })}>
          <Text style={[styles.bhkChipText, flat.bhk === b && styles.bhkChipTextActive]}>{b}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.row}>
      <CustomInput label="Price (₹)" placeholder="Optional" value={flat.price} onChangeText={v => onUpdate({ price: v })} keyboardType="numeric" style={styles.halfInput} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bhkLabel}>Availability</Text>
        <View style={styles.availRow}>
          {['Available', 'Booked', 'Sold'].map(a => (
            <TouchableOpacity key={a} style={[styles.availChip, flat.availability === a && styles.availChipActive]} onPress={() => onUpdate({ availability: a })}>
              <Text style={[styles.availChipText, flat.availability === a && styles.availChipTextActive]}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </View>
);

const TowerEditor = ({ tower, onUpdate, onRemove }) => {
  const addFlat = () => {
    const newFlat = { id: generateId(), number: '', bhk: '', area: '', price: '', availability: 'Available' };
    onUpdate({ flats: [...(tower.flats || []), newFlat] });
  };

  const updateFlat = (flatId, updates) => {
    onUpdate({ flats: tower.flats.map(f => f.id === flatId ? { ...f, ...updates } : f) });
  };

  const removeFlat = (flatId) => {
    onUpdate({ flats: tower.flats.filter(f => f.id !== flatId) });
  };

  return (
    <View style={styles.towerCard}>
      <View style={styles.towerHeader}>
        <Text style={styles.towerTitle}>Tower Details</Text>
        <TouchableOpacity onPress={onRemove}><Text style={styles.removeTowerText}>✕ Remove Tower</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <CustomInput label="Tower Name" placeholder="e.g. Tower A" value={tower.name} onChangeText={v => onUpdate({ name: v })} style={styles.halfInput} />
        <CustomInput label="No. of Floors" placeholder="e.g. 20" value={tower.floors} onChangeText={v => onUpdate({ floors: v })} keyboardType="numeric" style={styles.halfInput} />
      </View>
      <View style={styles.flatsSection}>
        <View style={styles.flatsSectionHeader}>
          <Text style={styles.flatsSectionTitle}>Flats in {tower.name || 'this tower'} ({tower.flats?.length || 0})</Text>
          <TouchableOpacity style={styles.addFlatBtn} onPress={addFlat}>
            <Text style={styles.addFlatText}>+ Add Flat</Text>
          </TouchableOpacity>
        </View>
        {tower.flats?.map(flat => (
          <FlatEditor key={flat.id} flat={flat} onUpdate={updates => updateFlat(flat.id, updates)} onRemove={() => removeFlat(flat.id)} />
        ))}
      </View>
    </View>
  );
};

const Step5TowerDetails = ({ form, updateForm }) => {
  const addTower = () => {
    const newTower = { id: generateId(), name: '', floors: '', images: [], flats: [] };
    updateForm({ towers: [...(form.towers || []), newTower] });
  };

  const updateTower = (towerId, updates) => {
    updateForm({ towers: form.towers.map(t => t.id === towerId ? { ...t, ...updates } : t) });
  };

  const removeTower = (towerId) => {
    Alert.alert('Remove Tower', 'Remove this tower and all its flats?', [
      { text: 'Cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => updateForm({ towers: form.towers.filter(t => t.id !== towerId) }) },
    ]);
  };

  return (
    <View>
      <Text style={styles.stepTitle}>Building / Tower / Flat Details</Text>
      <Text style={styles.stepSubtitle}>Add detailed structure information for your property</Text>

      {(!form.towers || form.towers.length === 0) && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🏗️</Text>
          <Text style={styles.emptyText}>No towers added yet. Add your first tower below.</Text>
        </View>
      )}

      {form.towers?.map(tower => (
        <TowerEditor
          key={tower.id}
          tower={tower}
          onUpdate={updates => updateTower(tower.id, updates)}
          onRemove={() => removeTower(tower.id)}
        />
      ))}

      <CustomButton title="+ Add Tower" variant="outline" onPress={addTower} />
    </View>
  );
};

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  emptyBox: { alignItems: 'center', paddingVertical: SPACING.xxl, backgroundColor: COLORS.inputBg, borderRadius: RADIUS.xl, marginBottom: SPACING.xl },
  emptyIcon: { fontSize: 40, marginBottom: SPACING.md },
  emptyText: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, textAlign: 'center' },
  towerCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.sm, borderWidth: 1, borderColor: COLORS.border },
  towerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  towerTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  removeTowerText: { fontSize: FONT_SIZES.sm, color: COLORS.error, fontFamily: FONTS.medium },
  row: { flexDirection: 'row', gap: SPACING.sm },
  halfInput: { flex: 1, marginBottom: 0 },
  flatsSection: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: SPACING.md, marginTop: SPACING.sm },
  flatsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  flatsSectionTitle: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.bold, color: COLORS.textSecondary, fontWeight: '700' },
  addFlatBtn: { paddingHorizontal: SPACING.md, paddingVertical: 4, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.round },
  addFlatText: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  flatCard: { backgroundColor: COLORS.inputBg, borderRadius: RADIUS.lg, padding: SPACING.sm, marginBottom: SPACING.sm },
  flatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  flatTitle: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  removeText: { fontSize: FONT_SIZES.xs, color: COLORS.error },
  bhkLabel: { fontSize: FONT_SIZES.xs, fontFamily: FONTS.medium, color: COLORS.text, marginBottom: SPACING.xs, fontWeight: '600' },
  bhkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginBottom: SPACING.sm },
  bhkChip: { paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.round, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.white },
  bhkChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  bhkChipText: { fontSize: 10, color: COLORS.textSecondary },
  bhkChipTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  availRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs },
  availChip: { paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.round, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.white },
  availChipActive: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  availChipText: { fontSize: 10, color: COLORS.textSecondary },
  availChipTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
});

export default Step5TowerDetails;
