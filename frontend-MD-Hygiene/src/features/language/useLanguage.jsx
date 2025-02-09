// ✅ src/features/language/useLanguage.js
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from './languageSlice';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const { language, texts } = useSelector((state) => state.language);

  const setLanguage = (lang) => {
    dispatch(changeLanguage(lang)); // ✅ Dili değiştirme işlemi
  };

  return { language, setLanguage, texts };
};
