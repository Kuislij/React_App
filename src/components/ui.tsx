import type { PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme';

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
};

export function Button({ label, onPress, secondary = false, disabled = false }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, secondary && styles.secondary, (pressed || disabled) && styles.dimmed]}
    >
      <Text style={[styles.buttonText, secondary && styles.secondaryText]}>{label}</Text>
    </Pressable>
  );
}

export const text = StyleSheet.create({
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },
  title: { color: colors.ink, fontSize: 36, lineHeight: 43, fontWeight: '800', letterSpacing: -1.1 },
  heading: { color: colors.ink, fontSize: 21, lineHeight: 28, fontWeight: '700' },
  body: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  small: { color: colors.muted, fontSize: 13, lineHeight: 21 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingVertical: 28 },
  content: { width: '100%', maxWidth: 880, alignSelf: 'center', gap: 24 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 22, padding: 24, gap: 14 },
  button: { minHeight: 50, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: colors.primary, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  secondary: { backgroundColor: colors.primarySoft },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, textAlign: 'center' },
  secondaryText: { color: colors.primary },
  dimmed: { opacity: 0.55 },
});
