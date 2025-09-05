import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as progress from 'react-native-progress';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import EditAddress from '../../assets/images/cartaddressedit.svg';
import LocationIcon from '../../assets/images/cartlocationicon.svg';
import PercentageIcon from '../../assets/images/discountoffercart.svg';
import FavouriteWhiteIconOnly from '../../assets/images/favoritewhiteonlyicon.svg';
import ItemsInTrial from '../../assets/images/itemsaddedfortrial.svg';
import BackArrow from '../../assets/images/navigatebacktoprevious.svg';
import SecureMyOrderArrow from '../../assets/images/securemyorderarrow.svg';
import SellerLock from '../../assets/images/sellerlock.svg';
import CartSelectionsFlatList from '../components/CartSelectionsFlatList';
import CompleteTheLookFlatList from '../components/CompleteTheLookFlatList';
import { fontFamilies } from '../constants/fonts';
import keys from '../constants/keys';
import { shiprocketAddOrderApiCall } from '../redu/actions/ShipRocketActions';

const Cart = () => {
  const [deliveryToken, setDeliveryToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartArrayLocal, setCartArrayLocal] = useState([]);
  const isFocused = useIsFocused();
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userDeliveryAddress, setUserDeliveryAddress] = useState('');

  const getShipRocketTockenLocally = async () => {
    setLoading(true);
    try {
      const getToken = await AsyncStorage.getItem('shiprockettoken');
      if (getToken !== null) {
        setDeliveryToken(getToken);
      }
      setLoading(false);
      console.log('showshiprockettoken', getToken);
    } catch (error) {
      setLoading(false);
      console.log('getlocalshiprockettokenerror', error);
    }
  };

  const getUserStateLocally = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson !== null) {
        const user = JSON.parse(userJson);

        let userSavedNumber = user.phoneNumber;

        if (userSavedNumber.startsWith('+91')) {
          userSavedNumber = userSavedNumber.substring(3);
        }

        setUserEmail(user.email);
        setUserName(user.name);
        setUserNumber(userSavedNumber);
        setUserDeliveryAddress(user.address);
        setUserToken(user.token);
        console.log('showuser', user);
      }
    } catch (error) {
      console.log('getuserlocallyerror', error);
    }
  };

  const getLocalCart = async () => {
    try {
      const getlocalCartItems = await AsyncStorage.getItem('saveditemsincart');
      const savedCart = getlocalCartItems ? JSON.parse(getlocalCartItems) : [];
      const savedCartWithoutId = savedCart.map(({ id, ...rest }) => rest);
      setCartArrayLocal(savedCartWithoutId);
      console.log('showlocalcartinscreen', savedCartWithoutId);
    } catch (error) {
      console.log('getlocalcarterror', error);
    }
  };

  const presentMoment = new Date();

  const year = presentMoment.getFullYear();
  const month = String(presentMoment.getMonth() + 1).padStart(2, '0');
  const day = String(presentMoment.getDate()).padStart(2, '0');
  const hours = String(presentMoment.getHours()).padStart(2, '0');
  const minutes = String(presentMoment.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  useEffect(() => {
    getShipRocketTockenLocally();
    getUserStateLocally();
    getLocalCart();
    console.log('showshiprocketdate', formattedDate);
  }, [isFocused]);

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

  const cartTotalPrice = 2100;
  const min = 10000;
  const max = 99999;
  const randomOrderId = Math.floor(Math.random() * (max - min + 1)) + min; // date format for shiprocket api

  const orderDetails = {
    order_id: `${randomOrderId}`,
    order_date: formattedDate,
    pickup_location: 'Home',
    billing_customer_name: userName,
    billing_last_name: 'Narula',
    billing_address: userDeliveryAddress,
    billing_city: 'Patiala',
    billing_pincode: '147001',
    billing_state: 'Punjab',
    billing_country: 'India',
    billing_email: userEmail,
    billing_phone: userNumber,
    shipping_is_billing: true,
    order_items: cartArrayLocal,
    payment_method: 'Prepaid',
    sub_total: `2100`,
    length: 10,
    breadth: 15,
    height: 5,
    weight: 0.5,
  };

  const addOrderInVendorDashboard = async () => {
    setLoading(true);
    await dispatched(shiprocketAddOrderApiCall(deliveryToken, orderDetails));
    setLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Order Placed To Vendor For Delivery.',
      autoHide: true,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const logo = Image.resolveAssetSource(
    require('../../assets/images/user.png'),
  ).uri;

  const startPayment = () => {
    var options = {
      description: 'Payment for order #12345',
      image: logo,
      currency: 'INR',
      key: keys.razorPayTestKey, // Test key
      amount: `${cartTotalPrice * 100}`,
      name: 'ecommercedemo',
      prefill: {
        email: 'sehajbir54@gmail.com',
        contact: '8872299999',
        name: 'Sehaj Bir Singh Narula',
      },
      theme: { color: '#000000' },
      method: 'upi',
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // success callback
        addOrderInVendorDashboard();
        // alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // failure callback
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <StatusBar backgroundColor="#171717" />

        {loading && (
          <View style={CartStyle.progressLoaderOverlayBg}>
            <View style={CartStyle.progressLoaderContainer}>
              <progress.Circle indeterminate size={50} color="#F0DCBC" />
            </View>
          </View>
        )}

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 16,
                paddingLeft: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#000000',
              }}
            >
              <TouchableOpacity activeOpacity={1}>
                <BackArrow width={18} height={18} />
              </TouchableOpacity>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: fontFamilies.INTER.medium,
                  fontSize: 16,
                }}
              >{`Cart`}</Text>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#F0EDE533',
                  width: 32,
                  height: 32,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 96,
                }}
              >
                <FavouriteWhiteIconOnly width={18} height={18} />
              </TouchableOpacity>
            </View>
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
                activeOpacity={0.7}
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

              <View style={{ flexDirection: 'row', flex: 1 }}>
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
                padding: 10,
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
                  marginTop: 15,
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
                  {`₹${cartTotalPrice}`}
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

              <TouchableOpacity
                activeOpacity={0.9}
                style={{ marginTop: 7 }}
                onPress={() => {
                  startPayment();
                }}
              >
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

const CartStyle = StyleSheet.create({
  progressLoaderOverlayBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  progressLoaderContainer: {
    elevation: 5,
    shadowColor: '#000',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
