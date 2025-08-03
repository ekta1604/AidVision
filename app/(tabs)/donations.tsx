import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, MapPin, Calendar, DollarSign, Users } from 'lucide-react-native';
import Modal from '@/components/Modal';
import FormModal from '@/components/FormModal';
import { useData } from '@/contexts/DataContext';

export default function DonationsScreen() {
  const { donations, addDonation } = useData();
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
  
  const donationFields = [
    { key: 'title', label: 'Donation Title', type: 'text' as const, placeholder: 'Enter donation title', required: true },
    { key: 'organization', label: 'Organization', type: 'text' as const, placeholder: 'Enter organization name', required: true },
    { key: 'location', label: 'Location', type: 'text' as const, placeholder: 'Enter location', required: true },
    { key: 'amount', label: 'Amount ($)', type: 'number' as const, placeholder: 'Enter amount', required: true },
    { key: 'date', label: 'Date', type: 'date' as const, placeholder: 'Select date', required: true },
    { key: 'category', label: 'Category', type: 'select' as const, placeholder: 'Select category', required: true, options: ['Food', 'Water', 'Healthcare', 'Education', 'Housing', 'Emergency', 'Other'] },
    { key: 'beneficiaries', label: 'Beneficiaries', type: 'number' as const, placeholder: 'Number of people helped', required: true },
    { key: 'status', label: 'Status', type: 'select' as const, placeholder: 'Select status', required: true, options: ['delivered', 'in_progress', 'pending'] },
  ];

  const handleDonationSubmit = (data: any) => {
    addDonation({
      ...data,
      amount: parseFloat(data.amount),
      beneficiaries: parseInt(data.beneficiaries)
    });
    showModal('Success', 'Donation added successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#10b981';
      case 'In Progress': return '#f59e0b';
      case 'Pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food': return '#ef4444';
      case 'Water': return '#3b82f6';
      case 'Healthcare': return '#8b5cf6';
      case 'Education': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleAddDonation = () => {
    setFormModalVisible(true);
  };

  const handleFilter = () => {
    showModal('Filter Donations', 'Filter by status, category, location, or date range.');
  };

  const handleDonationCard = (donation: any) => {
    showModal(
      donation.title,
      `Organization: ${donation.organization}\nLocation: ${donation.location}\nAmount: $${donation.amount.toLocaleString()}\nStatus: ${donation.status}\nBeneficiaries: ${donation.beneficiaries} people`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donations</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddDonation}>
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search donations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <Filter size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>$30,700</Text>
          <Text style={styles.summaryLabel}>Total This Month</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>1,990</Text>
          <Text style={styles.summaryLabel}>People Reached</Text>
        </View>
      </View>

      {/* Donations List */}
      <ScrollView style={styles.donationsList} showsVerticalScrollIndicator={false}>
        {donations.map((donation) => (
          <TouchableOpacity key={donation.id} style={styles.donationCard} onPress={() => handleDonationCard(donation)}>
            <View style={styles.donationHeader}>
              <View style={styles.donationTitleContainer}>
                <Text style={styles.donationTitle}>{donation.title}</Text>
                <Text style={styles.donationOrganization}>{donation.organization}</Text>
              </View>
              <View style={[styles.categoryBadge, { backgroundColor: `${getCategoryColor(donation.category)}15` }]}>
                <Text style={[styles.categoryText, { color: getCategoryColor(donation.category) }]}>
                  {donation.category}
                </Text>
              </View>
            </View>

            <View style={styles.donationDetails}>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#6b7280" />
                <Text style={styles.detailText}>{donation.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Calendar size={16} color="#6b7280" />
                <Text style={styles.detailText}>{donation.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Users size={16} color="#6b7280" />
                <Text style={styles.detailText}>{donation.beneficiaries} people</Text>
              </View>
            </View>

            <View style={styles.donationFooter}>
              <View style={styles.amountContainer}>
                <DollarSign size={18} color="#10b981" />
                <Text style={styles.donationAmount}>${donation.amount.toLocaleString()}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(donation.status)}15` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(donation.status) }]}>
                  {donation.status}
                </Text>
              </View>
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
        title="Add New Donation"
        fields={donationFields}
        onSubmit={handleDonationSubmit}
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
    backgroundColor: '#3b82f6',
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
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
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  donationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  donationCard: {
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
  donationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  donationTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  donationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  donationOrganization: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  donationDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  donationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  donationAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#10b981',
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
});