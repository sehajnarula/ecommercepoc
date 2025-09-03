import { FlatList, View } from 'react-native';
import CompleteTheLookHorizontalFlatListLayout from '../components/CompleteTheLookHorizontalFlatListLayout';

const CompleteTheLookHorizontalFlatList = props => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={props.isHorizontal}
        data={props.data}
        keyExtractor={product => product.cartItemId}
        renderItem={({ item }) => (
          <CompleteTheLookHorizontalFlatListLayout sendData={item} />
        )}
      ></FlatList>
    </View>
  );
};

export default CompleteTheLookHorizontalFlatList;
