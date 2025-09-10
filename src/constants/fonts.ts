import { isIOS } from './utils';
export const fontFamilies = {
  INTER: {
    regular: isIOS() ? 'Inter18ptRegular' : 'Inter18ptRegular',
    medium: isIOS() ? 'Inter18ptMedium' : 'Inter18ptMedium',
    semiBold: isIOS() ? 'Inter18ptSemiBold' : 'Inter18ptSemiBold',
    bold: isIOS() ? 'Inter18ptBold' : 'Inter18ptBold',
    black: isIOS() ? 'Inter18ptBlack' : 'Inter18ptBlack',
    light: isIOS() ? 'Inter18ptLight' : 'Inter18ptLight',
    italic: isIOS() ? 'Inter18ptItalic' : 'Inter18ptItalic',
  },
  PLAYFAIR: {
    black: isIOS() ? 'PlayfairDisplayBlack' : 'PlayfairDisplayBlack',
    regular: isIOS() ? 'PlayfairDisplayRegular' : 'PlayfairDisplayRegular',
    medium: isIOS() ? 'PlayfairDisplayMedium' : 'PlayfairDisplayMedium',
    semiBold: isIOS() ? 'PlayfairDisplaySemiBold' : 'PlayfairDisplaySemiBold',
    bold: isIOS() ? 'PlayfairDisplayBold' : 'PlayfairDisplayBold',
    italic: isIOS() ? 'PlayfairDisplayItalic' : 'PlayfairDisplayItalic',
  },
};
