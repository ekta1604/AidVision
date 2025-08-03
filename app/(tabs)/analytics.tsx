import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, DollarSign, Users, Package, MapPin, Calendar, Target } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const impactMetrics = [
    { label: 'Lives Impacted', value: '12,847', change: '+23%', trend: 'up', icon: Users },
    { label: 'Funds Distributed', value: '$847K', change: '+18%', trend: 'up', icon: DollarSign },
    { label: 'Active Projects', value: '23', change: '-2%', trend: 'down', icon: Package },
    { label: 'Locations Served', value: '12', change: '+50%', trend: 'up', icon: MapPin },
  ];

  const monthlyData = [
    { month: 'Jan', donations: 45000, beneficiaries: 1200 },
    { month: 'Feb', donations: 52000, beneficiaries: 1450 },
    { month: 'Mar', donations: 48000, beneficiaries: 1320 },
    { month: 'Apr', donations: 61000, beneficiaries: 1680 },
    { month: 'May', donations: 58000, beneficiaries: 1590 },
    { month: 'Jun', donations: 67000, beneficiaries: 1820 },
  ];

  const topCategories = [
    { name: 'Food Relief', amount: 245000, percentage: 35, color: '#ef4444' },
    { name: 'Healthcare', amount: 189000, percentage: 27, color: '#8b5cf6' },
    { name: 'Education', amount: 156000, percentage: 22, color: '#10b981' },
    { name: 'Water & Sanitation', amount: 110000, percentage: 16, color: '#3b82f6' },
  ];

  const maxDonation = Math.max(...monthlyData.map(d => d.donations));

  const handlePeriodChange = () => {
    Alert.alert(
      'Change Period',
      'Select time period for analytics',
      [
        { text: 'This Month' },
        { text: 'This Quarter' },
        { text: 'This Year' },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleMetricCard = (metric: any) => {
    Alert.alert(
      metric.label,
      `Current value: ${metric.value}\nChange: ${metric.change} from last period`,
      [{ text: 'OK' }]
    );
  };

  const handleGoalCard = () => {
    Alert.alert(
      'Annual Goal Progress',
      'You are 68% towards your goal of impacting 15,000 lives this year. Keep up the great work!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Impact Analytics</Text>
            <Text style={styles.headerSubtitle}>Track your global impact</Text>
          </View>
          <TouchableOpacity style={styles.periodButton} onPress={handlePeriodChange}>
            <Calendar size={20} color="#3b82f6" />
            <Text style={styles.periodText}>This Year</Text>
          </TouchableOpacity>
        </View>

        {/* Impact Metrics */}
        <View style={styles.metricsContainer}>
          {impactMetrics.map((metric, index) => (
            <TouchableOpacity key={index} style={styles.metricCard} onPress={() => handleMetricCard(metric)}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: `${metric.trend === 'up' ? '#10b981' : '#ef4444'}15` }]}>
                  <metric.icon size={20} color={metric.trend === 'up' ? '#10b981' : '#ef4444'} />
                </View>
                <View style={styles.trendContainer}>
                  {metric.trend === 'up' ? (
                    <TrendingUp size={16} color="#10b981" />
                  ) : (
                    <TrendingDown size={16} color="#ef4444" />
                  )}
                  <Text style={[styles.changeText, { color: metric.trend === 'up' ? '#10b981' : '#ef4444' }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Monthly Trends Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly Donations</Text>
          <View style={styles.chart}>
            {monthlyData.map((data, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.chartBar}>
                  <LinearGradient
                    colors={['#3b82f6', '#1d4ed8']}
                    style={[
                      styles.chartBarFill,
                      { height: `${(data.donations / maxDonation) * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.chartLabel}>{data.month}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.legendText}>Donations ($)</Text>
            </View>
          </View>
        </View>

        {/* Top Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          {topCategories.map((category, index) => (
            <View key={index} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryAmount}>${category.amount.toLocaleString()}</Text>
                </View>
                <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${category.percentage}%`,
                      backgroundColor: category.color 
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Goals Section */}
        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>2024 Goals</Text>
          <TouchableOpacity onPress={handleGoalCard}>
            <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.goalCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.goalHeader}>
              <Target size={24} color="#ffffff" />
              <Text style={styles.goalTitle}>Annual Impact Target</Text>
            </View>
            <Text style={styles.goalValue}>15,000 Lives</Text>
            <View style={styles.goalProgress}>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '68%' }]} />
              </View>
              <Text style={styles.goalProgressText}>68% Complete</Text>
            </View>
          </LinearGradient>
          </TouchableOpacity>
        </View>
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
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 2,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  metricCard: {
    width: (width - 60) / 2,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: 16,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 24,
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  chartBarFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  categoryAmount: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  goalCard: {
    padding: 24,
    borderRadius: 20,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  goalValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 20,
  },
  goalProgress: {
    gap: 12,
  },
  goalProgressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  goalProgressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});