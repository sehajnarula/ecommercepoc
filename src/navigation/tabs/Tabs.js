import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';
import Home from '../../screens/Home';
import Store from '../../screens/Store';

const Tab = createBottomTabNavigator();
const height = Dimensions.get('window').height;

const Tabs = () => {
  const [showTab, setShowTab] = useState(true);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#F0DCBC',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          // height: height * 0.12,
          // backgroundColor: '#000000',
          // borderTopWidth: 0,
          // elevation: 0,
          // transform: [{ translateY: showTab ? 0 : height * 0.12 }],

          // height: showTab ? height * 0.12 : 0,
          // backgroundColor: '#000000',
          // borderTopWidth: 0,
          // elevation: 0,
          // overflow: 'hidden', // so content doesn’t peek

          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: showTab ? height * 0.12 : 0,
          backgroundColor: '#000000',
          borderTopWidth: 0,
          elevation: 0,
          overflow: 'hidden',
          display: showTab ? 'flex' : 'none',
        },
        tabBarIcon: ({ focused }) => {
          const fillColor = focused ? '#F0DCBC' : '#FFFFFF';
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  width={20}
                  height={20}
                  tintColor={fillColor}
                  source={require('../../../assets/images/ellitebottomtabicon.png')}
                />
              );
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
      <Tab.Screen name="Home">
        {props => <Home {...props} setShowTab={setShowTab} />}
      </Tab.Screen>
      <Tab.Screen name="Store" component={Store} />
    </Tab.Navigator>
  );
};

export default Tabs;
