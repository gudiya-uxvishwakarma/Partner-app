/**
 * HomeQuest — Partner App
 * Apartment Partner / Builder Management Platform
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PartnerProvider } from './src/context/PartnerContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PartnerProvider>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </PartnerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
