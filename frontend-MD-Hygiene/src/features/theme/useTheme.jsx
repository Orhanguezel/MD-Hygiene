// ✅ src/features/theme/useTheme.js
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // ✅ Tema değiştirme işlemi
  };

  return { theme, toggleTheme: handleToggleTheme };
};