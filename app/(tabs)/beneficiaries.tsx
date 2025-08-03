import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, MapPin, Calendar, Users } from 'lucide-react-native';
import Modal from '@/components/Modal';
import FormModal from '@/components/FormModal';
import { useData } from '@/contexts/DataContext';

export default function BeneficiariesScreen() {
  const { beneficiaries, addBeneficiary } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    buttons: [] as Array<{ text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }>
  });

  const showModal = (title: string, message: string, buttons?: Array<{ text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }>) => {
    setModalConfig({ title, message, buttons: buttons || [] });
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  
  const beneficiaryFields = [
    { key: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Enter full name', required: true },
    { key: 'location', label: 'Location', type: 'text' as const, placeholder: 'Enter location', required: true },
    { key: 'age', label: 'Age', type: 'number' as const, placeholder: 'Enter age', required: true },
    { key: 'family', label: 'Family Size', type: 'number' as const, placeholder: 'Number of family members', required: true },
    { key: 'needs', label: 'Primary Need', type: 'select' as const, placeholder: 'Select primary need', required: true, options: ['Food', 'Water', 'Healthcare', 'Education', 'Housing', 'Medical', 'Other'] },
    { key: 'status', label: 'Status', type: 'select' as const, placeholder: 'Select status', required: true, options: ['active', 'completed', 'pending'] },
    { key: 'lastAid', label: 'Last Aid Date', type: 'date' as const, placeholder: 'Select last aid date', required: true },
  ];

  const handleBeneficiarySubmit = (data: any) => {
    addBeneficiary({
      ...data,
      age: parseInt(data.age),
      family: parseInt(data.family),
      needs: [data.needs],
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    });
    showModal('Success', 'Beneficiary added successfully!');
  };

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

  const handleAddBeneficiary = () => {
    setFormModalVisible(true);
  };

  const handleFilter = () => {
    showModal('Filter People', 'Filter by status, needs, location, or family size.');
  };

  const handleBeneficiaryCard = (beneficiary: any) => {
    showModal(
      beneficiary.name,
      `Location: ${beneficiary.location}\nAge: ${beneficiary.age}\nFamily: ${beneficiary.family} members\nNeeds: ${beneficiary.needs.join(', ')}\nStatus: ${beneficiary.status}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beneficiaries</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddBeneficiary}>
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
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
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
          <TouchableOpacity key={beneficiary.id} style={styles.beneficiaryCard} onPress={() => handleBeneficiaryCard(beneficiary)}>
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
      
      <Modal
        visible={modalVisible}
        onClose={hideModal}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
      />
      
      <FormModal
        visible={formModalVisible}
        onClose={() => setFormModalVisible(false)}
        title="Add New Beneficiary"
        fields={beneficiaryFields}
        onSubmit={handleBeneficiarySubmit}
      />
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