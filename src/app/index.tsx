import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Screen, text } from '@/components/ui';
import { colors } from '@/theme';

const capabilities = [
  ['01', 'Экраны и переходы', 'Главная, каталог и подробности. Каркас для вашего сценария.'],
  ['02', 'Поиск и избранное', 'Работа с данными и сохранение выбора на устройстве.'],
  ['03', 'Общие компоненты', 'Кнопки, карточки и единая тема для быстрой разработки.'],
];

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.brand}><View style={styles.logo}><Text style={styles.logoText}>R</Text></View><Text style={styles.brandName}>React App</Text></View>
        <View style={styles.badge}><View style={styles.dot} /><Text style={styles.badgeText}>Основа готова</Text></View>
      </View>
      <View style={styles.hero}>
        <Text style={text.eyebrow}>Место для вашей идеи</Text>
        <Text accessibilityRole="header" style={[text.title, styles.heroTitle]}>От первой идеи{ '\n' }к работающему приложению.</Text>
        <Text style={[text.body, styles.description]}>Здесь начинается ваш проект. Проверьте базовый сценарий в песочнице, а затем замените примеры своей задачей.</Text>
        <View style={styles.action}><Button label="Открыть песочницу →" onPress={() => router.push('/demo')} /></View>
        <Text style={text.small}>Одна основа · браузер и телефон</Text>
      </View>
      <View style={styles.sectionHeading}><Text accessibilityRole="header" style={text.heading}>Уже под рукой</Text><Text style={text.small}>Можно сразу использовать</Text></View>
      <View style={styles.grid}>
        {capabilities.map(([number, title, body]) => (
          <View key={number} style={styles.tile}><Card><Text style={text.eyebrow}>{number}</Text><Text style={text.heading}>{title}</Text><Text style={text.body}>{body}</Text></Card></View>
        ))}
      </View>
      <View style={styles.footer}><Text style={text.small}>Демонстрационная заготовка</Text><Text style={text.small}>React Native / Expo / TypeScript</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  logo: { backgroundColor: colors.ink, width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#FFFFFF', fontWeight: '800', fontSize: 23 },
  brandName: { color: colors.ink, fontWeight: '700', fontSize: 18 },
  badge: { backgroundColor: colors.successSoft, flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  badgeText: { color: colors.success, fontSize: 12, fontWeight: '700' },
  hero: { gap: 20, paddingVertical: 34 },
  heroTitle: { maxWidth: 710 },
  description: { maxWidth: 590 },
  action: { alignSelf: 'flex-start' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  tile: { flexGrow: 1, flexBasis: 240 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, borderTopWidth: 1, borderTopColor: colors.line, paddingVertical: 18 },
});
