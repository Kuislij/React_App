import { Text, View } from 'react-native';
import { Button, text } from './ui';
import { useFavorites } from '@/features/demo/favorites';
import { colors } from '@/theme';

export function StorageStatus() {
  const { error, ready, reload } = useFavorites();
  if (error) return (
    <View accessibilityRole="alert" style={{ gap: 12 }}>
      <Text style={[text.body, { color: colors.danger }]}>{error}</Text>
      {!ready && <Button label="Повторить загрузку" secondary onPress={() => void reload()} />}
    </View>
  );
  if (!ready) return <Text style={text.small}>Загружаем сохранённое…</Text>;
  return null;
}
