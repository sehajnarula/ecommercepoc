import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EditAddress from '../../assets/images/cartaddressedit.svg';
import LocationIcon from '../../assets/images/cartlocationicon.svg';
import PercentageIcon from '../../assets/images/discountoffercart.svg';
import FavourteIcon from '../../assets/images/homepagehearticon.svg';
import BackArrow from '../../assets/images/productinfoarrow.svg';
import { fontFamilies } from '../constants/fonts';

const Cart = () => {
  const navigation = useNavigation();

  const width = Dimensions.get('window').width;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <View style={{ backgroundColor: '#000000', height: 50 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                marginLeft: 5,
                marginTop: 15,
              }}
              activeOpacity={1}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <BackArrow width={18} height={18} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.medium,
                marginTop: 50,
                fontSize: 16,
                textAlign: 'center',
                position: 'absolute',
                alignSelf: 'center',
                width: '100%',
              }}
            >
              {'Cart'}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                position: 'absolute',
                right: 0,
                marginRight: 5,
                marginTop: 9,
              }}
            >
              <FavourteIcon width={32} height={32} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: '#151515',
                borderWidth: 1,
                borderColor: '#414141',
                padding: 15,
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 12,
              }}
            >
              <LocationIcon width={14} height={20} />
              <View style={{ marginLeft: 20, width: 175, height: 33 }}>
                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.medium,
                    fontSize: 13,
                    color: '#FFFFFF',
                  }}
                >
                  {`Deliver To: Sehaj Narula`}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.medium,
                    fontSize: 13,
                    color: '#FFFFFF',
                  }}
                  numberOfLines={1}
                >
                  {`48, Doctors Colony, Bhadson Road, Near Dhindsa Petrol Pump, Patiala`}
                </Text>
              </View>

              <TouchableOpacity
                style={{ position: 'absolute', right: 0, marginRight: 15 }}
                activeOpacity={0.9}
              >
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <EditAddress width={16} height={16} marginRight={3} />

                  <Text
                    style={{
                      color: '#F0DCBC',
                      fontFamily: fontFamilies.INTER.medium,
                      fontSize: 12,
                    }}
                  >{`Change`}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: '#F0DCBC',
                padding: 10,
                marginTop: 12,
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 12,
              }}
            >
              <Image
                source={require('../../assets/images/toweltwo.png')}
                style={{ width: 62, height: 59, borderRadius: 9 }}
              />

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.bold,
                    color: '#000000',
                    includeFontPadding: false,
                    fontSize: 12,
                  }}
                >{`3-Item Trial at ₹99`}</Text>

                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#000000',
                    marginTop: 5,
                    includeFontPadding: false,
                    fontSize: 10,
                  }}
                >{`Trial-At-Home`}</Text>

                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.medium,
                    color: '#000000',
                    marginTop: 5,
                    includeFontPadding: false,
                    fontSize: 10,
                    textDecorationLine: 'underline',
                  }}
                >{`View Benifits`}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: 120,
                  padding: 8,
                  marginLeft: 20,
                  borderRadius: 8,
                  backgroundColor: '#000000',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#F0DCBC',
                      fontFamily: fontFamilies.INTER.medium,
                      fontSize: 12,
                    }}
                  >{`Try Now @ ₹99`}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width * 0.9,
                backgroundColor: '#151515',
                borderWidth: 1,
                borderColor: '#414141',
                padding: 12,
                marginTop: 15,
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 12,
              }}
            >
              <PercentageIcon width={28} height={28} />

              <Text
                style={{
                  color: '#F4A300',
                  fontFamily: fontFamilies.INTER.regular,
                  fontSize: 13,
                  marginLeft: 10,
                }}
              >{`You just Saved ₹500`}</Text>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: fontFamilies.INTER.regular,
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >{`– Add more, save more!`}</Text>
            </View>

            <Text
              style={{
                marginTop: 20,
                marginLeft: 20,
                color: '#D5D5D5',
                fontFamily: fontFamilies.INTER.medium,
                fontSize: 14,
              }}
            >
              {'My Selections'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Cart;
