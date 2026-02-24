/**
 * Button color/size helpers using theme (tokens).
 * Used by Button.styled.jsx — theme is from Emotion ThemeProvider.
 */

export function getButtonColors(palette, color) {
  const key = color === 'blue' ? 'cerulean' : color;
  return {
    defaultColor: palette[key],
    hoverColor: palette[`${key}Hover`] || palette[key],
    clickColor: palette[`${key}Click`] || palette[key],
  };
}

export function getPadding(iconOnly, noPadding, fallback, constants) {
  if (noPadding) return 0;
  if (iconOnly) return constants?.spacingHalf ?? '4px'; // closest token to 3px
  return fallback;
}

export function getHeight(iconOnly, noHeight, fallback) {
  if (iconOnly || noHeight) return 'inherit';
  return fallback;
}
