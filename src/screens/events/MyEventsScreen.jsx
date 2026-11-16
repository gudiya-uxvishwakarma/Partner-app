import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/index';
import EventCard from '../../components/EventCard';
import LoadingComponent from '../../components/LoadingComponent';
import EmptyState from '../../components/EmptyState';
import { eventService } from '../../services/eventService';

const MyEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await eventService.getAll();
      setEvents(res.data || []);
    } catch { setEvents([]); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { fetchEvents(); }, []);
  const onRefresh = useCallback(() => { setRefreshing(true); fetchEvents(); }, []);

  const handleDelete = (evt) => {
    Alert.alert('Delete Event', `Delete "${evt.title}"?`, [
      { text: 'Cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          await eventService.delete(evt.id);
          setEvents(prev => prev.filter(e => e.id !== evt.id));
        },
      },
    ]);
  };

  if (loading) return <LoadingComponent fullScreen />;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My Events</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddEvent')}>
          <Text style={styles.addBtnText}>+ Add Event</Text>
        </TouchableOpacity>
      </View>

      {events.length === 0 ? (
        <EmptyState
          icon="🎉"
          title="No events yet"
          message="Create events to attract potential buyers"
          actionLabel="Add Event"
          onAction={() => navigation.navigate('AddEvent')}
        />
      ) : (
        <FlatList
          data={events}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => {}}
              onEdit={() => navigation.navigate('AddEvent', { event: item, isEdit: true })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.base, paddingTop: SPACING.md, paddingBottom: SPACING.sm,
    backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  title: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700' },
  addBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  addBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  list: { paddingHorizontal: SPACING.base, paddingTop: SPACING.md },
});

export default MyEventsScreen;
