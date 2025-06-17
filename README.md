# 🪷 Hanacaraka

Hanacaraka adalah aplikasi web interaktif yang menampilkan cerita-cerita beraksara Jawa beserta terjemahannya. Aplikasi ini memanfaatkan data semantik berbasis RDF, dan dibangun menggunakan **Next.js**, **React**, **Tailwind CSS**, serta **GSAP** untuk animasi.

---

| No | Nama Anggota         | NPM          |
|----|----------------------|----------------------------|
| 1  | Muhammad Nefrit Mahardika | 140810220006     |
| 2  | Rafa Agustant   | 140810220016  |
| 3  | Farhan Karisma | 140810220042            |

---

## 🚀 Fitur Utama

- 🏠 Halaman Beranda dengan animasi smooth GSAP dan layout responsif  
- 🔍 Halaman Pencarian: input kata kunci dan sorot hasil yang cocok  
- 🔗 Integrasi RDF melalui endpoint SPARQL dari **Apache Jena Fuseki**  
- 📡 API `/api/search` untuk query dinamis berdasarkan keyword  
- 📖 Menampilkan aksara Jawa, transliterasi Latin, dan terjemahan  

---


## 📂 Struktur Folder

```
.
├── apache-jena-fuseki
├── app/
│   ├── page.js                  # Halaman utama (Home)
│   ├── about/page.js           # Halaman About
│   └── search/page.js          # Halaman pencarian
├── app/api/search/route.js     # API endpoint untuk pencarian
├── components/                 # Komponen React
│   ├── navLogo.js
│   ├── navList.js
│   ├── footer.js
│   ├── form.js
│   └── welcome.js
├── public/
├── styles/
├── rdfs/
│   └── jawa_naskah_final_relinked_safe.ttl  # Dataset RDF
└── ...
```

---

## 🛠️ Cara Menjalankan Aplikasi

### 1. Jalankan Apache Jena Fuseki

Pastikan kamu sudah mengunduh dan mengekstrak [Apache Jena Fuseki](https://jena.apache.org/documentation/fuseki2/).

```bash
./fuseki-start
```

Buka browser ke:  
🔗 http://localhost:3030

### 2. Upload File RDF

- Klik **Manage Datasets > Add New Dataset**
- Nama: `hanacaraka`
- Pilih **Upload RDF data**
- Upload file: `jawa_naskah_final_relinked_safe.ttl`
- Pastikan dataset bisa diakses via SPARQL di:  
  🔗 http://localhost:3030/hanacaraka/sparql

### 3. Jalankan Aplikasi Web

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di:  
🔗 http://localhost:3000  

Mendukung pencarian terhadap:
- Judul cerita
- Aksara Jawa
- Transliterasi Latin
- Terjemahan Bahasa Indonesia

---

## 🧱 Teknologi yang Digunakan

- Next.js  
- React  
- Tailwind CSS  
- GSAP  
- Apache Jena Fuseki  

---

## 📸 Screenshot

*(Tambahkan screenshot di sini jika ada)*

---

## 🤝 Kontribusi

Pull Request terbuka untuk:
- Penambahan cerita atau dataset baru
- Perbaikan UI/UX
- Penyempurnaan sistem pencarian
