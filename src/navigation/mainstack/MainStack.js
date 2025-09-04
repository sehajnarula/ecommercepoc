import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from '../../screens/User';
import Tabs from '../tabs/Tabs';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="UserScreen" component={User} />
    </Stack.Navigator>
  );
};

export default MainStack;
