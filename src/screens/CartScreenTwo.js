import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EditAddress from '../../assets/images/cartaddressedit.svg';
import LocationIcon from '../../assets/images/cartlocationicon.svg';
import PercentageIcon from '../../assets/images/discountoffercart.svg';
import CartSelectionsFlatList from '../components/CartSelectionsFlatList';
import CompleteTheLookFlatList from '../components/CompleteTheLookFlatList';
import { fontFamilies } from '../constants/fonts';

const CartScreenTwo = () => {
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CartScreenTwo;
