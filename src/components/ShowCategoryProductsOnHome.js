import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PremiumCollectionArrow from '../../assets/images/premiumcollectionarrow.svg';
import RightArrow from '../../assets/images/seeallrightarrow.svg';
import ShowCategoryProductsOnHomeLayout from '../components/ShowCategoryProductsOnHomeLayout';
import { fontFamilies } from '../constants/fonts';

const ShowCategoryProductsOnHome = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 3, marginBottom: insets.bottom + 10 }}>
      <FlatList
        horizontal={props.isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={props.data}
        keyExtractor={category => category.categoryId}
        renderItem={({ item: category }) => (
          <View style={{ marginTop: 11 }}>
            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                marginLeft: 12,
                marginEnd: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fontFamilies.INTER.bold,
                  color: '#FFFFFF',
                }}
              >
                {category.categoryName}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                style={{ position: 'absolute', right: 0 }}
              >
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#FFFFFF',
                      fontFamily: fontFamilies.INTER.medium,
                      marginRight: 5,
                    }}
                  >
                    {'See All'}
                  </Text>
                  <RightArrow width={12} height={8} marginTop={5} />
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              // style={{ marginLeft: 3 }}
              style={{ gap: 16 }}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={category.products}
              keyExtractor={product => product.productId}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('ProductInfo', {
                      categoryName: category.categoryName,
                      productId: item.productId,
                      productImage: item.image,
                      productName: item.productName,
                      originalPrice: item.productOriginalPrice,
                      reducedPrice: item.productReducedPrice,
                      rating: item.rating,
                      reviewCount: item.reviewCount,
                    });
                  }}
                >
                  <ShowCategoryProductsOnHomeLayout sendData={item} />
                </TouchableOpacity>
              )}
            ></FlatList>

            <View
              style={{
                backgroundColor: '#2C2C2C',
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 12,
                paddingRight: 12,
                gap: 14,
                marginHorizontal: 11,
                marginTop: 10,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamilies.INTER.regular,
                  fontSize: 14,
                  color: '#7A7A7A',
                  includeFontPadding: false,
                }}
              >{`Collection`}</Text>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: fontFamilies.INTER.regular,
                  fontSize: 16,
                  includeFontPadding: false,
                }}
              >
                {`Premium ${category.categoryName} 2025 Collection.`}
              </Text>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: fontFamilies.INTER.regular,
                  fontSize: 16,
                  includeFontPadding: false,
                }}
              >
                {`Buy Today`}
              </Text>
              <TouchableOpacity activeOpacity={0.9}>
                <PremiumCollectionArrow width={32} height={32} />
              </TouchableOpacity>
              <Image
                style={{ width: '100%', height: 255, borderRadius: 12 }}
                source={category.premiumCollection.image}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ShowCategoryProductsOnHome;
