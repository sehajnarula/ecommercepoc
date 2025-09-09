import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import Home from '../../screens/Home';
import Store from '../../screens/Store';

const Tab = createBottomTabNavigator();
const height = Dimensions.get('window').height;

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#F0DCBC',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          height: height * 0.12,
          backgroundColor: '#000000',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIcon: ({ focused }) => {
          const fillColor = focused ? '#F0DCBC' : '#FFFFFF';
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  width={20}
                  height={20}
                  tintColor={focused ? '#F0DCBC' : '#FFFFFF'}
                  source={require('../../../assets/images/ellitebottomtabicon.png')}
                />
              );
            // case 'Cart':
            //   return (
            //     <Image
            //       width={20}
            //       height={20}
            //       tintColor={fillColor}
            //       source={require('../../../assets/images/bottomtabcarticon.png')}
            //     />
            //   );
            case 'Store':
              return (
                <Image
                  width={20}
                  height={20}
                  tintColor={fillColor}
                  source={require('../../../assets/images/bottomtabstoreicon.png')}
                />
              );
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Cart" component={Cart} /> */}
      <Tab.Screen name="Store" component={Store} />
    </Tab.Navigator>
  );
};

export default Tabs;
