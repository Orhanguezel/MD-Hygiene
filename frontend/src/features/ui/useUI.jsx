// ✅ src/features/ui/useUI.js
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleModal, setLoading } from './uiSlice';

export const useUI = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, modalOpen, loading } = useSelector((state) => state.ui);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  const handleSetLoading = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  return {
    sidebarOpen,
    modalOpen,
    loading,
    toggleSidebar: handleToggleSidebar,
    toggleModal: handleToggleModal,
    setLoading: handleSetLoading,
  };
};
