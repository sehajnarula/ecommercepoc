import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../../screens/Cart';
import User from '../../screens/User';
import ProductInformation from '../ecommercedemo/src/screens/ProductInformation';
import Tabs from '../tabs/Tabs';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="UserScreen" component={User} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ProductInfo" component={ProductInformation} />
    </Stack.Navigator>
  );
};

export default MainStack;
