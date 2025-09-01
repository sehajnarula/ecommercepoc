import { FlatList, TouchableOpacity, View } from 'react-native';
import MoreFromBrandFlatListLayout from '../components/MoreFromBrandFlatListLayout';

const MoreFromBrandFlatList = props => {
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        numColumns={2}
        horizontal={props.isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={props.data}
        keyExtractor={brand => brand.brandProductId}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9}>
            <MoreFromBrandFlatListLayout sendData={item} />
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default MoreFromBrandFlatList;
