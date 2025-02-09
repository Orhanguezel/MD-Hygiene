// ✅ src/features/offer/useOffers.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addOffer, updateOffer, deleteOffer, changeStatus, setOffers } from './offerSlice';
export const useOffers = () => {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offer);

  useEffect(() => {
    localStorage.setItem("offers", JSON.stringify(offers));
  }, [offers]);

  const handleAddOffer = (offer) => dispatch(addOffer(offer));
  const handleUpdateOffer = (updatedOffer) => dispatch(updateOffer(updatedOffer));
  const handleDeleteOffer = (id) => dispatch(deleteOffer(id));
  const handleChangeStatus = (id, status) => dispatch(changeStatus({ id, status }));
  const handleSetOffers = (offers) => dispatch(setOffers(offers));

  return {
    offers,
    addOffer: handleAddOffer,
    updateOffer: handleUpdateOffer,
    deleteOffer: handleDeleteOffer,
    changeStatus: handleChangeStatus,
    setOffers: handleSetOffers,
  };
};