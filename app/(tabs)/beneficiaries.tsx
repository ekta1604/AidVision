import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, MapPin, Calendar, Users } from 'lucide-react-native';

export default function BeneficiariesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const beneficiaries = [
    {
      id: 1,
      name: 'Maria Santos',
      location: 'Port-au-Prince, Haiti',
      age: 34,
      family: 4,
      needs: ['Food', 'Medical'],
      lastAid: '2024-01-15',
      status: 'Active',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      location: 'Nairobi, Kenya',
      age: 28,
      family: 6,
      needs: ['Water', 'Education'],
      lastAid: '2024-01-12',
      status: 'Active',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: 3,
      name: 'Fatima Rahman',
      location: 'Dhaka, Bangladesh',
      age: 42,
      family: 3,
      needs: ['Healthcare', 'Housing'],
      lastAid: '2024-01-10',
      status: 'Completed',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      id: 4,
      name: 'John Okafor',
      location: 'Lagos, Nigeria',
      age: 31,
      family: 5,
      needs: ['Education', 'Food'],
      lastAid: '2024-01-08',
      status: 'Pending',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Completed': return '#3b82f6';
      case 'Pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getNeedColor = (need: string) => {
    switch (need) {
      case 'Food': return '#ef4444';
      case 'Water': return '#3b82f6';
      case 'Healthcare': return '#8b5cf6';
      case 'Education': return '#10b981';
      case 'Housing': return '#f59e0b';
      case 'Medical': return '#ec4899';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beneficiaries</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search people..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2,847</Text>
          <Text style={styles.statLabel}>Total People</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1,923</Text>
          <Text style={styles.statLabel}>Currently Helped</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>924</Text>
          <Text style={styles.statLabel}>Awaiting Aid</Text>
        </View>
      </View>

      {/* Beneficiaries List */}
      <ScrollView style={styles.beneficiariesList} showsVerticalScrollIndicator={false}>
        {beneficiaries.map((beneficiary) => (
          <TouchableOpacity key={beneficiary.id} style={styles.beneficiaryCard}>
            <View style={styles.beneficiaryHeader}>
              <Image source={{ uri: beneficiary.image }} style={styles.profileImage} />
              <View style={styles.beneficiaryInfo}>
                <Text style={styles.beneficiaryName}>{beneficiary.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.locationText}>{beneficiary.location}</Text>
                </View>
                <View style={styles.familyRow}>
                  <Users size={14} color="#6b7280" />
                  <Text style={styles.familyText}>Family of {beneficiary.family} • Age {beneficiary.age}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(beneficiary.status)}15` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(beneficiary.status) }]}>
                  {beneficiary.status}
                </Text>
              </View>
            </View>

            <View style={styles.needsContainer}>
              <Text style={styles.needsLabel}>Current Needs:</Text>
              <View style={styles.needsRow}>
                {beneficiary.needs.map((need, index) => (
                  <View key={index} style={[styles.needBadge, { backgroundColor: `${getNeedColor(need)}15` }]}>
                    <Text style={[styles.needText, { color: getNeedColor(need) }]}>{need}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.lastAidContainer}>
              <Calendar size={14} color="#6b7280" />
              <Text style={styles.lastAidText}>Last aid received: {beneficiary.lastAid}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#10b981',
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  beneficiariesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  beneficiaryCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  beneficiaryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  beneficiaryInfo: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  familyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  familyText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  needsContainer: {
    marginBottom: 16,
  },
  needsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  needsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  needBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  needText: {
    fontSize: 12,
    fontWeight: '600',
  },
  lastAidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastAidText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
});