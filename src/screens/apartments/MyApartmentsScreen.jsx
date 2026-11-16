import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/index';
import ApartmentCard from '../../components/ApartmentCard';
import LoadingComponent from '../../components/LoadingComponent';
import EmptyState from '../../components/EmptyState';
import { apartmentService } from '../../services/apartmentService';

const STATUS_TABS = ['All', 'Published', 'Under Review', 'Draft', 'Rejected'];
const STATUS_FILTER_MAP = {
  'All': null,
  'Published': 'published',
  'Under Review': 'under_review',
  'Draft': 'draft',
  'Rejected': 'rejected',
};

const MyApartmentsScreen = ({ navigation }) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const fetchApartments = async () => {
    try {
      const res = await apartmentService.getAll();
      setApartments(res.data || []);
    } catch { setApartments([]); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { fetchApartments(); }, []);
  const onRefresh = useCallback(() => { setRefreshing(true); fetchApartments(); }, []);

  const filtered = STATUS_FILTER_MAP[activeTab]
    ? apartments.filter(a => a.status === STATUS_FILTER_MAP[activeTab])
    : apartments;

  const handleDelete = (apt) => {
    Alert.alert('Delete Apartment', `Delete "${apt.name}"? This cannot be undone.`, [
      { text: 'Cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          await apartmentService.delete(apt.id);
          setApartments(prev => prev.filter(a => a.id !== apt.id));
        },
      },
    ]);
  };

  if (loading) return <LoadingComponent fullScreen />;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Apartments</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddApartment')}>
          <Text style={styles.addBtnText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      {/* Status Tabs */}
      <FlatList
        data={STATUS_TABS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        keyExtractor={i => i}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.tab, activeTab === item && styles.tabActive]}
            onPress={() => setActiveTab(item)}
          >
            <Text style={[styles.tabText, activeTab === item && styles.tabTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="🏢"
          title={activeTab === 'All' ? 'No apartments yet' : `No ${activeTab.toLowerCase()} apartments`}
          message="Start by adding your first property listing"
          actionLabel="Add Apartment"
          onAction={() => navigation.navigate('AddApartment')}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
          ListHeaderComponent={() => (
            <Text style={styles.count}>{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</Text>
          )}
          renderItem={({ item }) => (
            <ApartmentCard
              apartment={item}
              onPress={() => navigation.navigate('ApartmentDetail', { apartment: item })}
              onEdit={() => navigation.navigate('AddApartment', { apartment: item, isEdit: true })}
              onDelete={() => handleDelete(item)}
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
  addBtn: {
    backgroundColor: COLORS.primary, borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
  },
  addBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  tabs: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.sm, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.white,
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  tabTextActive: { color: COLORS.white, fontFamily: FONTS.bold, fontWeight: '700' },
  list: { paddingHorizontal: SPACING.base, paddingTop: SPACING.md },
  count: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm },
});

export default MyApartmentsScreen;
