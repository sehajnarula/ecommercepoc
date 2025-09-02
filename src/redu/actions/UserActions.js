import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

export const SIGNIN_REQUEST = 'user/SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'user/SIGNIN_FAILURE';

export const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

export const UPDATE_REQUEST = 'user/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'user/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'user/UPDATE_FAILURE';

export const GOOGLE_SIGNIN_REQUEST = 'user/GOOGLE_SIGNIN_REQUEST';
export const GOOGLE_SIGNIN_SUCCESS = 'user/GOOGLE_SIGNIN_SUCCESS';
export const GOOGLE_SIGNIN_FAILURE = 'user/GOOGLE_SIGNIN_FAILURE';

export const SIGNOUT = 'user/SIGNOUT';

const baseUrl = `https://shoping-sk37.onrender.com/`;

const saveUserLocally = async user => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log('userlocalsaveerror', error);
  }
};

const removeUserLocally = () => {
  AsyncStorage.removeItem('user');
};

const formatError = error => {
  let code = 'UNKNOWN_ERROR';
  let message = 'Something went wrong';

  try {
    if (error) {
      if (typeof error === 'object') {
        code = error.code ?? 'UNKNOWN_ERROR';
        message = error.message ?? JSON.stringify(error);
      } else {
        message = String(error);
      }
    }
  } catch (e) {
    console.log('error-formatting-failed', e);
  }

  return { code, message };
};

const signInRequest = () => ({ type: SIGNIN_REQUEST });

const signInSuccess = user => {
  saveUserLocally(user);
  return { type: SIGNIN_SUCCESS, payload: user };
};

const signInFailure = error => ({
  type: SIGNIN_FAILURE,
  payload: formatError(error),
});

const signUpRequest = () => ({ type: SIGNUP_REQUEST });

const signUpSuccess = user => {
  saveUserLocally(user);
  return { type: SIGNUP_SUCCESS, payload: user };
};

const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: formatError(error),
});

const updateRequest = () => ({ type: UPDATE_REQUEST });

// const updateSuccess = () => ({ type: UPDATE_SUCCESS });

const updateSuccess = user => {
  saveUserLocally(user);
  return { type: UPDATE_REQUEST, payload: user };
};

const updateFailure = error => ({
  type: UPDATE_FAILURE,
  payload: formatError(error),
});

const googleSignInRequest = () => ({ type: GOOGLE_SIGNIN_REQUEST });
const googleSignInSuccess = user => ({
  type: GOOGLE_SIGNIN_SUCCESS,
  payload: user,
});
const googleSignInFailure = error => ({
  type: GOOGLE_SIGNIN_FAILURE,
  payload: formatError(error),
});

const signOutAction = () => ({ type: SIGNOUT });

export const userSignIn = (email, password) => async dispatch => {
  dispatch(signInRequest());
  try {
    const response = await axios.post(
      `${baseUrl}api/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        timeout: 5000,
      },
    );

    console.log('userloginapiresponse', response);

    const user = {
      id: response.data.data.id,
      name: response.data.data.name,
      email: response.data.data.email,
      phoneNumber: response.data.data.phone,
      address: response.data.data.address,
      userRole: response.data.data.role,
      token: response.data.token,
    };

    dispatch(signInSuccess(user));
  } catch (error) {
    console.log('signinerror', error);
    dispatch(signInFailure(error));
  }
};

export const userSignUp =
  (userName, email, password, phoneNumber, deliveryAddress) =>
  async dispatch => {
    dispatch(signUpRequest());
    try {
      const response = await axios.post(
        `${baseUrl}api/auth/register`,
        {
          name: userName,
          email: email,
          password: password,
          phone: phoneNumber,
          address: deliveryAddress,
        },
        {
          timeout: 5000,
        },
      );

      console.log('userregisterapiresponse', response);

      const user = {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        phoneNumber: response.data.data.phone,
        address: response.data.data.address,
        userRole: response.data.data.role,
        token: response.data.token,
      };

      dispatch(signUpSuccess(user));
    } catch (error) {
      console.log('signuperror', error);
      dispatch(signUpFailure(error));
    }
  };

export const userUpdate =
  (userName, userAddress, userPhoneNumber, token) => async dispatch => {
    dispatch(updateRequest());
    try {
      const response = await axios.put(
        `${baseUrl}api/auth/profile`,
        {
          name: userName,
          phone: userPhoneNumber,
          address: userAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        },
      );
      console.log('showupdateuserapiresponse', response);
      const user = {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        phoneNumber: response.data.data.phone,
        address: response.data.data.address,
        userRole: response.data.data.role,
        token: token,
      };
      dispatch(updateSuccess(user));
    } catch (error) {
      console.log('userupdateerror', error);
      dispatch(updateFailure(error));
    }
  };

export const userGoogleSignIn = () => async dispatch => {
  dispatch(googleSignInRequest());
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    const uid = userCredential.user.uid;
    const userEmail = userCredential.user.email;
    const userName = userCredential.user.displayName;

    const user = {
      uid: uid,
      email: userEmail,
    };

    const userSnapshot = await firestore().collection('users').get();
    const users = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const userFound = users.some(user => user.email === userEmail);

    if (!userFound) {
      await firestore().collection('users').doc(uid).set({
        uid: uid,
        name: userName,
        email: userEmail,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }

    dispatch(googleSignInSuccess(user));
  } catch (error) {
    console.log('googlesigninerror full:', JSON.stringify(error, null, 2));
    dispatch(googleSignInFailure(error));
  }
};

export const userSignOut = () => async dispatch => {
  try {
    await removeUserLocally();
    dispatch(signOutAction());
  } catch (error) {
    console.log('signouterror', error);
  }
};
