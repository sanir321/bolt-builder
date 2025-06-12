import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [walletAlerts, setWalletAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [animations, setAnimations] = useState(true);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Settings</Text>

        <SettingItem
          label="Dark Theme"
          value={theme === 'dark'}
          onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />

        <SettingItem
          label="Wallet Found Alerts"
          value={walletAlerts}
          onToggle={() => setWalletAlerts(!walletAlerts)}
        />

        <SettingItem
          label="Sound Effects"
          value={soundEffects}
          onToggle={() => setSoundEffects(!soundEffects)}
        />

        <SettingItem
          label="Vibration"
          value={vibration}
          onToggle={() => setVibration(!vibration)}
        />

        <SettingItem
          label="Animations"
          value={animations}
          onToggle={() => setAnimations(!animations)}
        />
      </ScrollView>
    </View>
  );
};

const SettingItem = ({ label, value, onToggle }: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onToggle}
      thumbColor={value ? '#8b5cf6' : '#999'}
      trackColor={{ true: '#a78bfa', false: '#444' }}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  container: {
    padding: 20,
    paddingBottom: 40, // to give breathing space without white gap
  },
  heading: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#eee',
    fontSize: 16,
  },
});

export default SettingsScreen;
