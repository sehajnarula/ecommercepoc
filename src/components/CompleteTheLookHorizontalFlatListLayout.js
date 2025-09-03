import { Image, View } from 'react-native';

const CompleteTheLookHorizontalFlatListLayout = props => {
  return (
    <View
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 9,
        paddingLeft: 9,
        flexDirection: 'row',
        backgroundColor: '#151515',
        borderColor: '#414141',
        borderRadius: 0.76,
      }}
    >
      <Image style={{ width: 70, height: 60, borderRadius: 6 }} />
    </View>
  );
};

export default CompleteTheLookHorizontalFlatListLayout;
