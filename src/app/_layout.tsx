import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from '@/features/demo/favorites';
import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
    </FavoritesProvider>
  );
}
