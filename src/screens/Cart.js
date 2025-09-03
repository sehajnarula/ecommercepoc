import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EditAddress from '../../assets/images/cartaddressedit.svg';
import LocationIcon from '../../assets/images/cartlocationicon.svg';
import PercentageIcon from '../../assets/images/discountoffercart.svg';
import ItemsInTrial from '../../assets/images/itemsaddedfortrial.svg';
import SecureMyOrderArrow from '../../assets/images/securemyorderarrow.svg';
import SellerLock from '../../assets/images/sellerlock.svg';
import CartSelectionsFlatList from '../components/CartSelectionsFlatList';
import CompleteTheLookFlatList from '../components/CompleteTheLookFlatList';
import { fontFamilies } from '../constants/fonts';

const Cart = () => {
  const cartArray = [
    {
      cartItemId: '1',
      itemBrandLogo: require('../../assets/images/tridentbrandlogo.png'),
      thirtyminuteDelivery: true,
      seller: 'Sehaj Narula',
      brandProductImg: require('../../assets/images/towelone.png'),
      brandProductName: `Aroma 1 Pc Pillow, Lavender, White|650`,
      brandProductOriginalPrice: `1499`,
      brandProductReducedPrice: `1455`,
      quantity: 1,
      discountPercentsgr: `46`,
    },
    {
      cartItemId: '2',
      itemBrandLogo: require('../../assets/images/tridentbrandlogo.png'),
      thirtyminuteDelivery: false,
      seller: 'Sehaj Narula',
      brandProductImg: require('../../assets/images/towelone.png'),
      brandProductName: `Aroma 1 Pc Pillow, Lavender, White|650`,
      brandProductOriginalPrice: `1499`,
      quantity: 1,
      brandProductReducedPrice: `1455`,
      discountPercentsgr: `46`,
    },
  ];

  const [dashArray, setDashArray] = useState([]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 16,
                paddingRight: 16,
                backgroundColor: '#151515',
                borderColor: '#414141',
                borderWidth: 1,
                borderRadius: 12,
                gap: 12,
                marginHorizontal: 16,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}
            >
              <LocationIcon width={14} height={20} />

              <View style={{ flex: 1, marginHorizontal: 5 }}>
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
                style={{
                  marginTop: 5,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
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
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 16,
                flexDirection: 'row',
                paddingLeft: 16,
                borderRadius: 12,
                marginHorizontal: 16,
                gap: 12,
                marginTop: 20,
                backgroundColor: '#F0DCBC',
              }}
            >
              <Image
                source={require('../../assets/images/toweltwo.png')}
                style={{
                  width: 62,
                  height: 59,
                  borderRadius: 9,
                }}
              />

              <View style={{ flex: 1, marginHorizontal: 7, marginTop: 5 }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: fontFamilies.INTER.bold,
                  }}
                >
                  {'3-Item Trial at ₹99'}
                </Text>

                <Text
                  style={{
                    color: '#000000',
                    fontSize: 10,
                    fontFamily: fontFamilies.INTER.regular,
                  }}
                >
                  {'Trial-At-Home'}
                </Text>

                <Text
                  style={{
                    color: '#000000',
                    fontSize: 10,
                    textDecorationLine: 'underline',
                    fontFamily: fontFamilies.INTER.medium,
                  }}
                >
                  {'View Benifits'}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  marginEnd: 15,
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    paddingTop: 8,
                    backgroundColor: '#000000',
                    gap: 9,
                    borderRadius: 8,
                    alignItems: 'center',
                    paddingBottom: 8,
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                >
                  <Text
                    style={{
                      color: '#F0DCBC',
                      fontSize: 12,
                      fontFamily: fontFamilies.INTER.medium,
                    }}
                  >
                    {'Added'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 16,
                paddingRight: 16,
                backgroundColor: '#151515',
                borderColor: '#414141',
                borderWidth: 1,
                borderRadius: 12,
                gap: 8,
                marginHorizontal: 16,
                marginTop: 20,
                flexDirection: 'row',
              }}
            >
              <PercentageIcon width={28} height={28} />

              <Text
                style={{
                  color: '#F4A300',
                  fontSize: 13,
                  marginTop: 5,
                  fontFamily: fontFamilies.INTER.regular,
                  includeFontPadding: false,
                }}
              >
                {`You Just Saved ₹500`}
              </Text>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 13,
                  marginTop: 5,
                  fontFamily: fontFamilies.INTER.regular,
                  includeFontPadding: false,
                }}
              >
                {`- Add more, save more`}
              </Text>
            </View>

            <Text
              style={{
                color: '#D5D5D5',
                fontSize: 14,
                marginLeft: 16,
                marginTop: 40,
                fontFamily: fontFamilies.INTER.medium,
                includeFontPadding: false,
              }}
            >
              {`My Selections`}
            </Text>

            <CartSelectionsFlatList isHorizontal={false} data={cartArray} />

            <Text
              style={{
                color: '#D5D5D5',
                fontSize: 14,
                marginLeft: 16,
                marginTop: 10,
                fontFamily: fontFamilies.INTER.medium,
                includeFontPadding: false,
              }}
            >
              {`Complete The Look`}
            </Text>

            <CompleteTheLookFlatList isHorizontal={false} data={cartArray} />

            <Text
              style={{
                color: '#D5D5D5',
                fontSize: 14,
                marginLeft: 16,
                marginTop: 10,
                fontFamily: fontFamilies.INTER.medium,
                includeFontPadding: false,
              }}
            >
              {`Order Summary`}
            </Text>

            <View
              style={{
                padding: 16,
                gap: 10,
                borderRadius: 12,
                borderWidth: 1,
                marginHorizontal: 16,
                marginTop: 10,
                backgroundColor: '#151515',
                borderColor: '#FFFFFF52',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#D5D5D5',
                    includeFontPadding: false,
                  }}
                >
                  {`Item Total`}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: fontFamilies.INTER.regular,
                      color: '#FFFFFF99',
                      marginRight: 5,
                      textDecorationLine: 'line-through',
                      includeFontPadding: false,
                    }}
                  >
                    {`₹2,998`}
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: fontFamilies.INTER.regular,
                      color: '#FFFFFF',
                      includeFontPadding: false,
                    }}
                  >
                    {`₹2,910`}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#D5D5D5',
                    includeFontPadding: false,
                  }}
                >
                  {`Free cash for you`}
                </Text>

                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#8FC8A8',
                    includeFontPadding: false,
                  }}
                >
                  {`-₹300`}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#D5D5D5',
                    includeFontPadding: false,
                  }}
                >
                  {`Handling Fee`}
                </Text>

                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#FFFFFF',
                    includeFontPadding: false,
                  }}
                >
                  {`₹20`}
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 1,
                  borderColor: '#6C6C6C',
                  borderWidth: 1,
                  marginTop: 5,
                  borderStyle: 'dashed',
                }}
              ></View>

              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#D5D5D5',
                    includeFontPadding: false,
                  }}
                >
                  {`Delivery Partner Fee`}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: fontFamilies.INTER.regular,
                      color: '#FFFFFF99',
                      marginRight: 5,
                      textDecorationLine: 'line-through',
                      includeFontPadding: false,
                    }}
                  >
                    {`₹2,998`}
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: fontFamilies.INTER.regular,
                      color: '#8FC8A8',
                      includeFontPadding: false,
                    }}
                  >
                    {`Free`}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#D5D5D5',
                    includeFontPadding: false,
                  }}
                >
                  {`Free Cash for you`}
                </Text>

                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#8FC8A8',
                    includeFontPadding: false,
                  }}
                >
                  {`₹2,688`}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#D5D5D5',
                    includeFontPadding: false,
                  }}
                >
                  {`Gst and Charges`}
                </Text>

                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#FFFFFF',
                    includeFontPadding: false,
                  }}
                >
                  {`₹ 40`}
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 1,
                  borderColor: '#6C6C6C',
                  borderWidth: 1,
                  marginTop: 5,
                  borderStyle: 'dashed',
                }}
              ></View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.medium,
                    color: '#FFFFFF',
                    includeFontPadding: false,
                  }}
                >
                  {`To Pay:`}
                </Text>

                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.medium,
                    color: '#FFFFFF',
                    includeFontPadding: false,
                  }}
                >
                  {`₹ 40`}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#2A2929',
                borderColor: '#4D4D4D',
                padding: 5,
                marginTop: 30,
                borderWidth: 1,
              }}
            >
              <LinearGradient
                style={{
                  width: 24,
                  height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  paddingLeft: 5,
                  marginTop: 7,
                  marginLeft: 5,
                  paddingRight: 5,
                  gap: 10,
                }}
                colors={['#F0DCBC', '#8A7F6C']}
              >
                <ItemsInTrial width={11} height={11} />
              </LinearGradient>

              <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 3 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fontFamilies.INTER.medium,
                    color: '#FFFFFF',
                  }}
                >
                  {`2 Items Added For Trial`}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#F0DCBC',
                  }}
                >
                  {`Choose up to 3 items to try at home`}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  marginRight: 8,
                  marginTop: 12,
                }}
                activeOpacity={0.9}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 12,
                    paddingRight: 12,
                    gap: 5,
                    borderRadius: 4,
                    backgroundColor: '#2A2929',
                    borderWidth: 1,
                    borderColor: '#F0DCBC',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.medium,
                      color: '#F0DCBC',
                      fontSize: 12,
                    }}
                  >
                    {'Remove'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 24,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 10,
                justifyContent: 'space-between',
                backgroundColor: '#171717',
                // borderWidth: 1,
                // borderColor: '#4D4D4DDD',
              }}
            >
              <View style={{ marginTop: 3 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: fontFamilies.INTER.medium,
                    color: '#FFFFFF',
                    includeFontPadding: false,
                  }}
                >
                  {`₹23,000`}
                </Text>

                <View
                  style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5 }}
                >
                  <SellerLock width={9} height={10} marginTop={2} />

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fontFamilies.INTER.medium,
                      color: '#F8CD77',
                      marginLeft: 8,
                      includeFontPadding: false,
                    }}
                  >
                    {`Ramayan Handloom`}
                  </Text>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 7 }}>
                <View
                  style={{
                    backgroundColor: '#F0DCBC',
                    paddingTop: 10,
                    flexDirection: 'row',
                    paddingBottom: 10,
                    paddingLeft: 12,
                    paddingRight: 12,
                    gap: 10,
                    borderRadius: 4,
                    alignItems: 'center',
                    width: 174,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.bold,
                      color: '#000000',
                      fontSize: 12,
                      includeFontPadding: false,
                    }}
                  >
                    {`SECURE MY ORDER`}
                  </Text>

                  <SecureMyOrderArrow width={14} height={14} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Cart;
