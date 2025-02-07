export const calculateGermanVAT = (amount, category) => {
    let taxRate = 0.19; // Almanya'da standart KDV oranı %19
  
    if (category === "gıda" || category === "kitap") {
      taxRate = 0.07; // İndirimli KDV oranı %7
    }
  
    const taxAmount = amount * taxRate;
    const totalWithTax = amount + taxAmount;
  
    return { taxRate, taxAmount, totalWithTax };
  };
  