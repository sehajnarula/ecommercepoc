import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, StyleSheet, View } from 'react-native';
import { fontFamilies } from '../constants/fonts';

const ProductAnimation = props => {
  const [animationText, setAnimationText] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const cartFadeAnim = useRef(new Animated.Value(0)).current;
  const [letters, setLetters] = useState([]);
  const animatedValues = useRef([]);

  const triggerAnimations = () => {
    Animated.timing(cartFadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setAnimationText(true);

      if (props.message) {
        const splitLetters = props.message.split('');
        setLetters(splitLetters);
        animatedValues.current = splitLetters.map(() => new Animated.Value(0));

        const animations = splitLetters.map((_, i) =>
          Animated.timing(animatedValues.current[i], {
            toValue: 1,
            duration: 120,
            delay: i * 40,
            useNativeDriver: true,
          }),
        );

        Animated.stagger(30, animations).start();
      }
    }, 500);
  };

  const onLottieFinish = () => {
    triggerAnimations();

    if (props.onCompletion && props.message) {
      const messageLength = props.message.length;
      const totalTime =
        messageLength * 40 + // staggered delay per char
        120 + // fade duration of last char
        1500; // pause before hiding

      setTimeout(() => {
        props.onCompletion();
      }, totalTime);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const androidVersion = parseInt(Platform.Version, 10);
      if (androidVersion < 8) {
        setIsLowEnd(true);
      }
    }
  }, []);

  return (
    <View style={cartAnimationStyle.cartAnimationOverlayBg}>
      <View style={cartAnimationStyle.cartLottieAnimationBg}>
        {isLowEnd ? (
          <Image
            source={require('../../assets/images/addproductanimation.gif')}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        ) : (
          <LottieView
            source={require('../../assets/animations/addproductanimationllottie.json')}
            autoPlay
            loop={false}
            style={{ width: 150, height: 150 }}
            onAnimationFinish={onLottieFinish}
          />
        )}
      </View>

      {animationText && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {letters.map((letter, i) => (
            <Animated.Text
              key={`${letter}-${i}`}
              style={{
                textAlign: 'center',
                marginTop: 4,
                color: '#FFFFFF',
                fontFamily: fontFamilies.INTER.bold,
                fontSize: 18,
                opacity: animatedValues.current[i] || 0,
              }}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>
      )}
    </View>
  );
};

const cartAnimationStyle = StyleSheet.create({
  cartAnimationOverlayBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cartLottieAnimationBg: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default ProductAnimation;
