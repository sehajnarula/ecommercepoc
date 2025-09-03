import { Image, Text, TouchableOpacity, View } from 'react-native';
import AddToCart from '../../assets/images/addtocartcompletelook.svg';
import { fontFamilies } from '../constants/fonts';

const CompleteTheLookFlatListLayout = props => {
  return (
    <View
      style={{
        paddingTop: 12,
        width: 161,
        paddingBottom: 12,
        gap: 13,
        paddingHorizontal: 2,
        marginLeft: 12,
      }}
    >
      <Image
        style={{ width: 161, height: 159, borderRadius: 6 }}
        source={props.sendData.brandProductImg}
      />

      <Image
        style={{ width: 70, height: 19, marginTop: 2, marginLeft: 2 }}
        source={props.sendData.itemBrandLogo}
      />

      <Text
        style={{
          color: '#FFFFFF',
          fontFamily: fontFamilies.INTER.regular,
          fontSize: 16,
        }}
        // numberOfLines={1}
      >
        {props.sendData.brandProductName}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontFamily: fontFamilies.INTER.italic,
            color: '#F0DCBC',
            includeFontPadding: false,
            fontSize: 13,
          }}
        >{`₹ ${props.sendData.brandProductReducedPrice}`}</Text>

        <Text
          style={{
            fontFamily: fontFamilies.INTER.italic,
            color: '#C3C9D1',
            textDecorationLine: 'line-through',
            includeFontPadding: false,
            fontSize: 13,
            marginLeft: 10,
          }}
        >{`₹ ${props.sendData.brandProductOriginalPrice}`}</Text>

        <Text
          style={{
            fontFamily: fontFamilies.INTER.regular,
            color: '#8FC8A8',
            includeFontPadding: false,
            fontSize: 13,
            marginLeft: 10,
          }}
        >{`${props.sendData.discountPercentsgr}% Off`}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: '#191918',
          borderColor: '#414141',
          borderWidth: 1,
          paddingTop: 9,
          borderRadius: 4,
          paddingBottom: 9,
          width: 109,
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AddToCart width={14} height={14} />

          <Text
            style={{
              fontFamily: fontFamilies.INTER.medium,
              color: '#FFFFFF',
              fontSize: 12,
            }}
          >
            {`Add To Cart`}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteTheLookFlatListLayout;
