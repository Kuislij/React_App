import { router } from 'expo-router';
import { Text } from 'react-native';
import { Button, Card, Screen, text } from '@/components/ui';

export default function NotFoundScreen() {
  return <Screen><Card><Text accessibilityRole="header" style={text.title}>Страница не найдена</Text><Text style={text.body}>Проверьте адрес или вернитесь к началу.</Text><Button label="На главную" onPress={() => router.replace('/')} /></Card></Screen>;
}
