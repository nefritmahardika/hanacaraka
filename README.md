# 🪷 Hanacaraka

Hanacaraka adalah aplikasi web interaktif yang menampilkan cerita-cerita beraksara Jawa beserta terjemahannya. Aplikasi ini memanfaatkan data semantik berbasis RDF, dan dibangun menggunakan **Next.js**, **React**, **Tailwind CSS**, serta **GSAP** untuk animasi.

---

## 🚀 Fitur Utama

- 🏠 Halaman Beranda dengan animasi smooth GSAP dan layout responsif  
- 🔍 Halaman Pencarian: input kata kunci dan sorot hasil yang cocok  
- 🔗 Integrasi RDF melalui endpoint SPARQL dari **Apache Jena Fuseki**  
- 📡 API `/api/search` untuk query dinamis berdasarkan keyword  
- 📖 Menampilkan aksara Jawa, transliterasi Latin, dan terjemahan  

---

## 📂 Struktur Folder

.
├── apache-jena-fuseki
├── app/
│ ├── page.js # Halaman utama (Home)
│ ├── about/page.js # Halaman utama (Home)
│ └── search/page.js # Halaman pencarian
├── app/api/search/route.js # API endpoint untuk pencarian
├── components/ # Komponen React
│ ├── navLogo.js
│ ├── navList.js
│ ├── footer.js
│ ├── form.js
└── welcome.js
├── public/
├── styles/
├── rdfs/
│ ├── jawa_naskah_final_relinked_safe.ttl # Dataset RDF
└── ...

---

## 🛠️ Cara Menjalankan Aplikasi

### 1. Jalankan Apache Jena Fuseki

Pastikan kamu sudah mengunduh dan mengekstrak [Apache Jena Fuseki](https://jena.apache.org/documentation/fuseki2/).

```bash
./fuseki-start
Buka browser ke:
🔗 http://localhost:3030
2. Upload File RDF
Klik Manage Datasets > Add New Dataset
Nama: hanacaraka
Pilih “Upload RDF data”
Upload file: jawa_naskah_final_relinked_safe.ttl
Pastikan dataset bisa diakses via SPARQL di:
http://localhost:3030/hanacaraka/sparql
3. Jalankan Aplikasi Web
npm install
npm run dev
Aplikasi akan berjalan di:
🔗 http://localhost:3000
🔍 API: /api/search
Endpoint
GET /api/search?q=kata
Mendukung pencarian terhadap:
Judul cerita
Aksara Jawa
Transliterasi Latin
Terjemahan Bahasa Indonesia
Contoh Output
[
  {
    "judul": "Gunung Merapi",
    "aksara": "ꦒꦸꦤꦸꦁ ꦩꦼꦫꦥꦶ",
    "terjemahan": "Gunung Merapi",
    "latin": "Gunung Merapi"
  }
]
🧱 Teknologi yang Digunakan
Next.js
React
Tailwind CSS
GSAP
Apache Jena Fuseki
📦 Instalasi Dependency
Jika kamu ingin mendukung pengolahan RDF dari sisi Python (opsional):
# requirements.txt
rdflib==7.0.0
sparqlwrapper==2.0.0
requests==2.31.0
📸 Screenshot 

🤝 Kontribusi
Pull Request terbuka untuk:
Penambahan cerita atau dataset baru
Perbaikan UI/UX
Penyempurnaan sistem pencarian
