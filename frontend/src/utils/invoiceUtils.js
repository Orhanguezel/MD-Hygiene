export const calculateInvoiceTotals = (items) => {
  const TAX_RATE = 19; // %19 KDV
  const SHIPPING_COST = 20; // Sabit nakliye ücreti

  // 🟢 Toplam fiyat zaten KDV dahil
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  
  // ✅ KDV Hesaplama (Fiyatın içinden ayırarak hesaplıyoruz)
  const taxAmount = (subtotal * TAX_RATE) / (100 + TAX_RATE);
  
  // ✅ KDV zaten dahil olduğu için ekstra ekleme yok!
  const totalAmount = subtotal + SHIPPING_COST;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)), // KDV dahil fiyat
    totalAmount: parseFloat(totalAmount.toFixed(2)), // KDV dahil toplam fiyat
    taxAmount: parseFloat(taxAmount.toFixed(2)), // Ayrıştırılmış KDV
    taxRate: TAX_RATE, // KDV oranı
    shippingCost: SHIPPING_COST, // Nakliye ücreti
  };
};
