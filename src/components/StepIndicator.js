import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../constants/index';

const StepIndicator = ({ currentStep, totalSteps, stepTitles = [] }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.stepCount}>Step {currentStep} of {totalSteps}</Text>
        {stepTitles[currentStep - 1] && (
          <Text style={styles.stepTitle}>{stepTitles[currentStep - 1]}</Text>
        )}
      </View>
      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
      </View>
      {/* Step dots */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dots}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <View key={i} style={styles.dotWrapper}>
              <View style={[
                styles.dot,
                isCompleted && styles.dotCompleted,
                isCurrent && styles.dotCurrent,
              ]}>
                <Text style={[styles.dotText, (isCompleted || isCurrent) && styles.dotTextActive]}>
                  {isCompleted ? '✓' : stepNum}
                </Text>
              </View>
              {i < totalSteps - 1 && (
                <View style={[styles.connector, isCompleted && styles.connectorCompleted]} />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.sm },
  stepCount: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontFamily: FONTS.medium },
  stepTitle: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  progressBar: { height: 4, backgroundColor: COLORS.border, borderRadius: 2, marginBottom: SPACING.md },
  progressFill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
  dots: { flexDirection: 'row', alignItems: 'center', paddingBottom: 2 },
  dotWrapper: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.inputBg, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  dotCompleted: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dotCurrent: { backgroundColor: COLORS.white, borderColor: COLORS.primary },
  dotText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontFamily: FONTS.bold, fontWeight: '700' },
  dotTextActive: { color: COLORS.primary },
  connector: { width: 20, height: 2, backgroundColor: COLORS.border, marginHorizontal: 2 },
  connectorCompleted: { backgroundColor: COLORS.primary },
});

export default StepIndicator;
