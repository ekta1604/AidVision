import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal as RNModal, Platform } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
}

export default function Modal({ visible, onClose, title, message, buttons = [] }: ModalProps) {
  const defaultButtons = buttons.length > 0 ? buttons : [
    { text: 'OK', onPress: onClose, style: 'default' as const }
  ];

  if (Platform.OS === 'web') {
    if (!visible) return null;
    
    return (
      <View style={styles.webOverlay}>
        <View style={styles.webModal}>
          <Text style={styles.webTitle}>{title}</Text>
          <Text style={styles.webMessage}>{message}</Text>
          <View style={styles.webButtonContainer}>
            {defaultButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.webButton,
                  button.style === 'destructive' && styles.webButtonDestructive,
                  button.style === 'cancel' && styles.webButtonCancel,
                ]}
                onPress={button.onPress}
              >
                <Text style={[
                  styles.webButtonText,
                  button.style === 'destructive' && styles.webButtonTextDestructive,
                  button.style === 'cancel' && styles.webButtonTextCancel,
                ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {defaultButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'destructive' && styles.buttonDestructive,
                  button.style === 'cancel' && styles.buttonCancel,
                ]}
                onPress={button.onPress}
              >
                <Text style={[
                  styles.buttonText,
                  button.style === 'destructive' && styles.buttonTextDestructive,
                  button.style === 'cancel' && styles.buttonTextCancel,
                ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 400,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  buttonCancel: {
    backgroundColor: '#f3f4f6',
  },
  buttonDestructive: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextCancel: {
    color: '#374151',
  },
  buttonTextDestructive: {
    color: '#ffffff',
  },
  // Web-specific styles
  webOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  webModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 400,
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
  },
  webTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  webMessage: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  webButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  webButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  webButtonCancel: {
    backgroundColor: '#f3f4f6',
  },
  webButtonDestructive: {
    backgroundColor: '#ef4444',
  },
  webButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  webButtonTextCancel: {
    color: '#374151',
  },
  webButtonTextDestructive: {
    color: '#ffffff',
  },
}); 