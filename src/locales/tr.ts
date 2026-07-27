import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const tr: PageCopy = {
  nav: { home: "Ana sayfa", about: "Aglen Hakkında", landmarks: "Yerler", stay: "Konaklama", quests: "AR görevleri", events: "Etkinlikler", business: "Yerel işletmeler", guide: "Rehber", arMissions: "AR görevleri", visit: "Aglen'i ziyaret et", visitGettingHere: "Nasıl gidilir", visitRoutes: "Rotalar", visitChildren: "Çocuklarla", visitMissions: "Unlocking Bulgaria ile AR görevleri", visitWhen: "Ne zaman ziyaret etmeli" },
  ub: {
    homeHeading: "Unlocking Bulgaria ile Aglen'i keşfet",
    homeText: "Aglen çevresindeki gerçek yerlerde AR ve GPS görevleri. Unlocking Bulgaria bağımsız bir ulusal uygulamadır — Aglen onun ilk aktif destinasyonudur.",
    seeMissions: "Aktif görevleri gör",
    externalLabel: "Harici uygulama · unlockingbulgaria.com",
    hubTitle: "Unlocking Bulgaria ile Aglen'de AR görevleri",
    whatText: "Unlocking Bulgaria, Bulgaristan genelinde gerçek yerlerde AR ve GPS görevleri için bağımsız bir ulusal uygulamadır. Aglen onun ilk aktif destinasyonudur — uygulama köy web sitesinin bir parçası değildir ve sitenin mülkiyetinde değildir.",
    missionsHeading: "Aglen çevresinde mevcut görevler",
    needHeading: "Neye ihtiyacın var",
    needItems: ["Kameralı bir akıllı telefon", "Açık GPS", "Unlocking Bulgaria uygulaması"],
  },
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
    eyebrow: "Yolculuğunu planla",
    title: "Aglen'in büyüsünü keşfetmeye hazır mısın?",
    text: "Rotalarla ilgili soruların mı var, en iyi fotoğraf noktalarını mı arıyorsun, yoksa Vit Nehri kıyısında konaklama tavsiyesi mi istiyorsun? Bize yaz — mükemmel hafta sonunu kurmana seve seve yardım ederiz.",
    notesTitle: "Yol için kısa bir ipucu",
    note: "Yöre hafif yürüyüş, balık tutma ve fotoğrafçılık için biçilmiş kaftan. Rahat ayakkabı, su ve güneş koruması almayı unutma!",
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
      title: "🪨 Kayalar ve mağaralar diyarı",
      detail: "Doğanın Lukovit karstını, mağaraları ve Aglen çevresindeki etkileyici kireçtaşı oluşumlarını nasıl yarattığı.",
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
      title: "👣 Vadideki ilk insanlar",
      detail: "Tarih öncesi sakinlerin izleri, Trak varlığı ve Vit Nehri kıyılarındaki yaşam.",
      intro:
        "Nehir vadisindeki ilk insanlar: Aglen çevresindeki tarih öncesi yerleşimin sırları. İnsanı nehir vadilerine neyin çektiğinden söz edilirken yaygın kaynaklar genellikle „verimli toprak“ ve „içme suyu“ gibi genel ifadelerle yetinir. Oysa uzman arkeoloji kayıtlarını, eski müze seferlerinin raporlarını ve 20. yüzyılın başındaki etnografya derlemelerini karıştırdığımızda, Vit'in tam da bu kapalı menderesinin neden kadim sakinler için bir mıknatısa dönüştüğüne dair çok daha derin bir tablo ortaya çıkar.",
      sections: [
        {
          heading: "1. „Nehir koridoru“nun stratejik coğrafyası",
          body: [
            "Kadim çağlarda Vit Nehri yalnızca bir su kaynağı değil, Tuna ovasını Balkan öncesi geçitlere bağlayan hayati bir ulaşım ve iletişim koridoruydu.",
            "Doğal amfitiyatro: Aglen yakınındaki vadi, dik kireçtaşı teraslarıyla çevrili, jeolojik olarak kapalı bir amfitiyatrodur. İklimin daha nemli, orman kütlelerinin geçilmez olduğu çağlarda bu nehir vadileri, insan topluluklarının ve sürülerinin hareketi için tek güvenli yollardı.",
            "Mikroklima vahası: Yüksek kayalarla rüzgârdan korunan ve nehrin sürekli neminden beslenen vadi, küçük bir ekosistem yaratır. Kışın sıcaklıklar burada açık platodakinden daha ılımandı; topraklar ise – Vit boyundaki alüvyon birikintileri – demir sanayisinin ortaya çıkışından çok önce ilk tarım denemelerine olanak tanıdı.",
          ],
        },
        {
          heading: "2. Neolitik ve Kalkolitik dönemin arkeolojik izleri",
          body: [
            "Geçen yüzyılın ortasındaki Bulgar arkeologların unutulmuş çalışmalarında, popüler internet sayfalarına nadiren ulaşan buluntulardan söz edilir.",
            "Para olarak çakmaktaşı: Lukovit bölgesinde nehrin üzerindeki teraslarda, geç Neolitik çakmaktaşı işleme atölyelerinin izleri bulunmuştur. Kadim insanlar, yerel kireçtaşlarındaki yüksek kaliteli çakmaktaşı yumrularını kullanarak bıçak ağızları, bıçaklar ve ok uçları yapıyordu. Bu da bölgeyi yalnızca bir yaşam yeri değil, erken tarih öncesinin bölgedeki bir sanayi merkezi hâline getiriyordu.",
            "İlk metalürjicilerin kültü: Kalkolitik dönemde vadiyi yalnızca besin değil, hammadde de arayan topluluklar ziyaret etmeye başlar. Cevher oluşumlarıyla Balkan öncesi dağların yakınlığı insanları bu nehir kapılarına çekmiş ve onları taştan ilk bakır çıkarımına geçişin tanığı yapmıştır.",
          ],
        },
        {
          heading: "3. „Kayalardaki ilk insanlar“ hakkındaki yerel efsaneler",
          body: [
            "Aglen'de 20. yüzyılın 20'li ve 30'lu yıllarında öğretmenler ve yöre araştırmacıları tarafından derlenen ve bölge arşivlerinde saklanan folklor notlarında, alışılmış Türk dönemi efsanelerinden ayrılan rivayetler vardır.",
            "Kayalardaki „iki ayaklı gölgeler“ rivayeti: Köyün yaşlıları eskiden çocuklarına, en derin mağaralarda ve kaya saçaklarının altında bir zamanlar „suskun insanlar“ın yaşadığını; dağın ruhları görmesin diye dumanlı ateş yakmadıklarını, nehir midyeleri, yabani sarımsak ve orman hayvanlarının etiyle beslendiklerini anlatırdı. Mit gibi dursa da bu sözlü bellek, mağaraları yalnızca sıcak mevsimde terk eden Paleolitik dönemin erken avcı-toplayıcılarının yaşam biçimini şaşırtıcı bir doğrulukla tarif eder.",
            "„Altın karık“ efsanesi: Bir başka eski yerel inanışa göre, vadiye gelen ilk çiftçiler ilk karıklarını tam nehrin kayanın altında en keskin dönüşü yaptığı yerde açmışlardır. Oradaki toprağın „yeraltı dünyasının beylerince öpüldüğüne“ inanıyorlardı; çünkü kaynaklar doğrudan kayanın derinliklerinden çıkıyor ve büyük kuraklıklarda bile yaşam getiriyordu.",
          ],
        },
        {
          heading: "4. Kabilelerin yolu: Triballer ve Romalılar",
          body: [
            "Vadi Demir Çağı'nda daha kalıcı biçimde iskân edilmeye başlandığında, güçlü Trak kabilesi Triballerin topraklarına dâhil olur.",
            "Arkeolojik veriler, bu yerlerin Balkan içlerindeki Trak dünyası ile Tuna kabileleri arasında bir kavşak olduğunu gösteriyor. Vit Nehri bir yön işareti işlevi görüyordu; vadiye yerleşenler ise bugünkü köyün çevresindeki yüksek teraslarda küçük yardımcı yerleşimler kurdular – kuzeyden ya da güneyden yaklaşan herkesin görülebildiği noktalar.",
            "Romalıların gelişiyle bu doğal koridor, Tuna boyundaki Roma kalelerini Moesia eyaletinin iç kesimlerine bağlayan yolların korunması stratejisine dâhil edildi; yerel halk da yol yapımına ve verimli nehir teraslarının kullanımına katıldı.",
          ],
        },
      ],
    },
    {
      title: "🏡 Aglen'in doğuşu",
      detail: "Köyün nasıl ortaya çıktığı, adının nereden geldiği ve yüzyıllar boyunca nasıl geliştiği.",
      intro:
        "Aglen'in doğuşu: Osmanlı defterlerinin sırları, unutulmuş mahalleler ve eşsiz ad. Halk belleği yerleşimlerin başlangıcını çoğu kez derin kadim çağlarda arar; oysa Aglen'e dair ilk kesin yazılı tanıklıklar başka bir çağdan gelir – Bulgar topraklarının Osmanlı fethinden yüzyıllar sonra düzenlenen vergi defterlerinden.",
      sections: [
        {
          heading: "1. Osmanlı defterleri: ilk yazılı izler (15.-16. yüzyıl)",
          body: [
            "Halk belleği yerleşimlerin başlangıcını çoğu kez derin kadim çağlarda arasa da, Aglen'e ilişkin yazılı tanıklıklar resmî olarak Bulgar topraklarının Osmanlı fethinden sonraki ilk yüzyıllarda belirir.",
            "Niğbolu sancağı: Niğbolu paşalığının 15. ve 16. yüzyıla ait erken Osmanlı vergi defterlerinde (tahrir defterleri) köy, dönemin Türkçe yazılı söyleyişine uyarlanmış çeşitli ses varyantlarıyla anılır – örneğin tımar topraklarının bir parçası olarak ya da merkezî otoriteye vergi borçlu küçük bir yerleşim olarak.",
            "Nüfus ve geçim: Defterler, bölge Vit Nehri'ne ve Tuna'ya giden yollara yakınlığı nedeniyle stratejik risklere açık olsa da buradaki hayatın sönmediğini gösteriyor. Yerel halk vergilerini çoğunlukla ayni ödüyordu – buğday, sonraları mısır, küçükbaş hayvan ve bal – ve kayaların ardına gizlenmiş korunaklı vadilerden yararlanıyordu; bu vadiler onları büyük yağmalardan korumuştu.",
          ],
        },
        {
          heading: "2. Adın bilmecesi: „Ъглен“ nereden geliyor?",
          body: [
            "Köyün adı bütün Bulgaristan ölçeğinde dilbilimsel bir olgudur – „Ъ“ harfiyle başlayan tek yerleşim. Bilim çevrelerinde ve eski etnografya notlarında kökeni hakkında birkaç kuram bulunur.",
            "Kömür kuramı (zanaatkâr yorumu): Daha pragmatik tarihsel araştırmalara göre Vit kanyonu çevresi bir zamanlar gür ormanlarla kaplıydı ve yerel halk yoğun biçimde kömürcülükle – geçmişte demircilik ve maden eritmek için vazgeçilmez olan odun kömürünün üretimiyle – uğraşıyordu. Bu birikim ve kömür ocakları yerleşime adını vermiştir.",
            "„İğne kayalar“ efsanesi: Eski yerel rivayetler, adın coğrafi kökenine dair yorumu inatla korur. Nehrin üzerinde keskin, dik kireçtaşı dişleri ve kaya iğneleri yükseldiğinden ilk yerleşenler buraya „Иглен“ (iğnelerin çevresindeki yer) demiş; bu ad zamanla ve ağız söyleyişiyle bugünkü tınılı ve eşsiz Ъглен'e dönüşmüştür.",
          ],
        },
        {
          heading: "3. Yerel mahalleler ve köyün zaman içinde yer değiştirmesi",
          body: [
            "Pek çok başka Bulgar köyü gibi Aglen de her zaman tam olarak bugünkü yerinde bulunmuyordu.",
            "Eski yerleşimler (yurtluklar): Köyün arazisinde, eski coğrafya notlarında „Селището“ (Yerleşim) ya da „Старо село“ (Eski Köy) adlarıyla geçen mevkiler vardır. Oradaki arkeolojik izler, önceki yüzyıllarda insanların mağaralara ve kaya kütlelerine daha yakın yaşadığını gösteriyor; kırcalı baskınları ve Osmanlı yönetiminin kanunsuz döneminde oralarda güvenlik daha fazlaydı.",
            "Uyanış Çağı'nda toparlanma: 19. yüzyılın daha sakin on yıllarıyla birlikte köy, tarım ve yaşam koşullarının daha iyi olduğu nehir boyundaki geniş teraslara doğru inmeye başlar. Aglen'in bugünkü görünümü de o zaman biçimlenir; Uyanış Çağı mimarisinin ruhunu, eski soy köklerini ve Bulgaristan'a yazar Trifon Kunev gibi kayda değer kişiler kazandıran halkının mücadeleci karakterini koruyarak.",
          ],
        },
      ],
    },
    {
      title: "📜 Efsaneler ve yerel bellek",
      detail: "Kuşaktan kuşağa aktarılan hikâyeler – anılar, rivayetler ve az bilinen yerel anlatılar.",
    },
    {
      title: "🌿 Bugün Aglen",
      detail: "Köyün geleceğe bakarken tarihini, doğasını ve ruhunu nasıl koruduğu.",
    },
  ],
  mysteries: [
    { title: "Nehrin götürdüğü yer", tag: "Gizli patikalar", image: images.hero, description: "Vit her şeyi bir anda göstermez. Kıvrımlar, gölgeler ve kayalar yürüyüşü arayışa dönüştürür." },
    { title: "Mağaraların dünyası", tag: "Taş ve sessizlik", image: images.cave, description: "Aglen ve Karlukovo çevresindeki mağaralar, bölgenin en etkileyici doğa olayları arasındadır ve taşa yazılmış milyonlarca yıllık tarihi saklar." },
    { title: "Hikaye anlatan adlar", tag: "Folklor manzarası", image: images.arch, description: "Dupkata, Sloncheto ve Rachkov vir gibi yerler, doğal manzarayı kolayca hatırlanan bir yere dönüştürür." },
  ],
  placesList: [
    { id: "dupkata", title: "Dupkata", tag: "Kaya kemeri", image: images.arch, imageAlt: "Aglen yakınlarında Vit Nehri üzerindeki doğal kaya kemeri", description: "Vit Nehri üzerinde doğal bir kaya kemeri ve Aglen çevresindeki en fotojenik yerlerden biri." },
    { id: "sloncheto", title: "Sloncheto", tag: "Kaya figürü", image: images.caveCard, imageAlt: "Aglen yakınında kireçtaşı manzarasına bakan kaya penceresi", description: "Bölgenin sembollerinden birine dönüşmüş ilginç bir kaya şekli." },
    { id: "chervena-stena", title: "Chervena stena", tag: "Kanyon manzarası", image: images.hero, imageAlt: "Aglen yakınında kanyon, nehir ve kireçtaşı kayalıkları", description: "Kayalar ve nehir tarafından şekillendirilen kanyon manzarasına etkileyici bir bakış." },
    { id: "rachkov-vir", title: "Rachkov vir", tag: "Nehir havuzu", image: images.pool, imageAlt: "Aglen yakınlarında kireçtaşı kayalıkların altındaki berrak nehir havuzu", description: "Dinlenme, fotoğraf, nehir jakuzisi ve balıkçılık için uygun pitoresk bir nehir havuzu." },
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
  sourceNotes: ["DevOpsio tarafından oluşturuldu - devopsio.co", "Tüm görseller yerel fotoğrafçılara aittir ve izinle kullanılmıştır."],
};
