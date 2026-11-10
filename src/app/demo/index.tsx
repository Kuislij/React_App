import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Card, Screen, text } from '@/components/ui';
import { StorageStatus } from '@/components/storage-status';
import { demoItems } from '@/features/demo/data';
import { useFavorites } from '@/features/demo/favorites';
import { colors } from '@/theme';

export default function DemoScreen() {
  const [query, setQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { ids, ready } = useFavorites();
  const normalizedQuery = query.trim().toLocaleLowerCase('ru');
  const items = demoItems.filter((item) =>
    `${item.title} ${item.category}`.toLocaleLowerCase('ru').includes(normalizedQuery) && (!onlyFavorites || ids.includes(item.id))
  );

  return (
    <Screen>
      <View style={styles.back}><Button label="← На главную" secondary onPress={() => router.replace('/')} /></View>
      <Text style={text.eyebrow}>Демонстрационный сценарий</Text>
      <Text accessibilityRole="header" style={text.title}>Песочница</Text>
      <Text style={text.body}>Найдите карточку, откройте подробности и сохраните в избранное. Данные примеров можно заменить после получения задания.</Text>
      <TextInput accessibilityLabel="Поиск карточек" placeholder="Поиск по названию или категории" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} style={styles.input} autoCorrect={false} />
      <View style={styles.filters}>
        <Button label={onlyFavorites ? 'Показать все' : `Только избранное (${ids.length})`} secondary disabled={!ready} onPress={() => setOnlyFavorites((value) => !value)} />
        <Text accessibilityLiveRegion="polite" style={text.small}>Найдено: {items.length}</Text>
      </View>
      <StorageStatus />
      {items.map((item) => (
        <Card key={item.id}>
          <Text style={text.eyebrow}>{item.category} · {item.id}{ids.includes(item.id) ? ' · Сохранено' : ''}</Text>
          <Text accessibilityRole="header" style={text.heading}>{item.title}</Text>
          <Text style={text.body}>{item.description}</Text>
          <Button label={`Открыть: ${item.title}`} secondary onPress={() => router.push({ pathname: '/demo/[id]', params: { id: item.id } })} />
        </Card>
      ))}
      {items.length === 0 && <Card><Text style={text.heading}>Пока ничего не найдено</Text><Text style={text.body}>Измените запрос или отключите фильтр избранного.</Text><Button label="Сбросить фильтры" secondary onPress={() => { setQuery(''); setOnlyFavorites(false); }} /></Card>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { alignSelf: 'flex-start' },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 16, fontSize: 16, color: colors.ink, minHeight: 54 },
  filters: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
});
