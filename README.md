# skdesignsx – Futbol Haber & Video Platformu

Futbol odaklı haber/video sitesi + korumalı admin paneli.

## Kurulum

```bash
cd admin-panel
npm install
npm run dev
```

## Admin

- `/admin/login`
- E-posta: `admin@skdesignsx.com`
- Şifre: `SkDx2026!`

Şifreyi **Ayarlar** üzerinden değiştirin.

## Not (önemli)

Eski demo verisi tarayıcıda kaldıysa futbol içeriklerini görmek için bir kez:

Tarayıcı konsolu (F12) → `localStorage.clear()` → sayfayı yenile.

Veya sadece:
`localStorage.removeItem('skdx_news'); localStorage.removeItem('skdx_videos');`

## Özellikler

- Futbol manşet, haber, video
- Kategoriler: Transfer, Maç, Lig, Milli Takım, Analiz...
- YouTube / Vimeo / mp4 otomatik oynatma
- Gerçekçi görüntülenme sayıları
- İstatistik paneli
- Favicon (top)
- Yeşil spor teması

Frontend demo · veriler localStorage.
