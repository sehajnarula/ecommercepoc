import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import keys from '../constants/keys';

const GetUserProfile = () => {
  const [userToken, setUserToken] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);

  const getUserStateLocally = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson !== null) {
        const user = JSON.parse(userJson);
        setUserToken(user.token);
        console.log('showuser', user);
      }
    } catch (error) {
      console.log('getuserlocallyerror', error);
    }
  };

  const getUserDetailsFromApi = async token => {
    try {
      const response = await axios.get(
        `${keys.appApiBaseUrl}api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUserDetails(response.data.data);
    } catch (error) {
      console.log('showerror', error);
    }
  };

  useEffect(() => {
    getUserStateLocally();
  }, []);

  useEffect(() => {
    if (userToken) {
      getUserDetailsFromApi(userToken);
    }
  }, [userToken]);

  const userName = useMemo(() => {
    if (!userDetails) return '';
    return userDetails.name;
  }, [userDetails]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{userName}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default GetUserProfile;
