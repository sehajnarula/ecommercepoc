import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Store = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <StatusBar backgroundColor="#171717" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, padding: 2 }}></View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Store;
