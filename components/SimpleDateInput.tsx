import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface SimpleDateInputProps {
  label: string;
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function SimpleDateInput({ 
  label, 
  value, 
  placeholder, 
  onValueChange, 
  required = false,
  error 
}: SimpleDateInputProps) {

  const handleDateSelect = () => {
    if (Platform.OS === 'web') {
      // Create a hidden input element for web
      const input = document.createElement('input');
      input.type = 'date';
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      input.style.top = '-9999px';
      input.style.opacity = '0';
      input.style.pointerEvents = 'none';
      
      document.body.appendChild(input);
      
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        console.log('Date selected:', target.value);
        onValueChange(target.value);
        document.body.removeChild(input);
      };
      
      input.click();
    } else {
      // For mobile, we'll use a simple text input for now
      // In a real app, you'd use a proper date picker
      const today = new Date().toISOString().split('T')[0];
      onValueChange(today);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      
      <TouchableOpacity
        style={[styles.input, error && styles.error]}
        onPress={handleDateSelect}
      >
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  placeholder: {
    color: '#9ca3af',
  },
  calendarIcon: {
    fontSize: 16,
    color: '#6b7280',
  },
  error: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
}); 