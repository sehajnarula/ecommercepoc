import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontFamilies } from '../constants/fonts';

const HorizontalCategoriesHomeLayout = props => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ width: 51, height: 61, gap: 9 }}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
      >
        <Image width={24} height={24} source={props.sendData.image} />
      </View>
      <Text
        style={{
          textAlign: 'center',
          includeFontPadding: false,
          fontFamily: fontFamilies.INTER.regular,
          fontSize: 11,
          color: '#FFFFFF',
          textDecorationLine: props.isSelected ? 'underline' : 'none',
          textDecorationColor: '#FFFFFF',
          textDecorationStyle: 'solid',
        }}
        numberOfLines={2}
      >
        {props.sendData.categoryName}
      </Text>
    </View>
  );
};

export default HorizontalCategoriesHomeLayout;
