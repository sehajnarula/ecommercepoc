import { useNavigation } from '@react-navigation/native';
import React, { useReducer, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as progress from 'react-native-progress';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import AddressArrow from '../../assets/images/addressproductarrow.svg';
import BrandLogoCircular from '../../assets/images/brandlogoone.svg';
import ProductInfoNewIcon from '../../assets/images/closeproductinfonew.svg';
import FavouriteOnBottom from '../../assets/images/favoriteiconproductnew.svg';
import FavourteIcon from '../../assets/images/homepagehearticon.svg';
import AddressIconNew from '../../assets/images/productinfoaddressicon.svg';
import BackArrow from '../../assets/images/productinfoarrow.svg';
import CartIcon from '../../assets/images/productinfocart.svg';
import Star from '../../assets/images/productinfostar.svg';
import QuantityMinus from '../../assets/images/quantityminusicon.svg';
import QuantityPlus from '../../assets/images/quantityplusicon.svg';
import SaveMoreWithBulk from '../../assets/images/savemorewithbulkicon.svg';
import SearchIcon from '../../assets/images/searchinproductinfo.svg';
import MoreFromBrandFlatList from '../components/MoreFromBrandFlatList';
import { fontFamilies } from '../constants/fonts';
import { addItemsInCart } from '../redu/actions/CartActions';

const reducer = (state, changeState) => {
  switch (changeState.type) {
    case 'Increase':
      return { ...state, count: state.count + changeState.value };
    case 'Decrease':
      return {
        ...state,
        count: state.count > 0 ? state.count - changeState.value : 0,
      };
    default:
      return state;
  }
};

const ProductInformation = ({ route }) => {
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [productInfo, setProductInfo] = useState(true);
  const {
    categoryName,
    productName,
    productImage,
    originalPrice,
    productId,
    reducedPrice,
    rating,
    reviewCount,
  } = route.params;
  const originalPriceNumber = Number(originalPrice);
  const reducedPriceNumber = Number(reducedPrice);
  const reducedNumber = originalPriceNumber - reducedPriceNumber;
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [loading, setLoading] = useState(false);

  const addInCartBtn = async () => {
    setLoading(true);
    if (state.count !== 0) {
      await dispatched(
        addItemsInCart(
          productId,
          productName,
          categoryName,
          state.count,
          reducedPrice,
        ),
      );
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Added To Cart.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Add at least one quantity of the product.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const brandProducts = [
    {
      brandProductId: '2',
      brandLogo: require('../../assets/images/tridentbrandlogo.png'),
      brandProductImg: require('../../assets/images/towelone.png'),
      brandProductName: `Aroma 1 Pc Pillow, Lavender, White|650`,
      brandProductOriginalPrice: `1499`,
      brandProductReducedPrice: `1455`,
      discountPercentsgr: `46`,
    },
    {
      brandProductId: '3',
      brandLogo: require('../../assets/images/tridentbrandlogo.png'),
      brandProductImg: require('../../assets/images/towelone.png'),
      brandProductName: `Aroma 1 Pc Pillow, Lavender, White|650`,
      brandProductOriginalPrice: `1499`,
      brandProductReducedPrice: `1455`,
      discountPercentsgr: `46`,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0E0E0E' }}>
        <StatusBar backgroundColor="#171717" />
        {loading && (
          <View style={ProductInfoStyle.progressLoaderOverlayBg}>
            <View style={ProductInfoStyle.progressLoaderContainer}>
              <progress.Circle indeterminate size={50} color="#F0DCBC" />
            </View>
          </View>
        )}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ flex: 1, padding: 1, marginBottom: insets.bottom + 15 }}
          >
            <View
              style={{
                backgroundColor: '#000000',
                paddingBottom: 10,
                paddingTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16,
                paddingLeft: 16,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <BackArrow width={20} height={20} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#323130',
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                  borderRadius: 8,
                  alignItems: 'center',
                  width: 203,
                  marginTop: 1,
                  marginLeft: 15,
                  height: 39,
                }}
              >
                <SearchIcon width={15} height={15} />
                <TextInput
                  onChangeText={text => setSearch(text)}
                  autoCapitalize="none"
                  style={{
                    color: '#FFFFFF8F',
                    paddingVertical: 0,
                    flex: 1,
                    marginTop: 3,
                    height: '100%',
                    paddingHorizontal: 6,
                  }}
                  placeholderTextColor={'#FFFFFF8F'}
                  placeholder="Search"
                  value={search}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  right: 0,
                  marginRight: 15,
                }}
              >
                <FavourteIcon width={32} height={32} marginRight={10} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                >
                  <CartIcon width={32} height={32} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                height: 335,
                marginTop: 5,
                position: 'relative',
              }}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={productImage}
              />
              <View
                style={{
                  width: 101,
                  height: 35,
                  borderWidth: 1,
                  borderColor: '#F4A300',
                  borderRadius: 4,
                  padding: 10,
                  backgroundColor: '#171717',
                  position: 'absolute',
                  bottom: 0,
                  alignSelf: 'flex-end',
                  marginBottom: 10,
                  marginRight: 5,
                  justifyContent: 'center',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Star width={11} height={11} marginTop={1} />
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: fontFamilies.INTER.bold,
                      fontSize: 12,
                      includeFontPadding: false,
                      marginLeft: 3,
                    }}
                  >
                    {rating}
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: fontFamilies.INTER.medium,
                      fontSize: 12,
                      includeFontPadding: false,
                      marginLeft: 3,
                    }}
                  >
                    {`(${reviewCount})`}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontFamily: fontFamilies.INTER.medium,
                color: '#D5D5D5',
                fontSize: 24,
                marginTop: 10,
                marginHorizontal: 12,
              }}
            >
              {productName}
            </Text>
            <View style={{ flexDirection: 'row', marginLeft: 12 }}>
              <Text
                style={{
                  color: '#D5D5D5',
                  fontSize: 16,
                  fontFamily: fontFamilies.INTER.italic,
                  includeFontPadding: false,
                }}
              >
                {`₹ ${reducedPrice}/-`}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF8F',
                  fontFamily: fontFamilies.INTER.italic,
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 2,
                  textDecorationLine: 'line-through',
                  includeFontPadding: false,
                }}
              >
                {`₹ ${originalPrice}`}
              </Text>
              <Text
                style={{
                  color: '#8FC8A8',
                  fontFamily: fontFamilies.INTER.italic,
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 2,
                  includeFontPadding: false,
                }}
              >
                {`₹ ${reducedNumber} Off`}
              </Text>
            </View>
            <LinearGradient
              colors={['#FFFFFF33', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                padding: 0.56,
                width: 113,
                marginTop: 10,
                marginLeft: 12,
                borderRadius: 5,
              }}
            >
              <View style={{ backgroundColor: '#212121', padding: 3 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      padding: 5,
                      alignItems: 'center',
                      backgroundColor: '#424242',
                    }}
                    onPress={() => {
                      dispatch({ type: 'Decrease', value: 1 });
                    }}
                    activeOpacity={0.8}
                  >
                    <QuantityMinus width={13} hieght={13} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: fontFamilies.INTER.bold,
                      includeFontPadding: false,
                      fontSize: 17,
                    }}
                  >
                    {`${state.count}`}
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      padding: 5,
                      alignItems: 'center',
                      backgroundColor: '#424242',
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                      dispatch({ type: 'Increase', value: 1 });
                    }}
                  >
                    <QuantityPlus width={13} hieght={13} />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                backgroundColor: '#212121',
                borderWidth: 1,
                borderColor: '#353535',
                borderRadius: 8,
                paddingTop: 10,
                paddingBottom: 10,
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginHorizontal: 12,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <SaveMoreWithBulk width={21} height={21} />
                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.regular,
                    fontSize: 14,
                    includeFontPadding: false,
                    color: '#F0DCBC',
                    marginTop: 3,
                    marginLeft: 10,
                  }}
                >
                  {'Save More With Bulk Order'}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginLeft: 12 }}
            >
              <Text
                style={{
                  color: '#D5D5D5',
                  fontSize: 14,
                  fontFamily: fontFamilies.INTER.medium,
                  includeFontPadding: false,
                }}
              >
                {'Colour:'}
              </Text>
              <Text
                style={{
                  color: '#D5D5D5',
                  fontSize: 14,
                  fontFamily: fontFamilies.INTER.regular,
                  includeFontPadding: false,
                  marginLeft: 5,
                  marginTop: 1,
                }}
              >
                {'Royal White'}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginLeft: 12 }}
            >
              <Text
                style={{
                  color: '#D5D5D5',
                  fontSize: 14,
                  fontFamily: fontFamilies.INTER.medium,
                  includeFontPadding: false,
                }}
              >
                {'Seller:'}
              </Text>
              <Text
                style={{
                  color: '#D5D5D5',
                  fontSize: 14,
                  fontFamily: fontFamilies.INTER.regular,
                  includeFontPadding: false,
                  marginLeft: 10,
                  marginTop: 1,
                }}
              >
                {'Sehaj Narula'}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 12,
                borderColor: '#323130',
                borderWidth: 1,
                height: 1,
                marginTop: 20,
              }}
            ></View>
            <Text
              style={{
                marginTop: 12,
                marginLeft: 12,
                fontFamily: fontFamilies.INTER.medium,
                fontSize: 16,
                color: '#FFFFFF',
              }}
            >
              {'luxury comfort, premium finish'}
            </Text>
            <Text
              style={{
                marginTop: 5,
                marginHorizontal: 12,
                fontFamily: fontFamilies.INTER.regular,
                fontSize: 12,
                color: '#D5D5D599',
              }}
            >
              {`soft, breathable cotton bedsheet with 600 thread count, perfect for everyday luxury and restful sleep. comes with 4 matching pillow covers.`}
            </Text>

            <View style={{ marginHorizontal: 12 }}>
              <View
                style={{
                  width: '100%',
                  height: 250,
                  alignItems: 'center',
                  marginTop: 12,
                }}
              >
                <Image
                  source={productImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 12,
                  }}
                />

                <View style={{ marginTop: -50 }}>
                  <BrandLogoCircular width={73} height={73} />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 12,
                marginRight: 12,
                marginTop: 45,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamilies.INTER.medium,
                  fontSize: 14,
                  color: '#D5D5D5',
                }}
              >
                {'Product Information'}
              </Text>

              <TouchableOpacity
                activeOpacity={1}
                style={{ position: 'absolute', right: 0 }}
                onPress={() => setProductInfo(!productInfo)}
              >
                {productInfo ? (
                  <ProductInfoNewIcon width={24} height={24} />
                ) : (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      marginTop: 7,
                      marginRight: 8,
                    }}
                  >
                    <Image
                      source={require('../../assets/images/plusicontrsnp.png')}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {productInfo ? (
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: fontFamilies.INTER.regular,
                    fontSize: 12,
                    color: '#D5D5D5',
                    marginHorizontal: 12,
                  }}
                >
                  {
                    'Instructions for care: Hand wash or machine wash warm. do not use bleach. dry at low heat. warm iron recommended. do not dry clean'
                  }
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D5',
                    }}
                  >
                    {'material:'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D599',
                      marginLeft: 5,
                    }}
                  >
                    {'100% cotton'}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', marginTop: 3, marginLeft: 12 }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D5',
                    }}
                  >
                    {'type:'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D599',
                      marginLeft: 5,
                    }}
                  >
                    {'fitted bedsheet'}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', marginTop: 3, marginLeft: 12 }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D5',
                    }}
                  >
                    {'colour:'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D599',
                      marginLeft: 5,
                    }}
                  >
                    {'green'}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', marginTop: 3, marginLeft: 12 }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D5',
                    }}
                  >
                    {'pattern:'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D599',
                      marginLeft: 5,
                    }}
                  >
                    {'floral'}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', marginTop: 3, marginLeft: 12 }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D5',
                    }}
                  >
                    {'quality:'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D599',
                      marginLeft: 5,
                    }}
                  >
                    {'premium'}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', marginTop: 3, marginLeft: 12 }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D5',
                    }}
                  >
                    {'sustainable:'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D599',
                      marginLeft: 5,
                    }}
                  >
                    {'regular'}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', marginTop: 3, marginLeft: 12 }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D5',
                    }}
                  >
                    {'thread count:'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.INTER.regular,
                      fontSize: 12,
                      color: '#D5D5D599',
                      marginLeft: 5,
                    }}
                  >
                    {'600'}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 15,
                    marginHorizontal: 12,
                    fontSize: 12,
                    color: '#D5D5D5',
                    fontFamily: fontFamilies.INTER.regular,
                  }}
                >
                  {`package contents : 1 king-size bedsheet (274 cm x 274 cm) + 4 pillow covers (46 cm x 69 cm)`}
                </Text>
                <Text
                  style={{
                    marginTop: 15,
                    fontFamily: fontFamilies.INTER.regular,
                    color: '#D5D5D5CC',
                    marginHorizontal: 12,
                    fontSize: 12,
                  }}
                >
                  {`Hand Wash or Machine wash warm, Do not use bleach, Dry Low Heat, Warm Iron, Do not Dry Clean`}
                </Text>
              </View>
            ) : null}

            <View
              style={{
                marginHorizontal: 12,
                borderColor: '#323130',
                borderWidth: 1,
                height: 1,
                marginTop: 10,
              }}
            ></View>

            <Text
              style={{
                color: '#D5D5D5',
                fontSize: 14,
                fontFamily: fontFamilies.INTER.regular,
                marginLeft: 12,
                marginTop: 15,
              }}
            >
              {'MORE FROM TRIDENT'}
            </Text>

            <MoreFromBrandFlatList isHorizontal={false} data={brandProducts} />

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2A2929',
                paddingBottom: 8,
                height: 32,
                paddingTop: 8,
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <AddressIconNew width={10} height={8} marginTop={2} />
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    color: '#FFFFFFCC',
                    marginLeft: 5,
                  }}
                >
                  {'Deliver in 30 min,'}
                </Text>

                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: fontFamilies.INTER.regular,
                    includeFontPadding: false,
                    color: '#FFFFFF',
                    marginTop: 1,
                    marginLeft: 3,
                  }}
                >
                  {'Others 133001'}
                </Text>

                <AddressArrow
                  width={6}
                  height={4}
                  marginTop={5}
                  marginLeft={5}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 30,
              }}
            >
              <TouchableOpacity activeOpacity={0.9}>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    padding: 12,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#F0DCBC',
                    borderWidth: 0.56,
                    backgroundColor: '#171717',
                  }}
                >
                  <FavouriteOnBottom width={20} height={20} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: 139,
                  height: 45,
                  borderRadius: 12,
                  backgroundColor: '#F0DCBC',
                  padding: 10,
                }}
                onPress={() => {
                  addInCartBtn();
                }}
              >
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 14,
                      fontFamily: fontFamilies.INTER.bold,
                    }}
                  >
                    {'ADD TO CART'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: 139,
                  height: 45,
                  borderRadius: 12,
                  backgroundColor: '#171717',
                  borderWidth: 1,
                  borderColor: '#F0DCBC',
                  padding: 10,
                }}
              >
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text
                    style={{
                      color: '#F0DCBC',
                      fontSize: 14,
                      fontFamily: fontFamilies.INTER.bold,
                    }}
                  >
                    {'BUY NOW'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const ProductInfoStyle = StyleSheet.create({
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

export default ProductInformation;
