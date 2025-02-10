import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addOffer, updateOffer, deleteOffer, updateStatus, setOffers, archiveOffer } from './offerSlice';

export const useOffers = () => {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offer);

  // ✅ LocalStorage ile senkronizasyon
  useEffect(() => {
    localStorage.setItem("offers", JSON.stringify(offers));
  }, [offers]);

  // ✅ CRUD İşlevleri
  const handleAddOffer = (offer) => dispatch(addOffer(offer));
  const handleUpdateOffer = (updatedOffer) => dispatch(updateOffer(updatedOffer));
  const handleDeleteOffer = (id) => dispatch(deleteOffer(id));
  const handleUpdateStatus = (id, status, isActive) => dispatch(updateStatus({ id, status, isActive }));
  const handleSetOffers = (offers) => dispatch(setOffers(offers));
  const handleArchiveOffer = (id) => dispatch(archiveOffer(id));

  return {
    offers,
    addOffer: handleAddOffer,
    updateOffer: handleUpdateOffer,
    deleteOffer: handleDeleteOffer,
    updateStatus: handleUpdateStatus,
    setOffers: handleSetOffers,
    archiveOffer: handleArchiveOffer,
  };
};
