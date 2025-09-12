import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, StyleSheet, View } from 'react-native';
import { fontFamilies } from '../constants/fonts';

const CartAnimation = props => {
  const [animationText, setAnimationText] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const cartFadeAnim = useRef(new Animated.Value(0)).current;
  const messageFadeAnim = useRef(new Animated.Value(0)).current;
  const thisLottieRef = useRef(null);
  const triggerAnimations = () => {
    Animated.timing(cartFadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setAnimationText(true);
      Animated.timing(messageFadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 500);
  };

  const onLottieFinish = () => {
    triggerAnimations();
    if (props.onCompletion) {
      setTimeout(() => {
        props.onCompletion();
      }, 5000);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const androidVersion = parseInt(Platform.Version, 10);
      if (androidVersion < 8) {
        setIsLowEnd(true);
      }
    }

    let fallbackTimer;
    if (Platform.OS === 'android') {
      fallbackTimer = setTimeout(() => {
        if (!animationText) {
          triggerAnimations();
          if (props.onCompletion) {
            props.onCompletion();
          }
        }
      }, 5000);
    }
    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <View style={cartAnimationStyle.productAnimationOverlayBg}>
      <View style={cartAnimationStyle.productLottieAnimationbg}>
        {isLowEnd ? (
          <Image
            source={require('../../assets/images/addtocartanimation.gif')}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        ) : (
          <LottieView
            source={require('../../assets/animations/addtocartlottie.json')}
            autoPlay
            loop={false}
            style={{ width: 250, height: 250 }}
            onAnimationFinish={() => {
              thisLottieRef.current?.play(0, 50);
              onLottieFinish();
            }}
            ref={thisLottieRef}
          />
        )}
      </View>

      {animationText && (
        <Animated.Text
          style={{
            textAlign: 'center',
            marginTop: 4,
            color: '#FFFFFF',
            fontFamily: fontFamilies.INTER.bold,
            alignSelf: 'center',
            fontSize: 18,
            opacity: messageFadeAnim,
          }}
        >
          {props.message}
        </Animated.Text>
      )}
    </View>
  );
};

const cartAnimationStyle = StyleSheet.create({
  productAnimationOverlayBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  productLottieAnimationbg: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default CartAnimation;
