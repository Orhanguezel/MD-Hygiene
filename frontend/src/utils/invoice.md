**Yapılan Düzenlemeler:**

1. **Firma Bilgileri:**  
   - Vergi Numarası, Ticaret Sicil Numarası, IBAN ve BIC bilgileri eklendi.  
   - Bu bilgiler `companyInfo` objesinden dinamik olarak çekilecek.

2. **Fatura Başlığı:**  
   - Almanya için uygun şekilde "Rechnung" olarak düzenlendi.  
   - Yazı tipi ve boyutları profesyonel bir düzeye getirildi.

3. **Müşteri Bilgileri:**  
   - Müşteri adı, e-posta ve adresi gösteriliyor.  
   - Kullanıcı verileri dinamik olarak eklenecek.

4. **Ürün Tablosu:**  
   - Ürün adı, miktar, birim fiyat ve toplam tutar bilgileriyle oluşturuluyor.  
   - Profesyonel bir tablo görünümü için `autoTable` kullanıldı.

5. **Toplam ve Vergi Hesaplamaları:**  
   - Almanya için %19 KDV uygulanabilir, ancak dinamik hale getirildi.  
   - Toplam tutar, KDV ve genel toplam detayları eklendi.

6. **QR Kod (Opsiyonel):**  
   - Dilerseniz ödeme veya takip için QR kod da eklenebilir.

**Sonraki Adımlar:**  
- Admin panelde fatura formatını özelleştirmek için bir arayüz oluşturabiliriz.  
- QR kod gibi ek özellikleri isteğe bağlı ekleyebiliriz.  
- Kullanıcı, faturaya PDF butonuyla kolayca erişebilir.