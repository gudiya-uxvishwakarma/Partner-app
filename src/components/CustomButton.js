import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../constants/index';

const CustomButton = ({
  title, onPress, variant = 'primary', size = 'md', loading = false,
  disabled = false, fullWidth = true, icon, iconPosition = 'left', style, textStyle,
}) => {
  const sizeStyles = {
    sm: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: RADIUS.md },
    md: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, borderRadius: RADIUS.lg },
    lg: { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xxl, borderRadius: RADIUS.xl },
  };
  const variantBg = { primary: COLORS.primary, secondary: COLORS.secondary, outline: 'transparent', ghost: 'transparent', danger: COLORS.error, success: COLORS.success };
  const textColors = { primary: COLORS.white, secondary: COLORS.primary, outline: COLORS.primary, ghost: COLORS.primary, danger: COLORS.white, success: COLORS.white };
  const borderColors = { outline: COLORS.primary };
  const fontSizes = { sm: FONT_SIZES.sm, md: FONT_SIZES.base, lg: FONT_SIZES.lg };
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress} disabled={isDisabled} activeOpacity={0.8}
      style={[
        styles.base, sizeStyles[size],
        { backgroundColor: variantBg[variant] || COLORS.primary },
        variant === 'outline' && { borderWidth: 1.5, borderColor: borderColors.outline },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && <View style={{ marginRight: SPACING.sm }}>{icon}</View>}
          <Text style={[styles.text, { color: textColors[variant] || COLORS.white, fontSize: fontSizes[size] }, textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={{ marginLeft: SPACING.sm }}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.55 },
  text: { fontFamily: FONTS.bold, fontWeight: '700', letterSpacing: 0.3 },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
});

export default CustomButton;
