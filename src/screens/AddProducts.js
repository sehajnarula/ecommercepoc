// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import * as progress from 'react-native-progress';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import ProductAnimation from '../components/ProductAnimation';
import colors from '../constants/colors';
import { fontFamilies } from '../constants/fonts';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productOriginalPrice, setProductOriginalPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const isFocused = useIsFocused();
  const dispatched = useDispatch();
  const error = useSelector(state => state.user.error);
  const insets = useSafeAreaInsets();
  const [showAddProductAnimation, setAddProductAnimation] = useState(false);
  const navigation = useNavigation();
  const productAnimationMessage = `Product Added Successfully`;
  const [tagsTextInput, setTagsTextInput] = useState(['']);
  const deviceWidth = Dimensions.get('window').width;

  // const incrementTextInputTagsArray = (text, index) => {
  //   const updatedTagsArray = [...tagsTextInput];
  //   updatedTagsArray[index] = text;

  //   if (index === tagsTextInput.length - 1 && text.trim() !== '') {
  //     updatedTagsArray.push('');
  //   }

  //   setTagsTextInput(updatedTagsArray);
  // };

  const incrementTextInputTagsArray = (text, index) => {
    const updatedTagsArray = [...tagsTextInput];
    updatedTagsArray[index] = text;

    if (index === tagsTextInput.length - 1 && text.trim() !== '') {
      updatedTagsArray.push('');
    } else if (
      text.trim() === '' &&
      index > 0 &&
      updatedTagsArray[index + 1] === ''
    ) {
      updatedTagsArray.splice(index, 1);
    }

    setTagsTextInput(updatedTagsArray);
  };

  // const getUserStateLocally = async () => {
  //   try {
  //     const userJson = await AsyncStorage.getItem('user');
  //     if (userJson !== null) {
  //       const user = JSON.parse(userJson);

  //       // let userSavedNumber = user.phoneNumber;

  //       // if (userSavedNumber.startsWith('+91')) {
  //       //   userSavedNumber = userSavedNumber.substring(3);
  //       // }

  //       // setUserEmail(user.email);
  //       // setUserName(user.name);
  //       // setUserNumber(userSavedNumber);
  //       // setUserDeliveryAddress(user.address);
  //       setAdminToken(user.token);
  //       console.log('showuser', user);
  //     }
  //   } catch (error) {
  //     console.log('getuserlocallyerror', error);
  //   }
  // };

  const productDetails = {
    name: productName,
    description: productDescription,
    price: productPrice,
    originalPrice: productOriginalPrice,
    stock: productStock,
    category: productCategory,
    subcategory: productSubCategory,
    brand: productBrand,
    sku: productSku,
    weight: productWeight,
  };

  const addProductBtnClick = async () => {
    setLoading(true);
    if (productName === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Name.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productDescription === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Description.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productOriginalPrice === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Original Price.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productStock === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Stock.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productCategory === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Category.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productSubCategory === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product SubCategory.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productBrand === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Brand.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productSku === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Sku.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else if (productWeight === '') {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Enter Product Weight.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Product Added Successfully.',
        autoHide: true,
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBgColor }}>
        {showAddProductAnimation && (
          <Modal
            isVisible={true}
            onBackdropPress={() => setAddProductAnimation(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropTransitionOutTiming={0}
            useNativeDriver
            hideModalContentWhileAnimating
            style={{ margin: 0, justifyContent: 'center' }}
          >
            <ProductAnimation
              onCompletion={() => setAddProductAnimation(false)}
              message={productAnimationMessage}
            />
          </Modal>
        )}

        {loading && (
          <View style={AddProductStyle.progressLoaderOverlayBg}>
            <View style={AddProductStyle.progressLoaderContainer}>
              <progress.Circle
                indeterminate
                size={50}
                color={colors.appYelowColor}
              />
            </View>
          </View>
        )}
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}>
          {tagsTextInput.map((tag, index) => (
            <TextInput
              style={{
                width: deviceWidth * 0.9,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                marginTop: 10,
                color: '#FFFFFF8F',
                borderColor: '#ffffff',
                borderWidth: 1,
                fontFamily: fontFamilies.INTER.regular,
                includeFontPadding: false,
              }}
              key={index}
              placeholder="Product Tag"
              placeholderTextColor={'#FFFFFF8F'}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={text => incrementTextInputTagsArray(text, index)}
              value={tag}
            ></TextInput>
          ))}

          <TouchableOpacity
            activeOpacity={0.9}
            style={{ alignItems: 'center' }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: colors.black,
                fontSize: 16,
                fontFamily: fontFamilies.INTER.medium,
                includeFontPadding: false,
              }}
            >
              {'Add Tag'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: 'column', marginBottom: insets.bottom + 10 }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: colors.appYelowColor,
              marginHorizontal: 12,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => {
              setAddProductAnimation(true);
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: colors.black,
                fontSize: 16,
                fontFamily: fontFamilies.INTER.medium,
                includeFontPadding: false,
              }}
            >
              {'Add Product'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const AddProductStyle = StyleSheet.create({
  progressLoaderOverlayBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  progressLoaderContainer: {
    elevation: 5,
    shadowColor: '#000',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddProducts;
