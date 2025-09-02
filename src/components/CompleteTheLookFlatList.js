import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CompleteTheLookFlatListLayout from '../components/CompleteTheLookFlatListLayout';

const CompleteTheLookFlatList = props => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ marginBottom: insets.bottom + 2 }}>
      <FlatList
        numColumns={2}
        horizontal={props.isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={props.data}
        keyExtractor={product => product.cartItemId}
        renderItem={({ item }) => (
          <CompleteTheLookFlatListLayout sendData={item} />
        )}
      ></FlatList>
    </View>
  );
};

export default CompleteTheLookFlatList;
