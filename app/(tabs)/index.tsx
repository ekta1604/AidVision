import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, TrendingUp, Users, Package, MapPin, Bell } from 'lucide-react-native';
import Modal from '@/components/Modal';
import FormModal from '@/components/FormModal';
import { useData } from '@/contexts/DataContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { getStats, addCampaign, donations } = useData();
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

  const appStats = getStats();
  const stats = [
    { label: 'Total Donations', value: `$${appStats.totalDonations.toLocaleString()}`, icon: Heart, color: '#ef4444' },
    { label: 'People Helped', value: appStats.totalBeneficiaries.toLocaleString(), icon: Users, color: '#10b981' },
    { label: 'Active Projects', value: appStats.activeCampaigns.toString(), icon: Package, color: '#3b82f6' },
    { label: 'Locations', value: appStats.totalLocations.toString(), icon: MapPin, color: '#f59e0b' },
  ];

  const recentActivity = donations.slice(0, 3).map(donation => ({
    title: donation.title,
    location: donation.location,
    amount: `$${donation.amount.toLocaleString()}`,
    time: new Date(donation.createdAt).toLocaleDateString()
  }));

  const handleNewCampaign = () => {
    setFormModalVisible(true);
  };

  const campaignFields = [
    { key: 'title', label: 'Campaign Title', type: 'text' as const, placeholder: 'Enter campaign title', required: true },
    { key: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Describe the campaign purpose and goals', required: true },
    { key: 'category', label: 'Category', type: 'select' as const, placeholder: 'Select category', required: true, options: ['Food', 'Water', 'Healthcare', 'Education', 'Housing', 'Emergency', 'Other'] },
    { key: 'location', label: 'Location', type: 'text' as const, placeholder: 'Enter location', required: true },
    { key: 'targetAmount', label: 'Target Amount ($)', type: 'number' as const, placeholder: 'Enter target amount', required: true },
    { key: 'startDate', label: 'Start Date', type: 'date' as const, placeholder: 'Select start date', required: true },
    { key: 'endDate', label: 'End Date', type: 'date' as const, placeholder: 'Select end date', required: true },
    { key: 'beneficiaries', label: 'Expected Beneficiaries', type: 'number' as const, placeholder: 'Number of people to help', required: true },
  ];

  const handleCampaignSubmit = (data: any) => {
    addCampaign({
      ...data,
      targetAmount: parseFloat(data.targetAmount),
      beneficiaries: parseInt(data.beneficiaries),
      currentAmount: 0,
      status: 'active' as const
    });
    showModal('Success', 'Campaign created successfully!');
  };

  const handleNotifications = () => {
    showModal('Notifications', 'You have 3 new updates about your donations.');
  };

  const handleStatCard = (statLabel: string) => {
    if (statLabel === 'Total Donations') {
      router.push('/donations');
    } else if (statLabel === 'People Helped') {
      router.push('/beneficiaries');
    } else if (statLabel === 'Active Projects' || statLabel === 'Locations') {
      router.push('/analytics');
    }
  };

  const handleActivityCard = (activity: any) => {
    showModal(
      activity.title,
      `Location: ${activity.location}\nAmount: ${activity.amount}\nTime: ${activity.time}`
    );
  };

  const handleQuickAction = (action: string) => {
    if (action === 'New Donation') {
      router.push('/donations');
    } else if (action === 'Add Beneficiary') {
      router.push('/beneficiaries');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>Sarah Chen</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotifications}>
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <LinearGradient
          colors={['#3b82f6', '#1d4ed8']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroTitle}>Making a Difference</Text>
          <Text style={styles.heroSubtitle}>
            Track your impact and see how your contributions are changing lives around the world
          </Text>
          <TouchableOpacity 
            style={styles.heroButton} 
            onPress={handleNewCampaign}
            activeOpacity={0.8}
          >
            <Text style={styles.heroButtonText}>Start New Campaign</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Impact Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard} onPress={() => handleStatCard(stat.label)}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/donations')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentActivity.map((activity, index) => (
            <TouchableOpacity key={index} style={styles.activityCard} onPress={() => handleActivityCard(activity)}>
              <View style={styles.activityIcon}>
                <TrendingUp size={20} color="#10b981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityLocation}>{activity.location}</Text>
              </View>
              <View style={styles.activityRight}>
                <Text style={styles.activityAmount}>{activity.amount}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => handleQuickAction('New Donation')}>
              <Package size={28} color="#3b82f6" />
              <Text style={styles.quickActionText}>New Donation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => handleQuickAction('Add Beneficiary')}>
              <Users size={28} color="#10b981" />
              <Text style={styles.quickActionText}>Add Beneficiary</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        title="Create New Campaign"
        fields={campaignFields}
        onSubmit={handleCampaignSubmit}
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
  greeting: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  heroCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#dbeafe',
    lineHeight: 24,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#3b82f6',
    fontWeight: '700',
    fontSize: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#dcfce7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
    textAlign: 'center',
  },
});