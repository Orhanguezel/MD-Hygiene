// ✅ utils/invoiceUtils.js

export const calculateInvoiceTotals = (items) => {
    const TAX_RATE = 0.19;
    const SHIPPING_COST = 20; // Sabit nakliye ücreti
  
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxAmount = subtotal * TAX_RATE;
    const totalAmount = subtotal + taxAmount + SHIPPING_COST;
  
    return {
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      taxRate: TAX_RATE * 100,
      shippingCost: SHIPPING_COST,
    };
  };
  