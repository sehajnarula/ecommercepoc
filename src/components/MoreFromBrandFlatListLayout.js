import { Image, Text, View } from 'react-native';
import { fontFamilies } from '../constants/fonts';

const MoreFromBrandFlatListLayout = props => {
  return (
    <View style={{ width: 161, height: 270, marginLeft: 18 }}>
      <View style={{ width: 161, height: 180 }}>
        <Image
          style={{ width: '100%', height: '100%', borderRadius: 7 }}
          source={props.sendData.brandProductImg}
        />
      </View>

      <Image
        style={{ width: 70, height: 19, marginTop: 5 }}
        source={props.sendData.brandLogo}
      />

      <Text
        style={{
          fontFamily: fontFamilies.INTER.regular,
          fontSize: 16,
          marginTop: 5,
          marginHorizontal: 2,
          color: '#FFFFFF',
        }}
        numberOfLines={2}
      >
        {props.sendData.brandProductName}
      </Text>

      <View style={{ flexDirection: 'row', marginLeft: 2 }}>
        <Text
          style={{
            color: '#F0DCBC',
            fontSize: 13,
            fontFamily: fontFamilies.INTER.regular,
          }}
        >{`₹ ${props.sendData.brandProductReducedPrice}`}</Text>
        <Text
          style={{
            color: '#FFFFFF99',
            fontSize: 13,
            marginLeft: 5,
            fontFamily: fontFamilies.INTER.regular,
            textDecorationLine: 'line-through',
          }}
        >{`₹ ${props.sendData.brandProductOriginalPrice}`}</Text>
        <Text
          style={{
            color: '#8FC8A8',
            fontSize: 13,
            marginLeft: 5,
            fontFamily: fontFamilies.INTER.regular,
          }}
        >{`${props.sendData.discountPercentsgr}% off`}</Text>
      </View>
    </View>
  );
};

export default MoreFromBrandFlatListLayout;
