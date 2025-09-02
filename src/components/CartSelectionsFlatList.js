import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartSelectionFlatListLayout from '../components/CartSelectionFlatListLayout';

const CartSelectionsFlatList = props => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ marginBottom: insets.bottom + 4 }}>
      <FlatList
        horizontal={props.isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={props.data}
        keyExtractor={cartItem => cartItem.cartItemId}
        renderItem={({ item }) => (
          <CartSelectionFlatListLayout sendData={item} />
        )}
      ></FlatList>
    </View>
  );
};

export default CartSelectionsFlatList;
