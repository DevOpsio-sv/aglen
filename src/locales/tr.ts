import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const tr: PageCopy = {
  nav: { home: "Ana sayfa", about: "Aglen Hakkında", landmarks: "Yerler", stay: "Konaklama", quests: "AR görevleri", events: "Etkinlikler", business: "Yerel işletmeler" },
  ui: { languageLabel: "Dil", languageSelectAria: "Dil seçimi", modalCloseAria: "Kapat", mobileMenuAria: "Menü" },
  brand: { name: "Aglen", subtitle: "Vit Nehri kıyısındaki köy" },
  hero: {
    meta: "Kuzey Bulgaristan · Vit Nehri · Lukovit · Karlukovo",
    title: "AGLEN",
    subtitle: "Vit Nehri'nin gizli hazinesi",
    lede: "Kuzey Bulgaristan'ın kalbinde kanyonları, mağaraları, nehir havuzlarını ve etkileyici doğa olaylarını keşfet. Aglen; yürüyüş, fotoğrafçılık, balıkçılık ve doğa içinde sakin bir hafta sonu için ideal bir destinasyondur.",
    primary: "Aglen'i keşfet",
    secondary: "Uygulamayı indir",
    cue: "Vadiyi keşfet",
    imageAlt: "Aglen'den esinlenen nehir kanyonu ve köy manzarasına sinematik bakış",
  },
  statsLabel: "Aglen'i neden ziyaret etmeli",
  about: {
    eyebrow: "Tarih ve yerel hafıza",
    title: "Aglen kayalarının sırları",
    text: "Aglen yakınındaki Lukovit karstının kireçtaşı kütlelerinin ve onlarca mağarasının ardında, binlerce yıllık jeolojik dönüşümleri, Trak kült uygulamalarını ve Bulgar Ulusal Uyanışı dönemi kayıtlarını kesen bir tarih gizlidir. Aşağıdaki katmanları keşfet.",
  },
  legends: {
    eyebrow: "Aglen efsaneleri ve gizemleri",
    title: "Aglen çevresindeki kanyonlar, mağaralar ve eski patikalar arasında her yer kendi hikayesini taşır.",
    text: "Buradaki en güçlü hikayeler gürültülü değildir. Yerel adlarda, mağara eşiklerinde, tuhaf kaya şekillerinde ve nehrin kıvrımlarında yaşarlar.",
  },
  landmarks: {
    eyebrow: "Keşfedilecek yerler",
    title: "Aglen çevresindeki en güzel yerler",
    text: "Etkileyici kaya oluşumlarından ve nehir havuzlarından panoramik manzaralara ve tarihi yerlere kadar – burada doğa ve yerel efsaneler her yürüyüşü küçük bir keşfe dönüştürür.",
    aria: "Aglen çevresindeki rota durakları",
  },
  experiences: {
    eyebrow: "Deneyimler",
    title: "Aglen'i kendi tarzınla yaşa",
    text: "Bir yürüyüş, fotoğraf macerası, balıkçılık ya da doğa içinde bir hafta sonu seç ve bölgenin en iyisini keşfet.",
    cta: "Rotayı sor",
  },
  gallery: { eyebrow: "Doğa galerisi", title: "Nehir ışığı ve taşla anlatılan bir yer", aria: "Aglen galerisi" },
  stay: {
    eyebrow: "Aglen'de konaklama",
    title: "Doğanın içinde kal",
    text: "Konaklamak için sakin bir yer seç ve Aglen'i bölgenin doğal zenginliklerini keşfetmek için bir başlangıç noktası olarak kullan.",
  },
  quests: {
    eyebrow: "Bulgaristan'da türünün ilki",
    title: "Aglen yakınında gerçek bir AR macerası",
    text: "Unlocking Bulgaria sizi gerçek yerlere götürür - telefonunuzla gizli bir 3D dünya görür, bilmeceler çözer ve Koruyucu'nun izlerini takip edersiniz. Simülasyon değil. Müze değil. Gerçek bir canlı macera.",
    cta: "İndir ve başla",
    features: [
      { id: "ar", title: "Artırılmış Gerçeklik (AR)", text: "Bu yerlerde ne gizli? Kamerayı doğrult ve gizli dünyanın gözlerinin önünde canlandığını gör." },
      { id: "gps", title: "Canlı GPS görevleri", text: "Hangi yer bir sonraki ipucunu saklıyor? GPS görevini takip ederek Aglen çevresindeki gerçek noktalara ulaş." },
      { id: "story", title: "Tarih farklı anlatılır", text: "Koruyucu kim? Eski işaretler neyi koruyor? Prohodna Mağarası'nın efsanelerini bir oyun aracılığıyla keşfet." },
    ],
  },
  ar: {
    eyebrow: "AR macerası",
    title: "Koruyucu'nun dünyasına bak",
    text: "Telefonunuzun kamerasıyla Prohodna'nın gizli dünyasını canlandırın. AR katmanı çıplak gözle görünmeyen hikayeleri, işaretleri ve karakterleri, yalnızca gerçekleştiği yerlerde gösterir.",
    steps: [
      "Uygulamayı indir",
      "Aglen çevresindeki işaretli bir AR yerine git",
      "Kamerayı doğrult ve gizli dünyayı gör",
    ],
    cta: "İndir ve başla",
  },
  app: {
    eyebrow: "Uygulamayı indir",
    title: "Unlocking Bulgaria",
    text: "Android için mobil uygulama. Aglen çevresindeki görevleri bul ve gerçek bir maceraya çık.",
    badge: "Unlocking Bulgaria'yı aç",
    note: "Uygulamanın resmi sitesi unlockingbulgaria.com/bg/.",
  },
  contact: {
    eyebrow: "Ziyareti planla",
    title: "Ziyaretini planla",
    text: "Rotalar, görülecek yerler, fotoğraf noktaları, balıkçılık, konaklama ve Vit Nehri kıyısında unutulmaz bir hafta sonu için fikirler hakkında bilgi almak üzere bizimle iletişime geç.",
    notesTitle: "Ziyaretçi notları",
    noteOne: "Ekoturizm, fotoğrafçılık, balıkçılık, yürüyüş rotaları, mağara ziyaretleri ve Kuzey Bulgaristan'da bir hafta sonu için uygundur; fotoğrafçılık, nehir manzaraları, mağaralar ve yerel hafıza.",
    noteTwo: "Rahat ayakkabı, su, güneş koruması ve yerel alanlara saygı getir.",
    cta: "Talep gönder",
  },
  events: {
    eyebrow: "Takvim",
    title: "Aglen'deki Etkinlikler",
    text: "Aglen'de ve Vit Nehri boyunca festivaller, köy buluşmaları, açık hava sanat etkinlikleri ve mevsimsel etkinlikler. Yaklaşan tarihler için buraya göz at.",
    emptyState: "Yaklaşan etkinlikler çok yakında. Aglen'de bir etkinlik düzenliyorsanız veya biliyorsanız, bizimle paylaşın.",
    dateLabel: "Ne zaman",
    locationLabel: "Nerede",
    submitTitle: "Aglen'den bir fotoğrafın veya haberin mi var?",
    submitText: "Bize bir fotoğraf veya etkinlik bilgisi gönder. Yayınlamadan önce her gönderiyi inceliyoruz.",
    submitCta: "Fotoğraf / bilgi paylaş",
  },
  hub: {
    eyebrow: "Seyahat rehberi merkezi",
    title: "Aglen'i ilgi alanı, güzergah ve yakın yere göre planla",
    text: "Özel rehber sayfaları, destinasyonun ana hikayesini ziyaretçi niyetiyle bağlar: turistik yerler, yürüyüş, balıkçılık, mağaralar, Vit Nehri, konaklama, yiyecek, mevsimsel güncellemeler ve yakın destinasyonlar.",
  },
  guides: {
    vitRiver: { label: "Vit Nehri rehberi", text: "Vit Nehri, sayısız küçük patikasıyla yürüyüş, fotoğrafçılık, balıkçılık ve doğa içinde dinlenme için binlerce yer sunan bölgenin kalbidir." },
    fishing: { label: "Vit kıyısında balıkçılık", text: "Vit Nehri, Kuzey Bulgaristan doğasında balıkçılık için güzel ve sakin yerler sunar." },
    hiking: { label: "Yürüyüş güzergahları", text: "Doğa yürüyüşü patikaları ve güzergahlar, ziyaretçileri Aglen çevresindeki en güzel doğal yerlere götürür." },
    caves: { label: "Mağaralar ve kaya şekilleri", text: "Aglen ve Karlukovo çevresindeki bölge, mağaralarıyla ve etkileyici kireçtaşı oluşumlarıyla ünlüdür." },
    food: { label: "Yiyecek ve yerel ürünler", text: "Lukovit bölgesine özgü ev yapımı ürünleri ve geleneksel lezzetleri tat." },
    nearby: { label: "Yakın destinasyonlar", text: "Aglen ziyaretini Prohodna, Karlukovo, Iskar–Panega, Lukovit ve bölgedeki diğer görülecek yerlerle birleştir." },
    seasonal: { label: "Mevsimsel rehber", text: "Güzergahlar, fotoğrafçılık, hava durumu ve sakin hafta sonu planlaması için aylık güncellemeler." },
  },
  highlights: [
    { label: "Gizli Bulgaristan", value: "Otantik deneyim", detail: "Kitle turizminden uzak olan Aglen; huzur, güzel doğa ve gerçek bir Bulgar köyü hissi sunar." },
    { label: "Doğa", value: "Kanyonlar, mağaralar ve nehir", detail: "Köy çevresindeki bölge; kireçtaşı kayaları, mağaraları, nehir havuzları ve Kuzey Bulgaristan'ın en güzel doğal manzaralarından bazılarıyla etkiler." },
    { label: "Kimlik", value: "Tek „Ъ“", detail: "Aglen, adı „Ъ“ harfiyle başlayan Bulgaristan'daki tek yerleşim yeridir." },
  ],
  timeline: [
    {
      title: "Kayalar ve mağaralar diyarı",
      detail: "Aglen çevresindeki kireçtaşı kayaları ve mağaraları, Lukovit ve Vit Nehri bölgesinin en etkileyici doğal manzaralarından birini oluşturur.",
      intro:
        "Aglen köyü çevresindeki Vit Nehri havzası, Osmanlı zulümleri ve kaya köprüleri hakkındaki standart turistik efsanelerden çok daha fazlasını saklar. Lukovit karst bölgesinin bu kesimindeki kireçtaşı kütlelerinin ve onlarca mağaranın ardında, binlerce yıllık jeolojik dönüşümleri, Trak kült uygulamalarını ve ortaçağ manevi izolasyonizmini kesen bir tarih gizlidir.",
      sections: [
        {
          heading: "1. Jeolojik anomali: Buradaki kayalar neden benzersiz?",
          body: [
            "Lukovit bölgesindeki karst üzerine yapılan jeolojik araştırmalar, Aglen çevresindeki kayaların yalnızca sıradan kireçtaşları olmadığını, sözde Lom ve Nisan katmanlarına (çoğunlukla Alt Kretase'den) ait olduğunu gösterir.",
            "Yeraltı su labirenti: Vit Nehri bu kesimde özgün menderesler yapar, çünkü milyonlarca yıl önce tektonik fayları izlemiştir. Nehrin bugünkü yatağının ve kaya kütlelerinin altında, mağara bilimciler tarafından hâlâ tamamen haritalanmamış bir yeraltı sifonları ve „kuru“ galeriler ağı bulunur.",
            "Kanyonun mikro iklimi: Yer yer 100 metreye ulaşan dikey kayalar, özgün bir termokarst mikro iklimi yaratır. Derin kanyon ve mağara kaynakları nedeniyle, Vit kıyısındaki alçak kesimin sıcaklıkları bazen platodakilerden birkaç derece farklıdır; bu da relikt bitki örtüsünün ve XX. yüzyılın başında botanikçiler tarafından incelenen özgün karst biyosenozlarının korunmasını sağlamıştır.",
          ],
        },
        {
          heading: "2. Tarih öncesi ve Trakların izleri",
          body: [
            "Yaygın anlatılar Osmanlı egemenliği dönemine odaklansa da (Selişte mevkiindeki trajedi ve Vılovata dupka / Ochilatata mağarası gibi), Aglen çevresindeki mağaralardaki arkeolojik izler çok daha derin bir kadimliğe işaret eder:",
            "Kaya kemerlerinin bölgesinde ve mağaraların çevresinde, tarih öncesi seramiğe ait ayrı parçalar (çoğunlukla Kalkolitik ve Erken Tunç Çağı'ndan) bulunmuştur; bunlar mağaraların 4-5 bin yıldan uzun bir süre önce avcılar ve ilk çobanlar için geçici sığınaklar olarak hizmet ettiğini gösterir.",
            "Komşu Karlukovo-Iskar bölgesinde olduğu gibi, burada da erişimi zor kaya terasları Trak kabileleri (Triballer) tarafından suya, kayaya ve yeraltı güçlerine yönelik kültlere bağlı açık hava tapınakları için kullanılmıştır. Bölgedeki karst kaynakları şifalı sayılarak saygı görmüştür.",
          ],
        },
        {
          heading: "3. Köyün etimolojisi ve eski kayıtlardaki adı",
          body: [
            "Aglen adı, Bulgar yer adları biliminde mutlak bir istisnadır – adı „Ъ“ harfiyle başlayan Bulgaristan'daki tek yerleşim yeridir.",
            "XV ve XVI. yüzyıllara ait Osmanlı vergi kayıtlarında (Niğbolu sancağını tanımlayan), adın „glen“ veya „iglen“ kökünden türeyen erken biçimlerine rastlanır (bazı eski rivayetlere göre köy, nehrin üzerindeki sivri kaya iğneleri ve dişleri nedeniyle başlangıçta „Iglen grad golyama“ olarak adlandırılıyordu).",
            "Bulgar Ulusal Uyanışı dönemine ait eski coğrafi notlar, Aglen'i yalnızca küçük bir köy olarak değil, Ön Balkan'ı (Predbalkan) aşan kervan yolu üzerinde stratejik bir nokta olarak tanımlar; burada tüccarlar, haydut saldırılarına karşı korunmak için doğal kaya barınaklarına güveniyordu.",
          ],
        },
        {
          heading: "4. Edebi ve manevi hafıza: Trifon Kunev",
          body: [
            "Aglen'in folklorik ve kültürel hafızasında, önde gelen Bulgar yazar, gazeteci ve köşe yazarı Trifon Kunev'in (1880 doğumlu) burada doğmuş olması özel bir yer tutar.",
            "Anıları ve ilk eserleri, Aglen kayalarının sert ama pitoresk doğasının özgün ruhunu taşır. Bu kireçtaşı devlerinin ve Vit Nehri'nin gölgesinde büyüyen yazar, boyun eğmezlik ve mücadele duygusunu daha sonra simgesel makalelerine ve totaliter rejimlere karşı direnişine taşımış; bu yüzden 1944'ten sonra kamplarda ağır sınavlardan geçmiştir. Onun derin ahlaki omurgası, eserlerini inceleyenler tarafından çoğu zaman doğduğu yerin „demir“ gibi ve erişilmez doğasıyla ilişkilendirilir.",
          ],
        },
      ],
    },
    {
      title: "İnsanlar vadiyi keşfeder",
      detail: "Nehir kıyısındaki elverişli koşullar, kadim zamanlardan beri insanları çeker ve bölgeyi yaşam ve hareket için doğal bir yere dönüştürür.",
    },
    {
      title: "Köy ortaya çıkar",
      detail: "Zamanla nehre, toprağa ve bugün hâlâ Aglen'in karakterinin bir parçası olan geleneklere bağlı bir topluluk oluşur.",
    },
    {
      title: "Hikayeler ve anılar",
      detail: "Yerel efsaneler, gelenekler ve anılar köyün ruhunu canlı tutar ve geçmişle bugün arasında bir bağ kurar.",
    },
    {
      title: "Bugün Aglen",
      detail: "Aglen'in geleceği, otantik kaldığı sürece en güçlüsüdür. Bugün köy; doğa, fotoğrafçılık, balıkçılık ve sakin hafta sonu gezileri tutkunları için tercih edilen bir destinasyondur.",
    },
  ],
  mysteries: [
    { title: "Nehrin götürdüğü yer", tag: "Gizli patikalar", image: images.hero, description: "Vit her şeyi bir anda göstermez. Kıvrımlar, gölgeler ve kayalar yürüyüşü arayışa dönüştürür." },
    { title: "Mağaraların dünyası", tag: "Taş ve sessizlik", image: images.cave, description: "Aglen ve Karlukovo çevresindeki mağaralar, bölgenin en etkileyici doğa olayları arasındadır ve taşa yazılmış milyonlarca yıllık tarihi saklar." },
    { title: "Hikaye anlatan adlar", tag: "Folklor manzarası", image: images.arch, description: "Dupkata, Sloncheto ve Rachkov vir gibi yerler, doğal manzarayı kolayca hatırlanan bir yere dönüştürür." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Kaya kemeri", image: images.caveCard, imageAlt: "Aglen yakınında kireçtaşı manzarasına bakan kaya penceresi", description: "Vit Nehri üzerinde doğal bir kaya kemeri ve Aglen çevresindeki en fotojenik yerlerden biri." },
    { id: "sloncheto", title: "Sloncheto", tag: "Kaya figürü", image: images.hero, imageAlt: "Aglen yakınında kanyon, nehir ve kireçtaşı kayalıkları", description: "Bölgenin sembollerinden birine dönüşmüş ilginç bir kaya şekli." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Kanyon manzarası", image: images.riverSunsetCard, imageAlt: "Aglen yakınında gün batımında Vit Nehri, kayalar ve ağaçlar", description: "Kayalar ve nehir tarafından şekillendirilen kanyon manzarasına etkileyici bir bakış." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Nehir havuzu", image: images.nearbyRetreatCard, imageAlt: "Lukovit ve Aglen yakınında ahşap ev ve kireçtaşı kıyısı olan sakin bir su alanı", description: "Dinlenme, fotoğraf, nehir jakuzisi ve balıkçılık için uygun pitoresk bir nehir havuzu." },
    { id: "st-archangel-michael", title: "Aziz Başmelek Mihail", tag: "Köy hafızası", image: images.church, imageAlt: "Köy kilisesi, taş sokak ve yeşil vadi", description: "Köyün manevi mirasını koruyan tarihi bir mabet; 1888'de, Türk akınlarının kurbanı olan yerel sakinlerin anısına inşa edilmiştir." },
    { id: "kaleto", title: "Kaleto", tag: "Arkeoloji", image: images.kaleto, imageAlt: "Kanyon ve nehrin üzerindeki tepede taş kalıntılar", description: "Bölgenin kadim tarihi ve Vit vadisi boyunca uzanan eski yollarla bağlantılı bir yer." },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "Kanyon yürüyüşü", price: negotiablePrice.tr, duration: "2-3 saat", bestFor: "İlk ziyaret", description: "Kayalar, nehir manzaraları ve Vit kıyısındaki doğal yerler arasında bir rota." },
    { id: "photoTour", title: "Nehir fotoğraf yolculuğu", price: negotiablePrice.tr, duration: "Yarım gün", bestFor: "Fotoğrafçılar", description: "Köy çevresinde peyzaj ve doğa fotoğrafçılığı için en güzel yerler." },
    { id: "fishing", title: "Vit kıyısında balıkçılık", price: negotiablePrice.tr, duration: "2 saat", bestFor: "Yavaş seyahat", description: "Nehir kıyısında sakin yerler ve doğanın en saf halinin tadını çıkarma imkanı." },
    { id: "weekendEscape", title: "Aglen'de hafta sonu kaçamağı", price: negotiablePrice.tr, duration: "2 gün", bestFor: "Çiftler ve arkadaşlar", description: "Doğa, yerel hikayeler ve güzel manzaralar arasında iki gün." },
    { id: "herbs", title: "Otlar ve köy bilgisi", price: negotiablePrice.tr, duration: "90 dk", bestFor: "Meraklı gezginler", description: "Yerel doğanın zenginliğini ve otlarla ilgili geleneksel bilgileri keşfet." },
    { id: "schoolDay", title: "Öğrenciler için keşif günü", price: negotiablePrice.tr, duration: "1 gün", bestFor: "Okul grupları", description: "Doğayı, tarihi ve yerel efsaneleri birleştiren eğitici bir deneyim." },
  ],
  galleryItems: [
    { title: "Vit kanyonu", image: images.hero, alt: "Gün batımında Vit Nehri; kayalar, ağaçlar ve taşlı kıyı", size: "wide" },
    { title: "Taş kemer", image: images.arch, alt: "Nehir üzerinde doğal kireçtaşı kemer", size: "standard" },
    { title: "Mağara ışığı", image: images.cave, alt: "Nehir ve kayalara bakan mağara girişi", size: "tall" },
    { title: "Gizli vadinin üstünde", image: images.aerial, alt: "Nehir, kayalar ve köyün havadan görünümü", size: "wide" },
    { title: "Lukovit yakınında nehir dinlenmesi", image: images.nearbyRetreat, alt: "Lukovit ve Aglen yakınında yüzen ahşap evli sakin su manzarası", size: "standard" },
  ],
  mapStops: [
    { title: "Köyün merkezi", detail: "Yürüyüş, Aglen'in kalbinden başlar – meydan, kilise ve köyün ruhunu koruyan eski evler." },
    { title: "Vit kıyısındaki patika", detail: "Vit Nehri'nin akışını manzaralı kıyılar, gölgeli ağaçlar ve kayalara açılan güzel görüntüler boyunca takip et." },
    { title: "Dupkata", detail: "Aglen'in en simgesel doğal sembollerinden biri – doğanın binlerce yıl boyunca şekillendirdiği etkileyici bir kaya kemeri." },
    { title: "Mağaralar ve kaya olayları", detail: "Karst rölyefinin gizli dünyasını keşfet – mağaralar, kaya oluşumları ve eşsiz atmosferli yerler." },
  ],
  accommodationList: [
    { title: "Misafir odaları", type: "Köy konaklaması", description: "Doğaya ve nehre yakın yerel evde sakin odalar.", image: images.church },
    { title: "Kamp alanı", type: "Kamp", description: "Vit Nehri ve doğal rotalara erişimli açık çadır alanı.", image: images.aerial },
    { title: "Dağ villası", type: "Villa", description: "Kanyon manzaralı, küçük gruplar ve hafta sonu kaçamakları için uygun sakin villa.", image: images.pool },
  ],
  sourceNotes: ["DevOpsio tarafından oluşturuldu - www.devopsio.eu", "Tüm görseller yerel fotoğrafçılara aittir ve izinle kullanılmıştır."],
};
