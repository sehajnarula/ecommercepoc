import { FlatList, View } from 'react-native';

const UserOrderFlatList = props => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

export default UserOrderFlatList;
