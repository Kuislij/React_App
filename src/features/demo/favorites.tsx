import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { demoItems } from './data';

const STORAGE_KEY = 'react-app-starter:demo-favorites:v1';
const READ_ERROR = 'Не удалось прочитать избранное. Проверьте доступ к хранилищу и повторите.';

async function readFavorites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const value: unknown = raw === null ? [] : JSON.parse(raw);
  if (!Array.isArray(value) || !value.every((id) => typeof id === 'string')) {
    throw new Error('Invalid saved favorites');
  }
  return [...new Set(value.filter((id) => demoItems.some((item) => item.id === id)))];
}
type Favorites = {
  ids: string[];
  ready: boolean;
  saving: boolean;
  error: string | null;
  reload: () => Promise<void>;
  toggle: (id: string) => Promise<void>;
};
const Context = createContext<Favorites | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lock = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    void readFavorites().then((value) => {
      if (mounted.current) {
        setIds(value);
        setReady(true);
      }
    }).catch(() => {
      if (mounted.current) setError(READ_ERROR);
    });
    return () => { mounted.current = false; };
  }, []);

  const reload = async () => {
    setReady(false);
    setError(null);
    try {
      const value = await readFavorites();
      if (mounted.current) {
        setIds(value);
        setReady(true);
      }
    } catch {
      if (mounted.current) setError(READ_ERROR);
    }
  };

  const toggle = async (id: string) => {
    if (!ready || lock.current || !demoItems.some((item) => item.id === id)) return;
    lock.current = true;
    setSaving(true);
    setError(null);
    const next = ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      if (mounted.current) setIds(next);
    } catch {
      if (mounted.current) setError('Не удалось сохранить изменение. Попробуйте ещё раз.');
    } finally {
      lock.current = false;
      if (mounted.current) setSaving(false);
    }
  };

  return <Context.Provider value={{ ids, ready, saving, error, reload, toggle }}>{children}</Context.Provider>;
}

export function useFavorites() {
  const value = useContext(Context);
  if (!value) throw new Error('useFavorites requires FavoritesProvider');
  return value;
}
