import { FlatList, View } from 'react-native';

const CompleteTheLookHorizontalFlatList = props => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

export default CompleteTheLookHorizontalFlatList;
