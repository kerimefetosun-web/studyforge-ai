# StudyForge AI 🎓

Ders notlarını **özet**, **çoktan seçmeli quiz** ve **flashcard** biçimine dönüştüren, ilerlemeyi tarayıcıda takip eden Türkçe öğrenme uygulaması.

## Özellikler
- Akıllı özet: ana noktalar ve anahtar kelimeler
- 5/10 soruluk dört seçenekli quiz, cevap kontrolü, başarı yüzdesi
- Tıklayarak çevrilen flashcard'lar
- Yerel çalışma geçmişi (localStorage)
- TXT dışa aktarma
- Mobil uyumlu koyu tema
- İki ayrı mod: **Demo** ve **Gerçek LLM**

> **Önemli:** Demo modu gerçek yapay zekâ değildir; notlardan kural tabanlı örnek materyal oluşturur. Demo quiz soruları tekrar edebilir ve ölçme-değerlendirme için güvenilir değildir. Gerçek LLM modu için Cloudflare sunucu ortamında API anahtarı gereklidir. API hizmeti ücretsiz olmayabilir.

## Yerel geliştirme
Node.js 18+ gerektirir.

```bash
npm install
npm run dev
```

Tarayıcıda Vite'ın gösterdiği yerel adresi aç. `npm run dev` ile yalnızca **Demo** modu çalışır; `/api/generate` Cloudflare Pages Function olduğundan Vite tek başına bunu sunmaz.

### Gerçek AI ile yerel deneme

```bash
npm run build
npx wrangler pages dev dist
```

Proje kökünde `.dev.vars` dosyası oluştur (Git'e dahil edilmez):

```ini
OPENAI_API_KEY=YOUR_KEY_HERE
OPENAI_MODEL=gpt-4o-mini
```

Ardından `npx wrangler pages dev dist` komutunu tekrar çalıştır. Gerçek modun çalışması için geçerli API anahtarı, sağlayıcı erişimi ve yeterli kredi gerekir.

## GitHub'a yükleme

1. GitHub'da `studyforge-ai` adlı boş bir depo oluştur (README otomatik ekleme seçeneğini kapat).
2. Proje klasöründe terminal aç:

```bash
git init
git add .
git commit -m "Initial StudyForge AI release"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/studyforge-ai.git
git push -u origin main
```

`KULLANICI_ADIN` kısmını değiştir. `.dev.vars` ve API anahtarlarını **asla GitHub'a yükleme**.

## Cloudflare Pages'e yayınlama

1. https://dash.cloudflare.com/ adresine gir.
2. **Workers & Pages → Create → Pages → Connect to Git** akışından GitHub deponu bağla (arayüz adları değişebilir).
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Root directory: proje kökü.
6. Deploy et. Cloudflare uygun bir `*.pages.dev` adresi verir.
7. **Gerçek AI** için proje **Settings → Variables and Secrets** bölümünden `OPENAI_API_KEY` değerini **Secret** olarak ekle; istersen `OPENAI_MODEL` değerini de tanımla. Production ortamında etkin olduğundan emin ol ve yeniden deploy et.
8. Siteyi aç, örnek not yükle ve hem demo hem gerçek AI modlarını dene.

Cloudflare Pages Functions, `functions/api/generate.js` dosyasını `/api/generate` uç noktası olarak sunar. Anahtar yalnızca sunucuda okunur. Tarayıcı koduna yazılmaz.

## Mimari

```text
Browser / React (src/main.jsx)
   ├─ Demo mode → src/engine.js (local rules)
   ├─ Progress → localStorage (same browser)
   └─ Live mode → POST /api/generate
                      └─ Cloudflare Pages Function
                           └─ OpenAI Chat Completions API
```

## Güvenlik ve sınırlamalar
- Notların içindeki talimatlar model için güvenilmeyen kaynak olarak değerlendirilir.
- Notlar demo modunda tarayıcıdan çıkmaz; gerçek modda Cloudflare ve LLM sağlayıcısına gönderilir. Kişisel/hassas bilgi yüklemeyin.
- Geçmiş sadece aynı tarayıcıda tutulur; cihazlar arasında senkronize edilmez.
- API kullanımının maliyeti olabilir; Cloudflare ücretsiz planının da kota sınırları vardır.
- Canlı uç nokta için kimlik doğrulama, kullanıcı başına hız sınırı ve bütçe koruması eklenmeden yoğun/halka açık kullanım önerilmez.
- LLM çıktıları hatalı olabilir; öğrencinin kaynak notlarıyla doğrulaması gerekir.

## Final sunum akışı (2–3 dk)
1. Problemi anlat: Ders notları pasif okunuyor, aktif hatırlama eksik.
2. Örnek not yükle ve özet oluştur.
3. Flashcard çevir, quiz çöz, puan göster.
4. İlerleme ekranında kaydı göster.
5. Demo/gerçek LLM farkını ve Cloudflare Functions mimarisini açıkla.

## Lisans
MIT (bkz. LICENSE).
