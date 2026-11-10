import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, Screen, text } from '@/components/ui';
import { StorageStatus } from '@/components/storage-status';
import { demoItems } from '@/features/demo/data';
import { useFavorites } from '@/features/demo/favorites';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = demoItems.find((value) => value.id === id);
  const { ids, ready, saving, toggle } = useFavorites();
  const back = () => router.canGoBack() ? router.back() : router.replace('/demo');

  return (
    <Screen>
      <View style={{ alignSelf: 'flex-start' }}><Button label="← К карточкам" secondary onPress={back} /></View>
      {item ? <>
        <Text style={text.eyebrow}>{item.category} · {item.id}</Text>
        <Text accessibilityRole="header" style={text.title}>{item.title}</Text>
        <Card>
          <Text style={text.body}>{item.description}</Text>
          <Text style={text.small}>Избранное сохраняется на этом устройстве и остаётся после перезапуска приложения.</Text>
          <Button label={saving ? 'Сохраняем…' : ids.includes(item.id) ? 'Убрать из избранного' : 'Добавить в избранное'} disabled={!ready || saving} onPress={() => void toggle(item.id)} />
          <StorageStatus />
        </Card>
      </> : <Card><Text accessibilityRole="header" style={text.heading}>Карточка не найдена</Text><Text style={text.body}>В примере доступны карточки 01, 02 и 03.</Text><Button label="Открыть каталог" onPress={() => router.replace('/demo')} /></Card>}
    </Screen>
  );
}
