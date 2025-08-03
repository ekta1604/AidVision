import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit3, Award, Heart, ChevronRight, Star } from 'lucide-react-native';

export default function ProfileScreen() {
  const achievements = [
    { title: 'First Donation', icon: Heart, color: '#ef4444' },
    { title: 'Impact Champion', icon: Award, color: '#f59e0b' },
    { title: 'Global Helper', icon: Star, color: '#8b5cf6' },
  ];

  const menuItems = [
    { title: 'Account Settings', icon: Settings, color: '#6b7280' },
    { title: 'Notifications', icon: Bell, color: '#3b82f6' },
    { title: 'Privacy & Security', icon: Shield, color: '#10b981' },
    { title: 'Help & Support', icon: HelpCircle, color: '#f59e0b' },
  ];

  const handleEditImage = () => {
    Alert.alert(
      'Change Profile Photo',
      'Select a new profile photo',
      [
        { text: 'Camera' },
        { text: 'Photo Library' },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleMenuItem = (title: string) => {
    Alert.alert(title, `Opening ${title} settings...`, [{ text: 'OK' }]);
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Signing out...') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#3b82f6', '#1d4ed8']}
          style={styles.profileHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton} onPress={handleEditImage}>
              <Edit3 size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Sarah Chen</Text>
          <Text style={styles.profileEmail}>sarah.chen@email.com</Text>
          <Text style={styles.profileJoined}>Member since January 2023</Text>
        </LinearGradient>

        {/* Impact Summary */}
        <View style={styles.impactSummary}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.impactGrid}>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>$12,450</Text>
              <Text style={styles.impactLabel}>Total Donated</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>847</Text>
              <Text style={styles.impactLabel}>Lives Touched</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>23</Text>
              <Text style={styles.impactLabel}>Projects Supported</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactValue}>8</Text>
              <Text style={styles.impactLabel}>Countries Reached</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}15` }]}>
                  <achievement.icon size={24} color={achievement.color} />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleMenuItem(item.title)}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                  <item.icon size={20} color={item.color} />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#dbeafe',
    marginBottom: 8,
  },
  profileJoined: {
    fontSize: 14,
    color: '#bfdbfe',
    fontWeight: '500',
  },
  impactSummary: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  impactCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  impactValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  achievementsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementCard: {
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
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  bottomSpacer: {
    height: 32,
  },
});