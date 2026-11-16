import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../../../constants/index';
import StepIndicator from '../../../components/StepIndicator';
import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import { apartmentService } from '../../../services/apartmentService';
import { usePartner } from '../../../context/PartnerContext';

// Step Components
import Step1BasicInfo from './Step1BasicInfo';
import Step2Photos from './Step2Photos';
import Step3Location from './Step3Location';
import Step4HoldingImages from './Step4HoldingImages';
import Step5TowerDetails from './Step5TowerDetails';
import Step6Amenities from './Step6Amenities';
import Step7Events from './Step7Events';
import Step8RentSale from './Step8RentSale';
import Step9Review from './Step9Review';

const TOTAL_STEPS = 9;
const STEP_TITLES = [
  'Basic Information', 'Photos & Videos', 'Location',
  'Holding Images', 'Tower / Flat Details', 'Amenities & Features',
  'Events', 'Rent & Sale Info', 'Review & Submit',
];

const INITIAL_FORM = {
  // Step 1
  name: '', builderName: '', propertyType: '', description: '',
  projectStatus: '', possession: '', totalTowers: '', totalFloors: '', totalFlats: '',
  // Step 2
  coverImage: null, galleryImages: [], exteriorImages: [], interiorImages: [],
  buildingImages: [], facilitiesImages: [], videos: [], coverImageIndex: 0,
  // Step 3
  country: 'India', state: '', city: '', area: '', locality: '',
  address: '', landmark: '', pincode: '', latitude: '', longitude: '',
  // Step 4
  holdingImage: null, positionImage: null, floorPlan: null,
  // Step 5
  towers: [],
  // Step 6
  amenities: [], features: [],
  // Step 7
  events: [],
  // Step 8
  hasRent: false, rent: { monthlyRent: '', securityDeposit: '', availableFrom: '', bhk: '', furnishing: '', maintenanceCharges: '' },
  hasSale: false, sale: { salePrice: '', bhk: '', carpetArea: '', flatDetails: '', availability: '' },
  // Step 9
  status: 'draft',
};

const AddApartmentScreen = ({ navigation, route }) => {
  const { apartment: editApt, isEdit } = route.params || {};
  const { saveDraftApartment, clearDraft, draftApartment } = usePartner();

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(editApt || draftApartment || INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [stepErrors, setStepErrors] = useState({});

  const updateForm = useCallback((updates) => {
    setForm(prev => ({ ...prev, ...updates }));
  }, []);

  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!form.name?.trim()) errors.name = 'Apartment name is required';
      if (!form.builderName?.trim()) errors.builderName = 'Builder name is required';
      if (!form.propertyType) errors.propertyType = 'Property type is required';
      if (!form.description?.trim()) errors.description = 'Description is required';
    }
    if (step === 3) {
      if (!form.city?.trim()) errors.city = 'City is required';
      if (!form.state?.trim()) errors.state = 'State is required';
      if (!form.address?.trim()) errors.address = 'Address is required';
    }
    return errors;
  };

  const goNext = () => {
    const errors = validateStep(currentStep);
    setStepErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (currentStep < TOTAL_STEPS) setCurrentStep(s => s + 1);
  };

  const goPrev = () => {
    setStepErrors({});
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await saveDraftApartment({ ...form, status: 'draft' });
      const res = await apartmentService.saveDraft({ ...form, status: 'draft' });
      Alert.alert('Draft Saved', 'Your progress has been saved as a draft.');
    } catch (e) {
      Alert.alert('Error', 'Could not save draft.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    Alert.alert('Submit Listing', 'Submit this apartment for admin review?', [
      { text: 'Cancel' },
      {
        text: 'Submit',
        onPress: async () => {
          setLoading(true);
          try {
            const submitData = { ...form, status: 'submitted' };
            await apartmentService.create(submitData);
            await clearDraft();
            Alert.alert('Submitted!', 'Your apartment has been submitted for review. You will be notified once approved.', [
              { text: 'OK', onPress: () => navigation.navigate('MainTabs', { screen: 'Apartments' }) },
            ]);
          } catch (e) {
            Alert.alert('Submission Failed', e.message || 'Please try again.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goPrev();
    } else {
      Alert.alert('Exit Form', 'Save as draft before leaving?', [
        { text: "Don't Save", style: 'destructive', onPress: () => navigation.goBack() },
        { text: 'Save Draft', onPress: async () => { await handleSaveDraft(); navigation.goBack(); } },
        { text: 'Cancel' },
      ]);
    }
  };

  const renderStep = () => {
    const stepProps = { form, updateForm, errors: stepErrors };
    switch (currentStep) {
      case 1: return <Step1BasicInfo {...stepProps} />;
      case 2: return <Step2Photos {...stepProps} />;
      case 3: return <Step3Location {...stepProps} />;
      case 4: return <Step4HoldingImages {...stepProps} />;
      case 5: return <Step5TowerDetails {...stepProps} />;
      case 6: return <Step6Amenities {...stepProps} />;
      case 7: return <Step7Events {...stepProps} />;
      case 8: return <Step8RentSale {...stepProps} />;
      case 9: return <Step9Review form={form} onEdit={setCurrentStep} />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <CustomHeader
        title={isEdit ? 'Edit Apartment' : 'Add Apartment'}
        onBack={handleBack}
        rightComponent={
          <TouchableOpacity onPress={handleSaveDraft}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        }
      />
      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} stepTitles={STEP_TITLES} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderStep()}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.prevBtn} onPress={goPrev}>
            <Text style={styles.prevText}>← Back</Text>
          </TouchableOpacity>
        )}
        {currentStep < TOTAL_STEPS ? (
          <CustomButton
            title="Next →"
            onPress={goNext}
            style={[styles.nextBtn, currentStep === 1 && styles.nextBtnFull]}
            fullWidth={false}
          />
        ) : (
          <View style={styles.finalButtons}>
            <TouchableOpacity style={styles.draftBtn} onPress={handleSaveDraft}>
              <Text style={styles.draftText}>Save Draft</Text>
            </TouchableOpacity>
            <CustomButton
              title="Submit Listing"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitBtn}
              fullWidth={false}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  saveText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.medium },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.base, paddingTop: SPACING.md },
  bottomNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md,
    backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  prevBtn: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.lg },
  prevText: { fontSize: FONT_SIZES.base, color: COLORS.text, fontFamily: FONTS.medium },
  nextBtn: { flex: 1, marginLeft: SPACING.md },
  nextBtnFull: { marginLeft: 0, flex: 1 },
  finalButtons: { flex: 1, flexDirection: 'row', gap: SPACING.md },
  draftBtn: { flex: 1, paddingVertical: SPACING.md, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.lg, alignItems: 'center' },
  draftText: { fontSize: FONT_SIZES.base, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  submitBtn: { flex: 2 },
});

export default AddApartmentScreen;
