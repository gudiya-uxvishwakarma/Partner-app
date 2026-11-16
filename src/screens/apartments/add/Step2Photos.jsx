import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../../constants/index';
import MultiImagePicker from '../../../components/MultiImagePicker';

const Step2Photos = ({ form, updateForm }) => (
  <View>
    <Text style={styles.stepTitle}>Photos & Videos</Text>
    <Text style={styles.stepSubtitle}>Add high-quality images to attract more buyers</Text>

    <MultiImagePicker
      label="Cover Image & Gallery Photos *"
      images={form.galleryImages}
      onImagesChange={imgs => updateForm({ galleryImages: imgs })}
      maxImages={15}
      coverImageIndex={form.coverImageIndex}
      onSetCover={idx => updateForm({ coverImageIndex: idx, coverImage: form.galleryImages[idx]?.uri || form.galleryImages[idx] })}
    />

    <MultiImagePicker
      label="Exterior Images"
      images={form.exteriorImages}
      onImagesChange={imgs => updateForm({ exteriorImages: imgs })}
      maxImages={8}
    />

    <MultiImagePicker
      label="Interior Images"
      images={form.interiorImages}
      onImagesChange={imgs => updateForm({ interiorImages: imgs })}
      maxImages={8}
    />

    <MultiImagePicker
      label="Building / Lobby Images"
      images={form.buildingImages}
      onImagesChange={imgs => updateForm({ buildingImages: imgs })}
      maxImages={6}
    />

    <MultiImagePicker
      label="Facilities & Amenities Images"
      images={form.facilitiesImages}
      onImagesChange={imgs => updateForm({ facilitiesImages: imgs })}
      maxImages={8}
    />

    <View style={styles.tipBox}>
      <Text style={styles.tipIcon}>💡</Text>
      <Text style={styles.tipText}>
        Use landscape photos (16:9 ratio) for best display. First image will be the cover unless you change it.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  stepTitle: { fontSize: FONT_SIZES.xl, fontFamily: FONTS.bold, color: COLORS.text, fontWeight: '700', marginBottom: 4 },
  stepSubtitle: { fontSize: FONT_SIZES.base, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  tipBox: { flexDirection: 'row', backgroundColor: '#EEF2FF', borderRadius: 10, padding: SPACING.md, marginTop: SPACING.md, gap: SPACING.sm },
  tipIcon: { fontSize: 18 },
  tipText: { flex: 1, fontSize: FONT_SIZES.sm, color: COLORS.primary, lineHeight: 20 },
});

export default Step2Photos;
