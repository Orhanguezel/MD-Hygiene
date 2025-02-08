import React from "react";
import { Modal, PreviewContainer, CloseButton } from "./styles/offerStyles";

const OfferPreviewModal = ({ offer, onClose }) => (
  <Modal>
    <CloseButton onClick={onClose}>X</CloseButton>
    <PreviewContainer>
      <h2>Teklif Önizleme</h2>
      <p><strong>Teklif ID:</strong> {offer.id}</p>
      <p><strong>Müşteri:</strong> {offer.user}</p>
      <p><strong>Toplam Tutar:</strong> {offer.totalAmount} ₺</p>
      <p><strong>Durum:</strong> {offer.status}</p>
    </PreviewContainer>
  </Modal>
);

export default OfferPreviewModal;

