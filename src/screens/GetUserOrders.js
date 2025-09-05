import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const GetUserOrders = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <View style={{ flex: 1 }}></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default GetUserOrders;
