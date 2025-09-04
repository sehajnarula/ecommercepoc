import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={Splash} />
    </Stack.Navigator>
  );
};

export default Navigation;
