import { Image, Text, TouchableOpacity, View } from 'react-native';
import PlusIcon from '../../assets/images/completelookhorizontalpluscart.svg';
import { fontFamilies } from '../constants/fonts';

const CompleteTheLookHorizontalFlatListLayout = props => {
  return (
    <View
      style={{
        width: 220,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 9,
        paddingLeft: 9,
        flexDirection: 'row',
        backgroundColor: '#151515',
        borderColor: '#414141',
        borderRadius: 9,
        borderWidth: 0.76,
      }}
    >
      <Image
        style={{ width: 70, height: 60, borderRadius: 6 }}
        source={props.sendData.brandProductImg}
      />

      <View style={{ flex: 1, gap: 5 }}>
        <Text
          style={{
            fontSize: 10,
            color: '#FFFFFF',
            fontFamily: fontFamilies.INTER.regular,
            includeFontPadding: false,
          }}
          numberOfLines={1}
        >
          {props.sendData.brandProductName}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontFamily: fontFamilies.INTER.italic,
              color: '#C3C9D1',
              textDecorationLine: 'line-through',
              includeFontPadding: false,
              fontSize: 10,
            }}
          >{`₹ ${props.sendData.brandProductOriginalPrice}`}</Text>

          <Text
            style={{
              fontFamily: fontFamilies.INTER.italic,
              color: '#F0DCBC',
              includeFontPadding: false,
              fontSize: 10,
              marginLeft: 5,
            }}
          >{`₹ ${props.sendData.brandProductReducedPrice}`}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            width: 109,
            backgroundColor: '#191918',
            borderColor: '#414141',
            borderWidth: 1,
            borderRadius: 4,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 12,
              paddingRight: 12,
              gap: 4,
              alignItems: 'center',
            }}
          >
            <PlusIcon width={8} height={8} />

            <Text
              style={{
                fontSize: 12,
                fontFamily: fontFamilies.INTER.medium,
                color: '#FFFFFF',
                includeFontPadding: false,
              }}
            >
              {'Add To Cart'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompleteTheLookHorizontalFlatListLayout;
