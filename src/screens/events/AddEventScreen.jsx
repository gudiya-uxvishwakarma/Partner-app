import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/index';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { EVENT_CATEGORIES } from '../../constants/index';
import { eventService } from '../../services/eventService';
import { TouchableOpacity } from 'react-native';

const INITIAL = {
  title: '', category: '', description: '',
  date: '', startTime: '', endTime: '', location: '',
  entryFee: '', registrationRequired: false,
};

const AddEventScreen = ({ navigation, route }) => {
  const { event: editEvent, isEdit } = route.params || {};
  const [form, setForm] = useState(editEvent || INITIAL);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title?.trim()) e.title = 'Event name is required';
    if (!form.date?.trim()) e.date = 'Event date is required';
    if (!form.location?.trim()) e.location = 'Location is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      if (isEdit) {
        await eventService.update(editEvent.id, form);
        Alert.alert('Updated', 'Event has been updated successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await eventService.create(form);
        Alert.alert('Created!', 'Event has been created successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('MainTabs', { screen: 'Events' }) },
        ]);
      }
    } catch (e) {
      Alert.alert('Error', e.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={isEdit ? 'Edit Event' : 'Add Event'} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        <CustomInput label="Event Name *" placeholder="e.g. Grand Launch Event" value={form.title} onChangeText={v => update('title', v)} error={errors.title} />

        <Text style={styles.fieldLabel}>Event Category</Text>
        <View style={styles.categoryRow}>
          {EVENT_CATEGORIES.map(c => (
            <TouchableOpacity key={c} style={[styles.catChip, form.category === c && styles.catChipActive]} onPress={() => update('category', c)}>
              <Text style={[styles.catChipText, form.category === c && styles.catChipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomInput label="Description" placeholder="Describe the event..." value={form.description} onChangeText={v => update('description', v)} multiline numberOfLines={3} />
        <CustomInput label="Event Date *" placeholder="YYYY-MM-DD" value={form.date} onChangeText={v => update('date', v)} error={errors.date} />
        <View style={styles.row}>
          <CustomInput label="Start Time" placeholder="10:00 AM" value={form.startTime} onChangeText={v => update('startTime', v)} style={styles.halfInput} />
          <CustomInput label="End Time" placeholder="04:00 PM" value={form.endTime} onChangeText={v => update('endTime', v)} style={styles.halfInput} />
        </View>
        <CustomInput label="Location *" placeholder="Full event venue address" value={form.location} onChangeText={v => update('location', v)} error={errors.location} />
        <CustomInput label="Entry Fee (₹)" placeholder="Leave blank if free" value={form.entryFee} onChangeText={v => update('entryFee', v)} keyboardType="numeric" />

        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleLabel}>Registration Required</Text>
            <Text style={styles.toggleSub}>Attendees must register to join</Text>
          </View>
          <Switch
            value={form.registrationRequired}
            onValueChange={v => update('registrationRequired', v)}
            trackColor={{ true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <CustomButton title={isEdit ? 'Update Event' : 'Create Event'} onPress={handleSubmit} loading={loading} />
        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  scroll: { paddingHorizontal: SPACING.base, paddingTop: SPACING.md },
  fieldLabel: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.medium, color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  catChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.inputBg },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catChipText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  catChipTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  row: { flexDirection: 'row', gap: SPACING.sm },
  halfInput: { flex: 1, marginBottom: 0 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border, marginBottom: SPACING.xl },
  toggleLabel: { fontSize: FONT_SIZES.base, fontFamily: FONTS.medium, color: COLORS.text, fontWeight: '600' },
  toggleSub: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginTop: 2 },
});

export default AddEventScreen;
