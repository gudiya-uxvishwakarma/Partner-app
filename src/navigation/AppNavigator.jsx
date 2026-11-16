import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePartner } from '../context/PartnerContext';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../constants/index';

// Auth
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import MyApartmentsScreen from '../screens/apartments/MyApartmentsScreen';
import AddApartmentScreen from '../screens/apartments/add/AddApartmentScreen';
import ApartmentDetailScreen from '../screens/apartments/ApartmentDetailScreen';
import BookingRequestsScreen from '../screens/bookings/BookingRequestsScreen';
import BookingDetailScreen from '../screens/bookings/BookingDetailScreen';
import MyEventsScreen from '../screens/events/MyEventsScreen';
import AddEventScreen from '../screens/events/AddEventScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import NotificationsScreen from '../screens/profile/NotificationsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Dashboard: '🏠',
  Apartments: '🏢',
  Bookings: '📅',
  Events: '🎉',
  Profile: '👤',
};

const CustomTabBar = ({ state, descriptors, navigation }) => (
  <View style={tabStyles.container}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;
      return (
        <TouchableOpacity
          key={route.key}
          style={tabStyles.tab}
          onPress={() => navigation.navigate(route.name)}
          accessibilityRole="button"
        >
          <Text style={[tabStyles.icon, isFocused && tabStyles.iconActive]}>
            {TAB_ICONS[route.name] || '●'}
          </Text>
          <Text style={[tabStyles.label, isFocused && tabStyles.labelActive]}>{route.name}</Text>
          {isFocused && <View style={tabStyles.indicator} />}
        </TouchableOpacity>
      );
    })}
  </View>
);

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 10,
  },
  tab: { flex: 1, alignItems: 'center', paddingTop: SPACING.sm, position: 'relative' },
  icon: { fontSize: 22, color: COLORS.textLight },
  iconActive: { color: COLORS.primary },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textLight, fontFamily: FONTS.medium, marginTop: 2 },
  labelActive: { color: COLORS.primary, fontFamily: FONTS.bold, fontWeight: '700' },
  indicator: { position: 'absolute', top: 0, width: 20, height: 3, backgroundColor: COLORS.primary, borderRadius: 2 },
});

const MainTabs = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Apartments" component={MyApartmentsScreen} />
    <Tab.Screen name="Bookings" component={BookingRequestsScreen} />
    <Tab.Screen name="Events" component={MyEventsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn, isLoading } = usePartner();
  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="AddApartment" component={AddApartmentScreen} />
            <Stack.Screen name="ApartmentDetail" component={ApartmentDetailScreen} />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
            <Stack.Screen name="AddEvent" component={AddEventScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
