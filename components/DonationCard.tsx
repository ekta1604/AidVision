import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react-native';

interface DonationCardProps {
  title: string;
  organization: string;
  location: string;
  amount: number;
  date: string;
  status: 'Delivered' | 'In Progress' | 'Pending';
  beneficiaries: number;
  category: string;
  onPress?: () => void;
}

export default function DonationCard({
  title,
  organization,
  location,
  amount,
  date,
  status,
  beneficiaries,
  category,
  onPress,
}: DonationCardProps) {
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

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.organization}>{organization}</Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: `${getCategoryColor(category)}15` }]}>
          <Text style={[styles.categoryText, { color: getCategoryColor(category) }]}>
            {category}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#6b7280" />
          <Text style={styles.detailText}>{location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar size={16} color="#6b7280" />
          <Text style={styles.detailText}>{date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Users size={16} color="#6b7280" />
          <Text style={styles.detailText}>{beneficiaries} people</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.amountContainer}>
          <DollarSign size={18} color="#10b981" />
          <Text style={styles.amount}>${amount.toLocaleString()}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(status)}15` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  organization: {
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
  details: {
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
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