import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserProfile, loginUser, logoutUser, setAuthError } from './authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(fetchUserProfile()); // ✅ Kullanıcı profilini getir
    } else {
      dispatch(setAuthError(null)); // ✅ Hata sıfırlama
    }
  }, [dispatch, user]);

  const signin = (credentials) => dispatch(loginUser(credentials)); // ✅ Giriş Yap
  const signout = () => dispatch(logoutUser());                     // ✅ Çıkış Yap
  const isAdmin = user?.role === "admin";                           // ✅ Admin Kontrolü

  return { user, token, loading, error, signin, signout, isAdmin };
};
