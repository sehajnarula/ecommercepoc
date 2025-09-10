import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image } from 'react-native';
import Home from '../../screens/Home';
import Store from '../../screens/Store';

const Tab = createBottomTabNavigator();
const height = Dimensions.get('window').height;

const Tabs = () => {
  const [showTab, setShowTab] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current; // controls opacity

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showTab ? 1 : 0, // fade in if true, fade out if false
      duration: showTab ? 700 : 500,
      useNativeDriver: true,
    }).start();
  }, [showTab]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#F0DCBC',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
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
          opacity: fadeAnim, // 👈 animated fade effect
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
