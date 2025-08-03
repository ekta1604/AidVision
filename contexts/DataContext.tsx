import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
  beneficiaries: number;
  createdAt: string;
}

interface Donation {
  id: string;
  title: string;
  organization: string;
  location: string;
  amount: number;
  date: string;
  status: 'delivered' | 'in_progress' | 'pending';
  beneficiaries: number;
  category: string;
  createdAt: string;
}

interface Beneficiary {
  id: string;
  name: string;
  location: string;
  age: number;
  family: number;
  needs: string[];
  lastAid: string;
  status: 'active' | 'completed' | 'pending';
  image: string;
  createdAt: string;
}

interface DataContextType {
  campaigns: Campaign[];
  donations: Donation[];
  beneficiaries: Beneficiary[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => void;
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  updateDonation: (id: string, updates: Partial<Donation>) => void;
  updateBeneficiary: (id: string, updates: Partial<Beneficiary>) => void;
  deleteCampaign: (id: string) => void;
  deleteDonation: (id: string) => void;
  deleteBeneficiary: (id: string) => void;
  getStats: () => {
    totalDonations: number;
    totalBeneficiaries: number;
    activeCampaigns: number;
    totalLocations: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Emergency Food Relief',
      description: 'Providing immediate food assistance to families affected by natural disasters',
      category: 'Food',
      location: 'Haiti',
      targetAmount: 10000,
      currentAmount: 5200,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'active',
      beneficiaries: 340,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Clean Water Infrastructure',
      description: 'Building sustainable water systems in rural communities',
      category: 'Water',
      location: 'Kenya',
      targetAmount: 15000,
      currentAmount: 12500,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'active',
      beneficiaries: 850,
      createdAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      title: 'Emergency Food Relief',
      organization: 'World Food Programme',
      location: 'Haiti',
      amount: 5200,
      date: '2024-01-15',
      status: 'delivered',
      beneficiaries: 340,
      category: 'Food',
      createdAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'Clean Water Infrastructure',
      organization: 'Water.org',
      location: 'Kenya',
      amount: 12500,
      date: '2024-01-12',
      status: 'in_progress',
      beneficiaries: 850,
      category: 'Water',
      createdAt: '2024-01-12T00:00:00Z'
    },
    {
      id: '3',
      title: 'Medical Supply Distribution',
      organization: 'Doctors Without Borders',
      location: 'Bangladesh',
      amount: 8300,
      date: '2024-01-10',
      status: 'delivered',
      beneficiaries: 520,
      category: 'Healthcare',
      createdAt: '2024-01-10T00:00:00Z'
    }
  ]);

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: '1',
      name: 'Maria Santos',
      location: 'Port-au-Prince, Haiti',
      age: 34,
      family: 4,
      needs: ['Food', 'Medical'],
      lastAid: '2024-01-15',
      status: 'active',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      location: 'Nairobi, Kenya',
      age: 28,
      family: 6,
      needs: ['Water', 'Education'],
      lastAid: '2024-01-12',
      status: 'active',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Fatima Rahman',
      location: 'Dhaka, Bangladesh',
      age: 42,
      family: 3,
      needs: ['Healthcare', 'Housing'],
      lastAid: '2024-01-10',
      status: 'completed',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const addDonation = (donationData: Omit<Donation, 'id' | 'createdAt'>) => {
    const newDonation: Donation = {
      ...donationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setDonations(prev => [newDonation, ...prev]);
  };

  const addBeneficiary = (beneficiaryData: Omit<Beneficiary, 'id' | 'createdAt'>) => {
    const newBeneficiary: Beneficiary = {
      ...beneficiaryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBeneficiaries(prev => [newBeneficiary, ...prev]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const updateDonation = (id: string, updates: Partial<Donation>) => {
    setDonations(prev => prev.map(donation => 
      donation.id === id ? { ...donation, ...updates } : donation
    ));
  };

  const updateBeneficiary = (id: string, updates: Partial<Beneficiary>) => {
    setBeneficiaries(prev => prev.map(beneficiary => 
      beneficiary.id === id ? { ...beneficiary, ...updates } : beneficiary
    ));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const deleteDonation = (id: string) => {
    setDonations(prev => prev.filter(donation => donation.id !== id));
  };

  const deleteBeneficiary = (id: string) => {
    setBeneficiaries(prev => prev.filter(beneficiary => beneficiary.id !== id));
  };

  const getStats = () => {
    const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const totalBeneficiaries = beneficiaries.length;
    const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active').length;
    const locations = new Set([...campaigns.map(c => c.location), ...donations.map(d => d.location), ...beneficiaries.map(b => b.location.split(',')[0])]).size;

    return {
      totalDonations,
      totalBeneficiaries,
      activeCampaigns,
      totalLocations: locations
    };
  };

  const value: DataContextType = {
    campaigns,
    donations,
    beneficiaries,
    addCampaign,
    addDonation,
    addBeneficiary,
    updateCampaign,
    updateDonation,
    updateBeneficiary,
    deleteCampaign,
    deleteDonation,
    deleteBeneficiary,
    getStats
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 