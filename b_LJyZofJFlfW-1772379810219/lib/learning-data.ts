export const navItems = [
  { id: "beranda", label: "Beranda", icon: "Home" },
  { id: "teori", label: "Teori Asam Basa", icon: "BookOpen" },
  { id: "kesetimbangan", label: "Kesetimbangan Ion", icon: "Scale" },
  { id: "kekuatan", label: "Kekuatan Asam Basa", icon: "FlaskConical" },
  { id: "ph", label: "Derajat Keasaman", icon: "BarChart3" },
  { id: "indikator", label: "Indikator Asam Basa", icon: "Palette" },
  { id: "latihan", label: "Latihan Soal", icon: "PenTool" },
  { id: "glosarium", label: "Glosarium", icon: "BookMarked" },
  { id: "dasbor", label: "Dasbor Guru", icon: "LayoutDashboard" },
] as const;

export type PageId = (typeof navItems)[number]["id"];

export interface StudentResult {
  name: string;
  score: number;
  total: number;
  answers: Record<number, number>;
  timestamp: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Menurut Teori asam basa Arrhenius, zat dikatakan asam jika...",
    options: [
      "Dalam air menghasilkan ion H\u207A",
      "Dalam air menghasilkan atom H",
      "Donor proton",
      "Akseptor proton",
      "Donor pasangan elektron",
    ],
    correctAnswer: 0,
    explanation: "Menurut Arrhenius, asam adalah zat yang dalam air menghasilkan ion H\u207A. Pilihan C adalah definisi asam menurut Bronsted-Lowry, dan E adalah definisi basa menurut Lewis.",
    category: "Teori Asam Basa",
  },
  {
    id: 2,
    question: "Diantara larutan-larutan berikut, manakah yang merupakan larutan basa?",
    options: [
      "C\u2082H\u2085OH",
      "CH\u2083COOH",
      "HCl",
      "NaOH",
      "NaCl",
    ],
    correctAnswer: 3,
    explanation: "NaOH adalah basa karena dalam air melepaskan ion OH\u207B. NaOH(aq) \u2192 Na\u207A(aq) + OH\u207B(aq)",
    category: "Teori Asam Basa",
  },
  {
    id: 3,
    question: "Dalam reaksi: NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2083O\u207A(aq), pasangan asam basa konjugasi adalah...",
    options: [
      "NH\u2084\u207A dengan H\u2082O",
      "NH\u2083 dengan NH\u2084\u207A",
      "NH\u2084\u207A dengan H\u2083O\u207A",
      "NH\u2083 dengan H\u2083O\u207A",
      "NH\u2083 dengan H\u2082O",
    ],
    correctAnswer: 1,
    explanation: "NH\u2084\u207A bertindak sebagai asam (donor H\u207A) dan NH\u2083 adalah basa konjugasinya. Jadi NH\u2083 dan NH\u2084\u207A adalah pasangan asam-basa konjugasi.",
    category: "Teori Asam Basa",
  },
  {
    id: 4,
    question: "Menurut teori asam basa Lewis, sifat H\u2082O dalam reaksi H\u2082O + CO\u2082 \u2192 H\u2082CO\u2083 adalah...",
    options: [
      "Asam",
      "Basa",
      "Asam konjugasi",
      "Basa konjugasi",
      "Netral",
    ],
    correctAnswer: 1,
    explanation: "Menurut Lewis, H\u2082O bertindak sebagai basa karena memberikan pasangan elektron kepada atom C pada CO\u2082.",
    category: "Teori Asam Basa",
  },
  {
    id: 5,
    question: "Diantara spesi berikut manakah yang tidak berlaku sebagai asam Bronsted-Lowry?",
    options: [
      "NH\u2084\u207A",
      "H\u2082O",
      "HCO\u2083\u207B",
      "CO\u2083\u00B2\u207B",
      "H\u2082CO\u2083",
    ],
    correctAnswer: 3,
    explanation: "CO\u2083\u00B2\u207B tidak memiliki atom H yang dapat didonorkan, sehingga tidak dapat bertindak sebagai asam Bronsted-Lowry.",
    category: "Teori Asam Basa",
  },
  {
    id: 6,
    question: "Air merupakan senyawa netral, jika mengalami ionisasi maka...",
    options: [
      "[H\u207A] > [OH\u207B]",
      "[H\u207A] < [OH\u207B]",
      "[H\u207A] = [OH\u207B]",
      "Pada suhu 25\u00B0C harga Kw = 10\u207B\u2077",
      "Pada suhu 25\u00B0C [H\u207A] = 10\u207B\u00B9\u2074",
    ],
    correctAnswer: 2,
    explanation: "Dalam air murni (netral), konsentrasi ion H\u207A sama dengan konsentrasi ion OH\u207B, yaitu [H\u207A] = [OH\u207B] = 10\u207B\u2077 M pada 25\u00B0C.",
    category: "Kesetimbangan Ion",
  },
  {
    id: 7,
    question: "Berapakah pH larutan HCl 0,1 M?",
    options: ["0", "1", "2", "7", "13"],
    correctAnswer: 1,
    explanation: "HCl adalah asam kuat. [H\u207A] = Ma \u00D7 a = 0,1 \u00D7 1 = 0,1 M. pH = -log(0,1) = -log(10\u207B\u00B9) = 1",
    category: "Perhitungan pH",
  },
  {
    id: 8,
    question: "Berapakah pH larutan H\u2082SO\u2084 0,1 M?",
    options: ["0,3", "0,7", "1", "1,3", "2"],
    correctAnswer: 1,
    explanation: "H\u2082SO\u2084 asam kuat bervalensi 2. [H\u207A] = 0,1 \u00D7 2 = 0,2 M. pH = -log(0,2) = -log(2\u00D710\u207B\u00B9) = 1 - log 2 = 1 - 0,3 = 0,7",
    category: "Perhitungan pH",
  },
  {
    id: 9,
    question: "Berapakah pH larutan NaOH 0,1 M pada suhu 25\u00B0C?",
    options: ["1", "7", "10", "13", "14"],
    correctAnswer: 3,
    explanation: "[OH\u207B] = 0,1 \u00D7 1 = 0,1 M. pOH = -log(0,1) = 1. pH = 14 - pOH = 14 - 1 = 13",
    category: "Perhitungan pH",
  },
  {
    id: 10,
    question: "Indikator lakmus merah jika dicelupkan pada larutan basa akan berubah menjadi berwarna...",
    options: ["Merah", "Biru", "Orange", "Tidak berwarna", "Kuning"],
    correctAnswer: 1,
    explanation: "Kertas lakmus merah akan berubah menjadi biru jika dicelupkan ke dalam larutan basa.",
    category: "Indikator",
  },
  {
    id: 11,
    question: "Zat di bawah ini yang dapat memerahkan kertas lakmus biru adalah...",
    options: ["NaOH", "Ca(OH)\u2082", "CH\u2083COOH", "CO(NH\u2082)\u2082", "C\u2082H\u2085OH"],
    correctAnswer: 2,
    explanation: "CH\u2083COOH (asam asetat) bersifat asam, sehingga akan memerahkan kertas lakmus biru.",
    category: "Indikator",
  },
  {
    id: 12,
    question: "Pernyataan yang tidak tepat tentang asam basa adalah...",
    options: [
      "Asam Arrhenius menghasilkan ion H\u207A dalam air",
      "Basa Arrhenius menghasilkan ion OH\u207B dalam air",
      "Asam Lewis adalah akseptor pasangan elektron",
      "Asam konjugasi adalah basa yang telah menerima 1 ion H\u207A",
      "Basa Bronsted-Lowry adalah akseptor proton",
    ],
    correctAnswer: 2,
    explanation: "Asam Lewis adalah akseptor pasangan elektron, bukan donor. Pernyataan nomor 3 salah karena menyebutkan donor pasangan elektron (yang merupakan definisi basa Lewis).",
    category: "Teori Asam Basa",
  },
  {
    id: 13,
    question: "Suatu reaksi: H\u2082O + HNO\u2082 \u21CC H\u2083O\u207A + NO\u2082\u207B. Pasangan asam-basa konjugasi adalah...",
    options: [
      "H\u2082O dan H\u2083O\u207A",
      "HNO\u2082 dan NO\u2082\u207B",
      "H\u2082O dan HNO\u2082",
      "H\u2082O dan NO\u2082\u207B",
      "HNO\u2082 dan H\u2083O\u207A",
    ],
    correctAnswer: 1,
    explanation: "HNO\u2082 adalah asam yang memberikan H\u207A menjadi NO\u2082\u207B (basa konjugasinya). Jadi HNO\u2082 dan NO\u2082\u207B adalah pasangan asam-basa konjugasi.",
    category: "Teori Asam Basa",
  },
  {
    id: 14,
    question: "Berdasarkan data berikut, yang merupakan asam kuat dan basa lemah berturut-turut adalah: 1) HF, 2) H\u2082SO\u2084, 3) HNO\u2082, 4) Be(OH)\u2082, 5) Ba(OH)\u2082, 6) NH\u2084OH",
    options: ["1 dan 4", "1 dan 5", "2 dan 5", "2 dan 6", "3 dan 6"],
    correctAnswer: 3,
    explanation: "H\u2082SO\u2084 adalah asam kuat dan NH\u2084OH adalah basa lemah. HF adalah asam lemah, HNO\u2082 asam lemah, Be(OH)\u2082 basa lemah, Ba(OH)\u2082 basa kuat.",
    category: "Kekuatan Asam Basa",
  },
  {
    id: 15,
    question: "Derajat ionisasi asam cuka 0,1 M adalah 1%. Berapakah [H\u207A] asam cuka tersebut?",
    options: [
      "10\u207B\u00B9 M",
      "10\u207B\u00B2 M",
      "10\u207B\u00B3 M",
      "10\u207B\u2074 M",
      "10\u207B\u2075 M",
    ],
    correctAnswer: 2,
    explanation: "[H\u207A] = Ma \u00D7 \u03B1 = 0,1 \u00D7 0,01 = 10\u207B\u00B3 M",
    category: "Perhitungan pH",
  },
  {
    id: 16,
    question: "Indikator universal berwarna jingga menunjukkan pH = 5. Larutan tersebut bersifat...",
    options: ["Asam lemah", "Asam kuat", "Basa lemah", "Basa kuat", "Netral"],
    correctAnswer: 0,
    explanation: "pH = 5 menunjukkan larutan bersifat asam lemah. pH asam kuat biasanya 0 < pH < 2.",
    category: "Indikator",
  },
  {
    id: 17,
    question: "Basa konjugasi dari HSO\u2084\u207B adalah...",
    options: [
      "H\u2083SO\u2084\u207A",
      "H\u2082SO\u2084",
      "HSO\u2084\u207B",
      "HSO\u2084\u00B2\u207B",
      "SO\u2084\u00B2\u207B",
    ],
    correctAnswer: 4,
    explanation: "Basa konjugasi dari HSO\u2084\u207B diperoleh dengan melepaskan 1 ion H\u207A: HSO\u2084\u207B \u2192 H\u207A + SO\u2084\u00B2\u207B.",
    category: "Teori Asam Basa",
  },
  {
    id: 18,
    question: "Menurut teori asam basa Lewis, sifat BF\u2083 dalam reaksi BF\u2083 + F\u207B \u2192 BF\u2084\u207B adalah...",
    options: ["Asam", "Basa", "Asam konjugasi", "Basa konjugasi", "Netral"],
    correctAnswer: 0,
    explanation: "BF\u2083 bertindak sebagai asam Lewis karena menerima pasangan elektron dari F\u207B.",
    category: "Teori Asam Basa",
  },
  {
    id: 19,
    question: "Senyawa yang berperan sebagai asam dan basa Bronsted-Lowry (amfiprotik) adalah...",
    options: ["Cl\u207B", "H\u2082O", "CO\u2082", "CO\u2083\u00B2\u207B", "NO\u2083\u207B"],
    correctAnswer: 1,
    explanation: "H\u2082O bersifat amfiprotik: bisa sebagai asam (donor H\u207A) dan basa (akseptor H\u207A).",
    category: "Teori Asam Basa",
  },
  {
    id: 20,
    question: "Cuka, air aki, dan kopi berturut-turut bersifat...",
    options: [
      "Asam, asam, asam",
      "Asam, asam, basa",
      "Asam, basa, netral",
      "Basa, asam, asam",
      "Netral, asam, basa",
    ],
    correctAnswer: 0,
    explanation: "Cuka mengandung asam asetat (asam), air aki mengandung H\u2082SO\u2084 (asam), dan kopi bersifat sedikit asam.",
    category: "Teori Asam Basa",
  },
];

export const glossaryTerms = [
  { term: "Derajat Ionisasi (\u03B1)", definition: "Jumlah bagian dari zat yang mengalami ionisasi, dengan nilai antara 0 dan 1." },
  { term: "Spesi", definition: "Ion atau molekul yang terlibat dalam suatu reaksi kimia." },
  { term: "Valensi Asam", definition: "Jumlah ion H\u207A yang dihasilkan jika 1 molekul asam mengalami ionisasi." },
  { term: "Valensi Basa", definition: "Jumlah ion OH\u207B yang dihasilkan jika 1 molekul basa mengalami ionisasi." },
  { term: "Asam Konjugasi", definition: "Basa yang sudah menerima 1 ion H\u207A." },
  { term: "Basa Konjugasi", definition: "Asam yang sudah melepaskan 1 ion H\u207A." },
  { term: "Trayek pH", definition: "Rentang pH di mana suatu indikator mengalami perubahan warna." },
  { term: "Kw (Tetapan Kesetimbangan Air)", definition: "Hasil kali konsentrasi ion H\u207A dan OH\u207B dalam air. Kw = [H\u207A][OH\u207B] = 10\u207B\u00B9\u2074 pada 25\u00B0C." },
  { term: "Ka (Tetapan Ionisasi Asam)", definition: "Tetapan kesetimbangan ionisasi asam lemah dalam air." },
  { term: "Kb (Tetapan Ionisasi Basa)", definition: "Tetapan kesetimbangan ionisasi basa lemah dalam air." },
  { term: "pH", definition: "Derajat keasaman, yaitu logaritma negatif dari konsentrasi ion H\u207A. pH = -log[H\u207A]." },
  { term: "pOH", definition: "Derajat kebasaan, yaitu logaritma negatif dari konsentrasi ion OH\u207B. pOH = -log[OH\u207B]." },
  { term: "Indikator", definition: "Senyawa yang memberikan warna berbeda saat bereaksi dengan asam atau basa." },
  { term: "Donor", definition: "Proses memberikan (proton, elektron, dsb.)." },
  { term: "Akseptor", definition: "Proses menerima (proton, elektron, dsb.)." },
  { term: "Titrasi", definition: "Metode penentuan konsentrasi larutan menggunakan larutan standar." },
  { term: "Kovalen Polar", definition: "Senyawa kovalen yang mempunyai kutub positif dan negatif." },
  { term: "Pelarut Universal", definition: "Pelarut yang umum digunakan, yaitu air." },
  { term: "Ekstrak", definition: "Sari dari suatu bahan alami yang diperoleh melalui proses pengekstrakan." },
];

export const indicatorData = [
  { name: "Metil Jingga (MO)", acidColor: "#ef4444", acidLabel: "Merah", neutralColor: "#f97316", neutralLabel: "Jingga", baseColor: "#eab308", baseLabel: "Kuning", trayekMin: 3.1, trayekMax: 4.4 },
  { name: "Metil Merah (MM)", acidColor: "#ef4444", acidLabel: "Merah", neutralColor: "#f97316", neutralLabel: "Jingga", baseColor: "#eab308", baseLabel: "Kuning", trayekMin: 4.4, trayekMax: 6.2 },
  { name: "Bromtimol Biru (BTB)", acidColor: "#eab308", acidLabel: "Kuning", neutralColor: "#22c55e", neutralLabel: "Hijau", baseColor: "#3b82f6", baseLabel: "Biru", trayekMin: 6.0, trayekMax: 7.6 },
  { name: "Fenolftalein (PP)", acidColor: "transparent", acidLabel: "Tak Berwarna", neutralColor: "transparent", neutralLabel: "Tak Berwarna", baseColor: "#ec4899", baseLabel: "Merah Muda", trayekMin: 8.3, trayekMax: 10.0 },
  { name: "Lakmus Merah", acidColor: "#ef4444", acidLabel: "Merah", neutralColor: "#ef4444", neutralLabel: "Merah", baseColor: "#3b82f6", baseLabel: "Biru", trayekMin: 4.5, trayekMax: 8.3 },
  { name: "Lakmus Biru", acidColor: "#ef4444", acidLabel: "Merah", neutralColor: "#3b82f6", neutralLabel: "Biru", baseColor: "#3b82f6", baseLabel: "Biru", trayekMin: 4.5, trayekMax: 8.3 },
];

export const naturalIndicators = [
  { name: "Kol Ungu", acidColor: "#ec4899", acidLabel: "Merah/Pink", neutralColor: "#a855f7", neutralLabel: "Ungu", baseColor: "#22c55e", baseLabel: "Hijau/Kuning" },
  { name: "Kunyit", acidColor: "#eab308", acidLabel: "Kuning", neutralColor: "#eab308", neutralLabel: "Kuning", baseColor: "#dc2626", baseLabel: "Merah Kecoklatan" },
  { name: "Bunga Sepatu", acidColor: "#ef4444", acidLabel: "Merah", neutralColor: "#ef4444", neutralLabel: "Merah", baseColor: "#22c55e", baseLabel: "Hijau" },
  { name: "Kulit Manggis", acidColor: "#ef4444", acidLabel: "Merah", neutralColor: "#a855f7", neutralLabel: "Ungu", baseColor: "#84cc16", baseLabel: "Kuning Kehijauan" },
];
