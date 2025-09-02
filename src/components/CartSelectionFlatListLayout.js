import { Image, Text, TouchableOpacity, View } from 'react-native';
import Minus from '../../assets/images/cartquantityminusnew.svg';
import Plus from '../../assets/images/cartquantityplusnew.svg';
import DeleteItem from '../../assets/images/deleteitemfromcart.svg';
import ThirtyMinuteIcon from '../../assets/images/thirtyminutesdeliveryicon.svg';
import { fontFamilies } from '../constants/fonts';

const CartSelectionFlatListLayout = props => {
  return (
    <View
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
        backgroundColor: '#151515',
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 12,
        borderColor: '#414141',
        gap: 14,
      }}
    >
      <Image
        source={props.sendData.brandProductImg}
        style={{
          width: 122,
          height: 161,
          borderRadius: 9,
        }}
      />

      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: 70,
            height: 19,
          }}
          source={props.sendData.itemBrandLogo}
        ></Image>

        <View
          style={{
            width: 130,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 8,
            borderRadius: 4,
            paddingRight: 8,
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#191918',
            borderColor: '#414141',
            borderWidth: 1,
            gap: 4,
          }}
        >
          <ThirtyMinuteIcon width={8} height={12} />

          <Text
            style={{
              color: '#8FC8A8',
              fontSize: 12,
              fontFamily: fontFamilies.INTER.medium,
              includeFontPadding: false,
            }}
          >
            {`30 min Delivery`}
          </Text>
        </View>

        <Text
          style={{
            color: '#C3C9D1',
            fontFamily: fontFamilies.INTER.regular,
            includeFontPadding: false,
            fontSize: 10,
            marginTop: 10,
          }}
        >{`Sold By: ${props.sendData.seller}`}</Text>

        <Text
          style={{
            fontFamily: fontFamilies.INTER.regular,
            fontSize: 12,
            marginTop: 5,
            color: '#FFFFFF',
          }}
          numberOfLines={1}
        >
          {props.sendData.brandProductName}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text
            style={{
              fontFamily: fontFamilies.INTER.italic,
              color: '#F0DCBC',
              includeFontPadding: false,
              fontSize: 12,
            }}
          >{`₹ ${props.sendData.brandProductReducedPrice}`}</Text>

          <Text
            style={{
              fontFamily: fontFamilies.INTER.italic,
              color: '#C3C9D1',
              textDecorationLine: 'line-through',
              includeFontPadding: false,
              fontSize: 12,
              marginLeft: 10,
            }}
          >{`₹ ${props.sendData.brandProductOriginalPrice}`}</Text>

          <Text
            style={{
              fontFamily: fontFamilies.INTER.regular,
              color: '#8FC8A8',
              includeFontPadding: false,
              fontSize: 12,
              marginLeft: 10,
            }}
          >{`${props.sendData.discountPercentsgr}% Off`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 64,
            height: 24,
            gap: 4,
            marginTop: 10,
            padding: 4,
            justifyContent: 'space-between',
            borderRadius: 2,
            borderWidth: 1,
            backgroundColor: '#191918',
            borderColor: '#5B5B5B',
          }}
        >
          <TouchableOpacity activeOpacity={0.9}>
            <Minus width={16} height={16} />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: fontFamilies.INTER.medium,
              color: '#D5D5D5',
              includeFontPadding: false,
              fontSize: 12,
            }}
          >
            {`${props.sendData.quantity}`}
          </Text>

          <TouchableOpacity activeOpacity={0.9}>
            <Plus width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity activeOpacity={1}>
        <View
          style={{
            padding: 5,
            borderRadius: 4,
            width: 22,
            height: 22,
            backgroundColor: '#2C2C2C',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DeleteItem width={12} height={12} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartSelectionFlatListLayout;
