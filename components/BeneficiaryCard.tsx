import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Calendar, Users } from 'lucide-react-native';

interface BeneficiaryCardProps {
  name: string;
  location: string;
  age: number;
  family: number;
  needs: string[];
  lastAid: string;
  status: 'Active' | 'Completed' | 'Pending';
  image: string;
  onPress?: () => void;
}

export default function BeneficiaryCard({
  name,
  location,
  age,
  family,
  needs,
  lastAid,
  status,
  image,
  onPress,
}: BeneficiaryCardProps) {
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
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color="#6b7280" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <View style={styles.familyRow}>
            <Users size={14} color="#6b7280" />
            <Text style={styles.familyText}>Family of {family} • Age {age}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(status)}15` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.needsContainer}>
        <Text style={styles.needsLabel}>Current Needs:</Text>
        <View style={styles.needsRow}>
          {needs.map((need, index) => (
            <View key={index} style={[styles.needBadge, { backgroundColor: `${getNeedColor(need)}15` }]}>
              <Text style={[styles.needText, { color: getNeedColor(need) }]}>{need}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.lastAidContainer}>
        <Calendar size={14} color="#6b7280" />
        <Text style={styles.lastAidText}>Last aid received: {lastAid}</Text>
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
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