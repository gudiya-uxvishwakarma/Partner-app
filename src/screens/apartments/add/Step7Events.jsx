import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../../constants/index';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { EVENT_CATEGORIES } from '../../../constants/index';
import { generateId } from '../../../utils/helpers';

const EventForm = ({ event, onUpdate, onRemove }) => (
  <View style={styles.eventCard}>
    <View style={styles.eventHeader}>
      <Text style={styles.eventTitle}>Event Details</Text>
      <TouchableOpacity onPress={onRemove}><Text style={styles.removeText}>✕ Remove</Text></TouchableOpacity>
    </View>

    <CustomInput label="Event Name *" placeholder="e.g. Grand Launch Event" value={event.title} onChangeText={v => onUpdate({ title: v })} />

    <Text style={styles.fieldLabel}>Category</Text>
    <View style={styles.categoryRow}>
      {EVENT_CATEGORIES.map(c => (
        <TouchableOpacity key={c} style={[styles.catChip, event.category === c && styles.catChipActive]} onPress={() => onUpdate({ category: c })}>
          <Text style={[styles.catChipText, event.category === c && styles.catChipTextActive]}>{c}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <CustomInput label="Description" placeholder="What will happen at this event?" value={event.description} onChangeText={v => onUpdate({ description: v })} multiline numberOfLines={3} />
    <CustomInput label="Event Date" placeholder="YYYY-MM-DD" value={event.date} onChangeText={v => onUpdate({ date: v })} />
    <View style={styles.row}>
      <CustomInput label="Start Time" placeholder="10:00 AM" value={event.startTime} onChangeText={v => onUpdate({ startTime: v })} style={styles.halfInput} />
      <CustomInput label="End Time" placeholder="04:00 PM" value={event.endTime} onChangeText={v => onUpdate({ endTime: v })} style={styles.halfInput} />
    </View>
    <CustomInput label="Location" placeholder="Venue address" value={event.location} onChangeText={v => onUpdate({ location: v })} />
    <CustomInput label="Entry Fee (₹)" placeholder="Leave blank if free" value={event.entryFee} onChangeText={v => onUpdate({ entryFee: v })} keyboardType="numeric" />

    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>Registration Required</Text>
      <Switch
        value={event.registrationRequired}
        onValueChange={v => onUpdate({ registrationRequired: v })}
        trackColor={{ true: COLORS.primary }}
        thumbColor={COLORS.white}
      />
    </View>
  </View>
);

const Step7Events = ({ form, updateForm }) => {
  const addEvent = () => {
    const newEvent = {
      id: generateId(), title: '', category: '', description: '',
      date: '', startTime: '', endTime: '', location: '', entryFee: '', registrationRequired: false,
    };
    updateForm({ events: [...(form.events || []), newEvent] });
  };

  const updateEvent = (eventId, updates) => {
    updateForm({ events: form.events.map(e => e.id === eventId ? { ...e, ...updates } : e) });
  };

  const removeEvent = (eventId) => {
    Alert.alert('Remove Event', 'Remove this event?', [
      { text: 'Cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => updateForm({ events: form.events.filter(e => e.id !== eventId) }) },
    ]);
  };

  return (
    <View>
      <Text style={styles.stepTitle}>Apartment Events</Text>
      <Text style={styles.stepSubtitle}>Add any upcoming events related to this apartment (optional)</Text>

      {(!form.events || form.events.length === 0) && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyText}>No events added. You can skip this step.</Text>
        </View>
      )}

      {form.events?.map(event => (
        <EventForm
          key={event.id}
          event={event}
          onUpdate={updates => updateEvent(event.id, updates)}
          onRemove={() => removeEvent(event.id)}
        />
      ))}

      <CustomButton title="+ Add Event" variant="outline" onPress={addEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  emptyBox: { alignItems: 'center', paddingVertical: SPACING.xxl, backgroundColor: COLORS.inputBg, borderRadius: RADIUS.xl, marginBottom: SPACING.xl },
  emptyIcon: { fontSize: 40, marginBottom: SPACING.md },
  emptyText: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, textAlign: 'center' },
  eventCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.sm, borderWidth: 1, borderColor: COLORS.border },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  eventTitle: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  removeText: { fontSize: FONT_SIZES.sm, color: COLORS.error },
  fieldLabel: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.medium, color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  catChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.inputBg },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catChipText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  catChipTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  row: { flexDirection: 'row', gap: SPACING.sm },
  halfInput: { flex: 1, marginBottom: 0 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SPACING.sm },
  toggleLabel: { fontSize: FONT_SIZES.base, color: COLORS.text, fontFamily: FONTS.medium },
});

export default Step7Events;
