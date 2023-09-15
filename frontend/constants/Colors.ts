const tintColorLight = '#2C2733';
const tintColorDark = '#F1ECFF';
const primaryColorDark = '#9066FF';
const primaryColorLight = '#9066FF';
const secondaryColorDark = '#7554CF';
const secondaryColorLight = '#7554CF';
const backgroundColorDark = '#1E1825';
const backgroundColorLight = '#FFF';
const errorColor = '#FF0000';
const successColor = '#00FF00';
const warningColor = '#FFA500';

/* The code is exporting an object with two properties: `light` and `dark`. Each property contains a
set of key-value pairs representing different colors used in a theme. */
export default {
  light: {
    text: '#000',
    background: backgroundColorLight,
    tint: tintColorLight,
    tintDark: tintColorLight,
    tintLight: tintColorDark,
    tabIconDefault: secondaryColorLight,
    tabIconSelected: primaryColorLight,
    primaryColor: primaryColorLight,
    secondaryColor: secondaryColorLight,
    error: errorColor,
    success: successColor,
    warning: warningColor,
    info: primaryColorLight,
  },
  dark: {
    text: '#fff',
    background: backgroundColorDark,
    tint: tintColorDark,
    tintDark: tintColorDark,
    tintLight: tintColorLight,
    tabIconDefault: secondaryColorDark,
    tabIconSelected: primaryColorDark,
    primaryColor: primaryColorDark,
    secondaryColor: secondaryColorDark,
    error: errorColor,
    success: successColor,
    warning: warningColor,
    info: primaryColorDark,
  },
};
