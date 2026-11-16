import React from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../constants/index';

const MultiImagePicker = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  label,
  coverImageIndex = 0,
  onSetCover,
  style,
}) => {
  const pickImages = async () => {
    if (images.length >= maxImages) {
      Alert.alert('Limit reached', `You can upload up to ${maxImages} images`);
      return;
    }
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: maxImages - images.length,
        quality: 0.8,
      });
      if (result.assets?.length) {
        const newImages = result.assets.map(a => ({ uri: a.uri, type: a.type, name: a.fileName || `image_${Date.now()}.jpg` }));
        onImagesChange([...images, ...newImages]);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not access gallery');
    }
  };

  const removeImage = (index) => {
    Alert.alert('Remove Image', 'Remove this image?', [
      { text: 'Cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => { const updated = images.filter((_, i) => i !== index); onImagesChange(updated); } },
    ]);
  };

  return (
    <View style={[styles.container, style]}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageList}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img.uri || img }} style={styles.image} resizeMode="cover" />
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(index)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
            {onSetCover && (
              <TouchableOpacity
                style={[styles.coverBtn, index === coverImageIndex && styles.coverBtnActive]}
                onPress={() => onSetCover(index)}
              >
                <Text style={[styles.coverText, index === coverImageIndex && styles.coverTextActive]}>
                  {index === coverImageIndex ? '⭐ Cover' : 'Set Cover'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        {images.length < maxImages && (
          <TouchableOpacity style={styles.addBtn} onPress={pickImages}>
            <Text style={styles.addIcon}>+</Text>
            <Text style={styles.addText}>Add Photos</Text>
            <Text style={styles.addCount}>{images.length}/{maxImages}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  label: { fontSize: FONT_SIZES.sm, fontFamily: FONTS.medium, color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' },
  imageList: { gap: SPACING.sm, paddingBottom: SPACING.sm },
  imageWrapper: { position: 'relative', marginRight: SPACING.sm },
  image: { width: 100, height: 100, borderRadius: RADIUS.lg },
  removeBtn: { position: 'absolute', top: -6, right: -6, backgroundColor: COLORS.error, borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  removeText: { color: COLORS.white, fontSize: 10, fontFamily: FONTS.bold, fontWeight: '700' },
  coverBtn: { position: 'absolute', bottom: 4, left: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: RADIUS.sm, paddingVertical: 2, alignItems: 'center' },
  coverBtnActive: { backgroundColor: COLORS.secondary },
  coverText: { fontSize: 9, color: COLORS.white, fontFamily: FONTS.medium },
  coverTextActive: { color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  addBtn: { width: 100, height: 100, borderRadius: RADIUS.lg, borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.inputBg },
  addIcon: { fontSize: 28, color: COLORS.primary, lineHeight: 32 },
  addText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontFamily: FONTS.medium, marginTop: 2 },
  addCount: { fontSize: 9, color: COLORS.textLight, fontFamily: FONTS.regular },
});

export default MultiImagePicker;
