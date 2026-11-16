import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../../constants/index';

const ImagePickerField = ({ label, description, image, onImageChange, optional = true }) => {
  const pick = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8, selectionLimit: 1 });
      if (result.assets?.[0]) {
        const a = result.assets[0];
        onImageChange({ uri: a.uri, type: a.type, name: a.fileName || `image_${Date.now()}.jpg` });
      }
    } catch {
      Alert.alert('Error', 'Could not access gallery');
    }
  };

  const remove = () => Alert.alert('Remove Image', 'Remove this image?', [
    { text: 'Cancel' },
    { text: 'Remove', style: 'destructive', onPress: () => onImageChange(null) },
  ]);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label} {optional ? <Text style={styles.optional}>(Optional)</Text> : '*'}</Text>
      {!!description && <Text style={styles.fieldDesc}>{description}</Text>}
      {image ? (
        <View style={styles.imagePreview}>
          <Image source={{ uri: image.uri || image }} style={styles.previewImage} resizeMode="cover" />
          <View style={styles.imageActions}>
            <TouchableOpacity style={styles.replaceBtn} onPress={pick}>
              <Text style={styles.replaceBtnText}>🔄 Replace</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeBtn} onPress={remove}>
              <Text style={styles.removeBtnText}>🗑 Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadBox} onPress={pick}>
          <Text style={styles.uploadIcon}>📁</Text>
          <Text style={styles.uploadText}>Tap to upload image</Text>
          <Text style={styles.uploadHint}>JPG, PNG · Max 10MB</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Step4HoldingImages = ({ form, updateForm }) => (
  <View>
    <Text style={styles.stepTitle}>Holding / Position Images</Text>
    <Text style={styles.stepSubtitle}>These images help buyers understand the layout and location. All fields are optional.</Text>

    <ImagePickerField
      label="Apartment Holding / Layout Image"
      description="Overall layout or master plan of the apartment complex"
      image={form.holdingImage}
      onImageChange={img => updateForm({ holdingImage: img })}
    />

    <ImagePickerField
      label="Position Image"
      description="Position of the apartment in the overall development or locality"
      image={form.positionImage}
      onImageChange={img => updateForm({ positionImage: img })}
    />

    <ImagePickerField
      label="Floor Plan"
      description="General floor plan showing unit layout"
      image={form.floorPlan}
      onImageChange={img => updateForm({ floorPlan: img })}
    />

    <View style={styles.note}>
      <Text style={styles.noteText}>
        💡 These images are displayed in the apartment detail page and significantly improve buyer confidence.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl, lineHeight: 22 },
  fieldContainer: { marginBottom: SPACING.xl },
  fieldLabel: { fontSize: FONT_SIZES.base, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  optional: { fontSize: FONT_SIZES.sm, color: COLORS.textLight, fontWeight: '400' },
  fieldDesc: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm, lineHeight: 18 },
  uploadBox: {
    height: 160, borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed',
    borderRadius: RADIUS.xl, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.inputBg,
  },
  uploadIcon: { fontSize: 36, marginBottom: SPACING.sm },
  uploadText: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  uploadHint: { fontSize: FONT_SIZES.xs, color: COLORS.textLight, marginTop: 4 },
  imagePreview: {},
  previewImage: { width: '100%', height: 200, borderRadius: RADIUS.xl },
  imageActions: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.sm },
  replaceBtn: { flex: 1, paddingVertical: SPACING.sm, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.md, alignItems: 'center' },
  replaceBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.medium },
  removeBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderWidth: 1.5, borderColor: COLORS.error, borderRadius: RADIUS.md, alignItems: 'center' },
  removeBtnText: { fontSize: FONT_SIZES.sm, color: COLORS.error, fontFamily: FONTS.medium },
  note: { backgroundColor: '#EEF2FF', borderRadius: RADIUS.lg, padding: SPACING.md },
  noteText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, lineHeight: 20 },
});

export default Step4HoldingImages;
