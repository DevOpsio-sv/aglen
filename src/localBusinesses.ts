import type { BusinessCategory, LanguageCode, LocalBusiness, LocalizedText } from "./locales/types";

// Public Google Form through which a business owner submits a listing.
// Submissions are NEVER published automatically — an administrator reviews each
// one and adds it to `businessData` below. Leave empty to fall back to the
// email/phone contact block in the "add your business" section.
export const ADD_BUSINESS_FORM_URL = "";

// Contact shown when no submission form is configured.
export const ADD_BUSINESS_EMAIL = "aglen@lukovit.bg";
export const ADD_BUSINESS_PHONE = "0899 136110";

// ─────────────────────────────────────────────────────────────
// The businesses of Aglen. This file is the single source of truth: there is no
// CMS and no database. To publish a listing, add an object here with
// `status: "published"` and commit — the build regenerates the listing page, the
// detail page and the sitemaps.
//
// Rules that the page relies on:
//   • only `status: "published"` entries are ever rendered;
//   • `verified: true` is set ONLY after an administrator has checked the listing;
//   • omit any field you do not have — cards and detail pages hide missing data
//     rather than showing placeholders;
//   • never add contact details the business has not agreed to publish.
//
// Template — copy, fill in, delete the fields you do not have:
//
// {
//   id: "melarnika-aglen",
//   slug: "melarnika-aglen",
//   name: "Пчеларник „Ъглен“",
//   category: "producers",
//   shortDescription: { bg: "Пчелен мед от липа и слънчоглед.", en: "Linden and sunflower honey." },
//   description: { bg: "…", en: "…" },
//   coverImage: "/assets/local-businesses/melarnika-cover.jpg",
//   coverImageAlt: { bg: "…", en: "…" },
//   phone: "+359 …",
//   address: "ул. …, с. Ъглен",
//   latitude: 43.19, longitude: 24.13,
//   openingHours: { 1: [{ open: "09:00", close: "17:00" }], 6: [{ open: "09:00", close: "13:00" }] },
//   products: [{ bg: "Липов мед", en: "Linden honey" }],
//   delivery: true, pickup: true, seasonal: false,
//   status: "published", verified: false, featured: false,
//   lastUpdated: "2026-07-24",
// }
// ─────────────────────────────────────────────────────────────
const businessData: LocalBusiness[] = [
  {
    // Category, products and images come from the photos supplied by the site
    // owner; the Facebook link is the profile they pointed to. Still to confirm
    // with the owner: the trading name shown here, plus phone, address, opening
    // hours and whether delivery/pickup is offered — none of which are guessed.
    id: "chervenokosata-eli",
    slug: "chervenokosata-eli",
    name: "Червенокосата Ели",
    category: "crafts",
    shortDescription: {
      bg: "Ръчно плетени на една кука чанти и аксесоари.",
      en: "Hand-crocheted bags and accessories.",
    },
    description: {
      bg: "Чанти и аксесоари, изплетени на една кука — всяко изделие е ръчна изработка в единичен екземпляр. Моделите се сменят според сезона и наличната прежда.",
      en: "Bags and accessories made by hand with a crochet hook — every piece is a one-off. The range changes with the season and the yarn at hand.",
    },
    coverImage: "/assets/local-businesses/chervenokosata-eli-cover.jpg",
    coverImageAlt: {
      bg: "Изложени ръчно плетени на една кука чанти и обеци върху дървени рафтове",
      en: "Hand-crocheted bags and earrings displayed on wooden shelves",
    },
    gallery: [
      {
        src: "/assets/local-businesses/chervenokosata-eli-green-bamboo-bag.jpg",
        alt: {
          bg: "Ръчно плетена на една кука зелена чанта с бамбукови дръжки",
          en: "Hand-crocheted green bag with bamboo handles",
        },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-blue-tote.jpg",
        alt: { bg: "Плетени чанти в сини и светлосини нюанси", en: "Crocheted bags in blue and pale blue" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-beige-bow-bag.jpg",
        alt: { bg: "Бежова плетена чанта с панделка", en: "Beige crocheted bag with a bow" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-black-shoulder-bag.jpg",
        alt: { bg: "Черна плетена чанта за рамо с плетено цвете", en: "Black crocheted shoulder bag with a crocheted flower" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-white-bucket-bag.jpg",
        alt: { bg: "Бяла плетена чанта тип торба с връзки", en: "White crocheted bucket bag with drawstrings" },
      },
      {
        src: "/assets/local-businesses/chervenokosata-eli-flower-earrings.jpg",
        alt: { bg: "Плетени обеци във формата на цвете", en: "Crocheted flower-shaped earrings" },
      },
    ],
    socialLinks: { facebook: "https://www.facebook.com/chervenokosataeli" },
    phone: "0897 911341",
    address: "с. Ъглен",
    products: [
      { bg: "Плетени чанти за рамо", en: "Crocheted shoulder bags" },
      { bg: "Плетени чанти тип торба", en: "Crocheted bucket bags" },
      { bg: "Плетени чанти с бамбукови дръжки", en: "Crocheted bags with bamboo handles" },
      { bg: "Плетени обеци", en: "Crocheted earrings" },
    ],
    status: "published",
    verified: false,
    featured: true,
    displayOrder: 30,
    lastUpdated: "2026-07-24",
  },
  {
    // Address, phone and facilities cross-checked against opoznai.bg and other
    // public listings for the complex. Not yet confirmed with the owner, so
    // `verified` stays false. Photos and opening hours still to come.
    id: "hotel-iglen",
    slug: "hotelski-kompleks-iglen",
    name: "Хотелски комплекс „Иглен“",
    category: "stay",
    shortDescription: {
      bg: "Хотелски комплекс с ресторант, външен бар и басейн в центъра на Ъглен.",
      en: "Hotel complex with a restaurant, outdoor bar and pool in the centre of Aglen.",
    },
    description: {
      bg: "Комплексът разполага с два апартамента и седем стаи, ресторант, външен бар, открит басейн и детски басейн, лятна градина и тераса. На място има и хранителен магазин, интернет и паркинг.",
      en: "The complex has two apartments and seven rooms, a restaurant, an outdoor bar, an open-air pool and a children's pool, a summer garden and a terrace. There is also a food shop, internet and parking on site.",
    },
    coverImage: "/assets/local-businesses/hotel-iglen-cover.webp",
    coverImageAlt: {
      bg: "Откритият басейн на комплекса с шезлонги, беседки и ресторанта отзад",
      en: "The complex's outdoor pool with sun loungers, gazebos and the restaurant behind",
    },
    phone: "0882 299 172",
    address: "ул. Освобождение 19, с. Ъглен",
    services: [
      { bg: "Нощувки в стаи и апартаменти", en: "Rooms and apartments" },
      { bg: "Ресторант", en: "Restaurant" },
      { bg: "Външен бар", en: "Outdoor bar" },
      { bg: "Открит басейн и детски басейн", en: "Outdoor pool and children's pool" },
      { bg: "Лятна градина и тераса", en: "Summer garden and terrace" },
      { bg: "Хранителен магазин", en: "Food shop" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: true,
    displayOrder: 90, // near the end
    lastUpdated: "2026-07-24",
  },
  {
    // Services, prices and contacts come from the company's own site,
    // finishart.bg. The site lists a Sofia address, but the site owner confirmed
    // the business operates out of Ъглен, so the village is what is shown here.
    id: "finishart",
    slug: "finishart",
    name: "Финиш Арт",
    category: "services",
    shortDescription: {
      bg: "Боядисване и шпакловка на жилища, с гаранция до 24 месеца.",
      en: "Painting and plastering for homes, with a warranty of up to 24 months.",
    },
    description: {
      bg: "Фирмата работи от 2018 г. и предлага боядисване, шпакловка и основен ремонт на жилища. Цените са от 8 до 22 евро на кв. м според състоянието на стените, с гаранция до 24 месеца.",
      en: "Working since 2018, the company offers painting, plastering and basic home renovation. Prices run from 8 to 22 euro per square metre depending on the condition of the walls, with a warranty of up to 24 months.",
    },
    coverImage: "/assets/local-businesses/finish-art-cover.jpg",
    coverImageAlt: {
      bg: "Четки, валяк, кофи с боя и цветова палитра до прозорец в стая при ремонт",
      en: "Brushes, a roller, paint tubs and a colour fan by a window in a room being renovated",
    },
    phone: "0882 820025",
    email: "alex.finishart@gmail.com",
    website: "https://www.finishart.bg/",
    socialLinks: { facebook: "https://www.facebook.com/profile.php?id=61577536868457" },
    address: "с. Ъглен",
    services: [
      { bg: "Боядисване на жилища", en: "House painting" },
      { bg: "Шпакловка", en: "Plastering" },
      { bg: "Основен ремонт", en: "Basic renovation" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 20,
    lastUpdated: "2026-07-24",
  },
  {
    // A content creator rather than a shop or a service, so no products,
    // services, address or opening hours are listed. The description states only
    // what is publicly verifiable from the Facebook page and the YouTube channel.
    id: "scotsman-in-bulgaria",
    slug: "scotsman-in-bulgaria",
    name: "Scotsman in Bulgaria",
    category: "other",
    shortDescription: {
      bg: "Шотландец, който снима видеа за живота в българското село и за района.",
      en: "A Scotsman filming everyday life in a Bulgarian village and the region around it.",
    },
    description: {
      bg: "Преместил се от Единбург преди няколко години, той живее в село в Ловешка област и разказва във видеата си за ежедневието на село, за хората и за красотата на района. Публикува във Facebook и в YouTube.",
      en: "Having moved from Edinburgh a few years ago, he lives in a village in Lovech province and films everyday village life, the people and the beauty of the region. He posts on Facebook and YouTube.",
    },
    coverImage: "/assets/local-businesses/scotsman-in-bulgaria-cover.jpg",
    coverImageAlt: {
      bg: "Банер на канала „Scotsman In Bulgaria“ с градина, овощни дървета и оранжерия",
      en: "Banner of the “Scotsman In Bulgaria” channel showing a garden, fruit trees and a greenhouse",
    },
    website: "https://www.youtube.com/@ScotsmanInBulgaria",
    socialLinks: { facebook: "https://www.facebook.com/profile.php?id=100087489799107" },
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 80,
    lastUpdated: "2026-07-24",
  },
  {
    // From the company's own site, iglen.eu. They publish a phone number but no
    // address or working hours, so none are listed here.
    id: "mesokombinat-iglen",
    slug: "mesokombinat-iglen",
    name: "Месокомбинат „Иглен“",
    category: "producers",
    shortDescription: {
      bg: "Месни продукти, маринати и мляно месо от местен месокомбинат.",
      en: "Meat products, marinades and minced meat from a local meat processing plant.",
    },
    description: {
      bg: "Месокомбинатът работи от март 2013 г. и произвежда продукти от пилешко, свинско и телешко месо, както и маринати и разфасовки от мляно месо. Рецептите са разработени от европейски хранителни технолози.",
      en: "Operating since March 2013, the plant produces chicken, pork and beef products, as well as marinades and minced-meat preparations. The recipes were developed by European food technologists.",
    },
    coverImage: "/assets/local-businesses/mesokombinat-iglen-cover.jpg",
    coverImageAlt: {
      bg: "Производствената сграда на месокомбината с цветна леха и паркинг отпред",
      en: "The meat plant's production building with a flower bed and parking in front",
    },
    phone: "0884 558 223",
    website: "https://iglen.eu/",
    products: [
      { bg: "Продукти от пилешко месо", en: "Chicken products" },
      { bg: "Продукти от свинско месо", en: "Pork products" },
      { bg: "Продукти от телешко месо", en: "Beef products" },
      { bg: "Маринати", en: "Marinades" },
      { bg: "Мляно месо", en: "Minced meat" },
    ],
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 190, // always last
    lastUpdated: "2026-07-24",
  },
  {
    // Text and contact supplied by the site owner.
    id: "vodach-aglen",
    slug: "vodach-aglen",
    name: "Разходки с водач – Трифон Трифонов (Тиката)",
    category: "services",
    shortDescription: {
      bg: "Индивидуални и групови разходки до природните забележителности край Ъглен, с местен водач.",
      en: "Individual and group walks to the natural landmarks around Aglen, with a local guide.",
    },
    description: {
      bg: "Опознайте Ъглен по най-добрия начин – с човек, който познава всяка пътека, скала и история. Предлагаме индивидуални и групови разходки до най-красивите природни забележителности около селото, включително скални образувания, пещери, панорамни гледки и малко познати места, които трудно бихте открили сами. Маршрутите се съобразяват с вашето време, интереси и физическа подготовка, а по време на разходката ще научите любопитни истории за природата, местните легенди и богатото минало на района. Поради работна заетост, моля обаждайте се за резервации след 22:00 ч.",
      en: "Get to know Aglen the best way there is — with someone who knows every path, rock and story. Individual and group walks are offered to the most beautiful natural landmarks around the village, including rock formations, caves, panoramic viewpoints and little-known places that are hard to find on your own. Routes are adapted to your time, interests and fitness, and along the way you will hear curious stories about the nature, the local legends and the rich past of the area. Because of work commitments, please call to book after 22:00.",
    },
    coverImage: "/assets/local-businesses/vodach-aglen-cover.jpg",
    coverImageAlt: {
      bg: "Маркирана пътека край варовикова скала с гледка към зелен каньон",
      en: "A waymarked path by a limestone rock with a view over a green gorge",
    },
    phone: "069/822 563",
    address: "с. Ъглен",
    services: [
      { bg: "Индивидуални разходки с водач", en: "Individual guided walks" },
      { bg: "Групови разходки с водач", en: "Group guided walks" },
      { bg: "Маршрути до скални образувания и пещери", en: "Routes to rock formations and caves" },
      { bg: "Панорамни гледки и малко познати места", en: "Panoramic viewpoints and little-known places" },
      { bg: "Маршрути, съобразени с времето и подготовката ви", en: "Routes adapted to your time and fitness" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 180, // second to last, ahead of the meat plant
    lastUpdated: "2026-07-24",
  },
  {
    // Text and contact supplied by the site owner.
    id: "bager-uslugi",
    slug: "uslugi-s-bager",
    name: "Услуги с малък багер",
    category: "services",
    shortDescription: {
      bg: "Изкопи, почистване на терени и земни работи с малък багер в Ъглен и района.",
      en: "Excavation, site clearing and earthworks with a mini excavator in Aglen and the area.",
    },
    description: {
      bg: "Предлагаме услуги с малък багер за дворове, градини, строителни и селскостопански обекти в с. Ъглен и района. Извършваме изкопи за основи, огради, ВиК и електроинсталации, почистване на терени, подравняване, изкопаване на канали и други земни работи. Работим прецизно, коректно и с внимание към всеки обект, независимо дали става въпрос за малък частен двор или по-голям проект. Предлагаме бърза реакция, качествено изпълнение и оглед на място по всяко време.",
      en: "Mini excavator services for yards, gardens, building sites and farm plots in Aglen and the surrounding area. The work covers trenches for foundations, fences, water and electrical installations, site clearing, levelling, digging channels and other earthworks. Every site is treated with care and precision, whether it is a small private yard or a larger project — with a quick response, solid workmanship and a site visit at any time.",
    },
    coverImage: "/assets/local-businesses/baget-uslugi-cover.jpg",
    coverImageAlt: {
      bg: "Малък багер, който копае в двор край селска къща",
      en: "A mini excavator digging in a yard beside a village house",
    },
    phone: "0879 573 498",
    address: "с. Ъглен",
    services: [
      { bg: "Изкопи за основи и огради", en: "Trenches for foundations and fences" },
      { bg: "Изкопи за ВиК и електроинсталации", en: "Trenches for water and electrical installations" },
      { bg: "Почистване на терени", en: "Site clearing" },
      { bg: "Подравняване", en: "Levelling" },
      { bg: "Изкопаване на канали и други земни работи", en: "Digging channels and other earthworks" },
      { bg: "Оглед на място по всяко време", en: "A site visit at any time" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 70,
    lastUpdated: "2026-07-24",
  },
  {
    // Text and contact supplied by the site owner.
    id: "kosene-motorna-kosa",
    slug: "kosene-s-motorna-kosa",
    name: "Косене и почистване на дворове",
    category: "services",
    shortDescription: {
      bg: "Косене с моторна коса и почистване на дворове, градини и запустели терени.",
      en: "Strimmer mowing and clearing of yards, gardens and overgrown plots.",
    },
    description: {
      bg: "Предлагаме професионално косене и почистване на дворове, градини, овощни градини и запустели терени със съвременна моторна коса. Работим бързо, прецизно и с внимание към всеки обект, независимо дали става въпрос за малък двор или голям обрасъл имот.\n\nИзвършваме сезонна поддръжка, както и еднократно почистване на силно обрасли площи, за да върнем добрия вид и функционалността на вашия имот.\n\nРаботим в с. Ъглен и района, с коректно отношение, бърза реакция и качествено изпълнение. Оглед по всяко време. Бързо, чисто и на достъпни цени.",
      en: "Professional mowing and clearing of yards, gardens, orchards and neglected plots with a modern brushcutter. The work is quick and precise, with care for every site, whether it is a small yard or a large overgrown property.\n\nBoth seasonal upkeep and one-off clearing of heavily overgrown ground are offered, to bring your property back to good order and use.\n\nCovering Aglen and the surrounding area, with straight dealing, a quick response and solid workmanship. A site visit at any time. Fast, tidy and at affordable prices.",
    },
    highlight: { bg: "Оглед по всяко време", en: "A site visit at any time" },
    coverImage: "/assets/local-businesses/mown-cover.jpg",
    coverImageAlt: {
      bg: "Мъж коси висока трева с моторна коса край телена ограда в двор на селска къща",
      en: "A man cutting long grass with a brushcutter along a wire fence in a village garden",
    },
    phone: "0899 136 110",
    address: "с. Ъглен",
    services: [
      { bg: "Косене на висока трева и бурени", en: "Cutting long grass and weeds" },
      { bg: "Почистване на запустели дворове и парцели", en: "Clearing neglected yards and plots" },
      {
        bg: "Косене около огради, дървета и труднодостъпни места",
        en: "Mowing around fences, trees and hard-to-reach spots",
      },
      { bg: "Почистване на овощни градини и вилни имоти", en: "Clearing orchards and holiday properties" },
      { bg: "Поддръжка на зелени площи", en: "Upkeep of green areas" },
      { bg: "Извозване на окосената растителност (при желание)", en: "Removal of the cuttings (on request)" },
      { bg: "Оглед по всяко време", en: "A site visit at any time" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 65, // between the building work and the mini excavator
    lastUpdated: "2026-07-24",
  },
  {
    // Text supplied by the site owner. No phone or email was given, so none is
    // published — add one here once the tutor agrees which to show.
    id: "prevodi-uroci",
    slug: "prevodi-i-uroci",
    name: "Преводи и уроци по български и английски език",
    category: "services",
    shortDescription: {
      bg: "Преводи от и на английски и индивидуални уроци по български и английски език.",
      en: "Translation to and from English, plus one-to-one Bulgarian and English lessons.",
    },
    description: {
      bg: "Дългогодишен преподавател и филолог с богат академичен опит предлага професионални преводи от и на английски език, както и езикови консултации и обучение по български и английски език.\n\nУроците са индивидуални — по български език и литература и по английски език — за ученици, кандидатстващи след 7. клас, както и подготовка за матури, изпити и подобряване на езиковите умения. Занятията може да се провеждат присъствено или онлайн.\n\nОсвен английски, преподавателят владее още няколко съвременни и древни езика, което гарантира задълбочено разбиране на езика, граматиката и преводаческия процес. Всеки урок се съобразява с нивото и целите на ученика, с акцент върху практически резултати и увереност при изпити.",
      en: "A long-serving teacher and philologist with substantial academic experience offers professional translation to and from English, along with language consultancy and tuition in Bulgarian and English.\n\nLessons are one-to-one — in Bulgarian language and literature and in English — for pupils applying after year 7, as well as preparation for school-leaving exams, entrance exams and general language improvement. Lessons can be held in person or online.\n\nBesides English, the teacher commands several other modern and ancient languages, which brings a thorough grasp of language, grammar and the craft of translation. Every lesson is matched to the pupil's level and goals, with the emphasis on practical results and confidence in exams.",
    },
    highlight: { bg: "Възможност за онлайн уроци", en: "Online lessons available" },
    coverImage: "/assets/local-businesses/prevodi-uroci-cover.jpg",
    coverImageAlt: {
      bg: "Бюро с лаптоп, показващ успореден текст на английски и български, речници и тетрадка",
      en: "A desk with a laptop showing parallel English and Bulgarian text, dictionaries and a notebook",
    },
    phone: "0898 415064",
    address: "с. Ъглен",
    services: [
      { bg: "Преводи от и на английски език", en: "Translation to and from English" },
      { bg: "Уроци по български език и литература", en: "Bulgarian language and literature lessons" },
      { bg: "Уроци по английски език", en: "English language lessons" },
      { bg: "Онлайн уроци", en: "Online lessons" },
      { bg: "Подготовка за НВО след 7. клас", en: "Preparation for the year 7 national exam" },
      { bg: "Подготовка за кандидатстване и изпити", en: "Preparation for entrance exams" },
      { bg: "Индивидуален подход към всеки ученик", en: "An individual approach for every pupil" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 40,
    lastUpdated: "2026-07-24",
  },
  {
    // Text and contact supplied by the site owner.
    id: "stroitelni-uslugi",
    slug: "stroitelno-remontni-uslugi",
    name: "Строително-ремонтни услуги",
    category: "services",
    shortDescription: {
      bg: "Ремонти и строителство за жилищни, вилни и стопански сгради в Ъглен и района.",
      en: "Repairs and building work for homes, holiday houses and farm buildings in Aglen and the area.",
    },
    description: {
      bg: "Предлагаме цялостни строително-ремонтни услуги за жилищни, вилни и стопански сгради. Работим с внимание към детайла, качествени материали и коректно отношение към всеки клиент – от малки ремонти до изграждане на нови обекти. Извършваме както вътрешни, така и външни строителни дейности, съобразени с вашите изисквания и срокове. Работим в с. Ъглен и района, с индивидуален подход към всеки проект, без компромис с качеството и изпълнението. Огледът и консултацията са безплатни.",
      en: "Complete building and renovation services for homes, holiday houses and farm buildings — from small repairs to putting up new structures, with attention to detail, good materials and straight dealing. Both interior and exterior work is carried out, matched to your requirements and deadlines. The work covers Aglen and the surrounding area, with an individual approach to every project and no compromise on quality or delivery. Site visits and consultations are free.",
    },
    coverImage: "/assets/local-businesses/stroitelni-uslugi-cover.jpg",
    coverImageAlt: {
      bg: "Полагане на плочки, завършена баня, каменен дувар и груб строеж на къща",
      en: "Tiling work, a finished bathroom, a stone wall and the brick shell of a house",
    },
    phone: "0888 818 624",
    address: "с. Ъглен",
    services: [
      { bg: "Полагане на фаянс, теракот и гранитогрес", en: "Laying wall tiles, floor tiles and porcelain stoneware" },
      { bg: "Изграждане и цялостен ремонт на бани", en: "Building and fully renovating bathrooms" },
      { bg: "Зидария и изграждане на дувари и огради", en: "Masonry, boundary walls and fences" },
      { bg: "Шпакловка, мазилки и замазки", en: "Plastering, rendering and screeding" },
      { bg: "Бетонови и кофражни работи", en: "Concrete and formwork" },
      { bg: "Груб строеж и довършителни ремонти", en: "Structural shell work and finishing" },
      { bg: "Ремонт на къщи, дворове и стопански постройки", en: "Repairs to houses, yards and farm buildings" },
      { bg: "Безплатен оглед и консултация", en: "Free site visit and consultation" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 60,
    lastUpdated: "2026-07-24",
  },
  {
    // Text and contact supplied by the site owner.
    id: "elektrouslugi",
    slug: "elektrotehnicheski-uslugi",
    name: "Електротехнически услуги",
    category: "services",
    shortDescription: {
      bg: "Електроинсталации, табла, аварии и профилактика в Ъглен и района.",
      en: "Electrical installations, distribution boards, faults and maintenance in Aglen and the area.",
    },
    description: {
      bg: "Предлагаме професионални електротехнически услуги за домове, вили, търговски обекти и стопански сгради. Извършваме както изграждане на нови електроинсталации, така и диагностика, ремонт и модернизация на съществуващи системи.\n\nРаботим с качествени материали, спазваме всички изисквания за безопасност и предлагаме надеждни решения за всеки обект – от малки ремонти до цялостно електроизграждане.\n\nРаботим в с. Ъглен и района, с бърза реакция, коректно отношение и гаранция за качествено изпълнение. Огледът и консултацията се уговарят предварително.",
      en: "Professional electrical services for homes, holiday houses, shops and farm buildings — new installations as well as diagnostics, repair and upgrading of existing systems.\n\nThe work uses good materials, meets all safety requirements and offers dependable solutions for any site, from small repairs to a complete electrical fit-out.\n\nCovering Aglen and the surrounding area, with a quick response, straight dealing and a guarantee on the work. Site visits and consultations are arranged in advance.",
    },
    coverImage: "/assets/local-businesses/elektrouslugi-cover.jpg",
    coverImageAlt: {
      bg: "Отворено електрическо табло с автоматични прекъсвачи, мултицет, схеми и инструменти",
      en: "An open distribution board with circuit breakers, a multimeter, wiring schematics and tools",
    },
    phone: "0897 911 567",
    address: "с. Ъглен",
    services: [
      { bg: "Изграждане на нови електроинсталации", en: "New electrical installations" },
      { bg: "Подмяна на стари електрически инсталации", en: "Replacing old electrical installations" },
      { bg: "Монтаж и подмяна на електрически табла", en: "Fitting and replacing distribution boards" },
      { bg: "Монтаж на контакти, ключове и осветление", en: "Fitting sockets, switches and lighting" },
      { bg: "Отстраняване на електрически аварии и повреди", en: "Clearing electrical faults and breakdowns" },
      { bg: "Диагностика и профилактика на електроинсталации", en: "Diagnostics and preventive maintenance" },
      { bg: "Вътрешни и външни електромонтажни дейности", en: "Interior and exterior electrical work" },
      { bg: "Оглед и консултация", en: "Site visit and consultation" },
    ],
    bookingRequired: true,
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 50,
    lastUpdated: "2026-07-24",
  },
  {
    // Text and contact supplied by the site owner, whose own business this is.
    id: "devopsio",
    slug: "devopsio",
    name: "DevOpsio",
    category: "services",
    shortDescription: {
      bg: "DevOps и Cloud Engineering услуги от Ъглен за клиенти по целия свят.",
      en: "DevOps and cloud engineering services, from Aglen for clients worldwide.",
    },
    description: {
      bg: "Предлагам професионални DevOps и Cloud Engineering услуги за компании и екипи по целия свят. Работя дистанционно като freelance консултант и помагам на организации да изграждат сигурна, автоматизирана и надеждна облачна инфраструктура, която е готова да расте заедно с бизнеса.\n\nИмам богат опит с Microsoft Azure, Kubernetes, Terraform, Docker, CI/CD автоматизация и облачни архитектури. Всеки проект се изпълнява с фокус върху сигурността, производителността и дългосрочната поддръжка.\n\nРаботя с клиенти от Европа, Великобритания и САЩ, като предлагам индивидуален подход, прозрачна комуникация и решения, съобразени с нуждите на всеки проект. Възможни са консултации, краткосрочни проекти и дългосрочно сътрудничество.",
      en: "Professional DevOps and cloud engineering services for companies and teams worldwide. Working remotely as a freelance consultant, helping organisations build secure, automated and dependable cloud infrastructure that is ready to grow with the business.\n\nDeep experience with Microsoft Azure, Kubernetes, Terraform, Docker, CI/CD automation and cloud architecture. Every project is delivered with a focus on security, performance and long-term maintainability.\n\nClients across Europe, the UK and the USA, with an individual approach, clear communication and solutions shaped around each project. Available for consultancy, short engagements or long-term collaboration.",
    },
    highlight: { bg: "Дистанционна работа с клиенти от цял свят", en: "Remote work with clients worldwide" },
    coverImage: "/assets/local-businesses/devopsio-cover.jpg",
    coverImageAlt: {
      bg: "Домашен офис с лаптоп, показващ облачна архитектура, глобус и карта на света, с планинска гледка през прозореца",
      en: "A home office with a laptop showing a cloud architecture diagram, a globe and a world map, with a mountain view through the window",
    },
    phone: "0899 136 110",
    website: "https://devopsio.co/",
    address: "с. Ъглен",
    services: [
      { bg: "DevOps консултации", en: "DevOps consultancy" },
      { bg: "Cloud архитектура и миграции", en: "Cloud architecture and migrations" },
      { bg: "Kubernetes (AKS) изграждане и поддръжка", en: "Kubernetes (AKS) setup and maintenance" },
      { bg: "Infrastructure as Code (Terraform)", en: "Infrastructure as Code (Terraform)" },
      { bg: "Docker и контейнеризация", en: "Docker and containerisation" },
      { bg: "CI/CD автоматизация", en: "CI/CD automation" },
      { bg: "Мониторинг, логове и наблюдение", en: "Monitoring, logging and observability" },
      { bg: "Оптимизация на разходите в облака", en: "Cloud cost optimisation" },
      { bg: "Сигурност, RBAC и управление на достъпа", en: "Security, RBAC and access management" },
      { bg: "AI и облачни решения", en: "AI and cloud solutions" },
    ],
    status: "published",
    verified: false,
    featured: false,
    displayOrder: 10,
    lastUpdated: "2026-07-24",
  },
];

// Sample entries rendered only on a local development host, so the layout can
// be reviewed before real listings exist. They are never part of the generated
// static pages or sitemaps, so no invented business can reach the live site.
const devPreviewData: LocalBusiness[] = [
  {
    id: "preview-producer",
    slug: "primer-mesten-proizvoditel",
    name: "ПРИМЕР · Местен производител",
    category: "producers",
    shortDescription: {
      bg: "Примерен запис — вижда се само в режим на разработка.",
      en: "Sample entry — visible in development mode only.",
    },
    description: {
      bg: "Този запис съществува само за да се прегледа оформлението на страницата, преди да бъдат добавени истинските местни бизнеси. Не се публикува.",
      en: "This entry exists only so the page layout can be reviewed before the real local businesses are added. It is never published.",
    },
    coverImage: "/assets/aglen-village-church.png",
    address: "с. Ъглен",
    products: [
      { bg: "Пример за продукт", en: "Sample product" },
      { bg: "Пример за продукт", en: "Sample product" },
    ],
    openingHours: { 1: [{ open: "09:00", close: "17:00" }], 6: [{ open: "09:00", close: "13:00" }] },
    delivery: true,
    pickup: true,
    status: "published",
    verified: false,
    featured: true,
    lastUpdated: "2026-07-24",
  },
  {
    id: "preview-food",
    slug: "primer-hrana-i-napitki",
    name: "ПРИМЕР · Механа",
    category: "food",
    shortDescription: {
      bg: "Примерен запис — вижда се само в режим на разработка.",
      en: "Sample entry — visible in development mode only.",
    },
    coverImage: "/assets/aglen-vit-river-sunset.png",
    address: "с. Ъглен",
    seasonal: true,
    status: "published",
    verified: false,
    featured: false,
  },
];

// No `window` during static generation, and a real hostname in production —
// both cases fall through to the real data only.
function isLocalPreviewHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".local");
}

function allBusinesses(): LocalBusiness[] {
  return isLocalPreviewHost() ? [...businessData, ...devPreviewData] : businessData;
}

export const categoryOrder: BusinessCategory[] = [
  "food",
  "shops",
  "producers",
  "stay",
  "crafts",
  "services",
  "farming",
  "other",
];

// Businesses without an explicit `displayOrder` sit here, between the ones
// pinned to the front and the ones pinned to the end.
const DEFAULT_DISPLAY_ORDER = 50;

/**
 * Listings that may be shown publicly, in `displayOrder` then featured-first
 * then alphabetical order.
 */
export function publishedBusinesses(): LocalBusiness[] {
  return allBusinesses()
    .filter((business) => business.status === "published" || business.status === "temporarily_closed")
    .sort(
      (a, b) =>
        (a.displayOrder ?? DEFAULT_DISPLAY_ORDER) - (b.displayOrder ?? DEFAULT_DISPLAY_ORDER) ||
        Number(b.featured) - Number(a.featured) ||
        a.name.localeCompare(b.name, "bg"),
    );
}

export function findBusiness(slug: string): LocalBusiness | undefined {
  return publishedBusinesses().find((business) => business.slug === slug);
}

/** Only the categories that actually hold a listing — no decorative filters. */
export function activeCategories(): BusinessCategory[] {
  const present = new Set(publishedBusinesses().map((business) => business.category));
  return categoryOrder.filter((category) => present.has(category));
}

export function featuredBusinesses(): LocalBusiness[] {
  return publishedBusinesses().filter((business) => business.featured).slice(0, 3);
}

/** Businesses that told a story we may quote — never invented. */
export function businessStories(): LocalBusiness[] {
  return publishedBusinesses().filter((business) => business.story);
}

/** Every listed product, linked back to the producer that offers it. */
export function localProducts(language: LanguageCode): { label: string; business: LocalBusiness }[] {
  return publishedBusinesses().flatMap((business) =>
    (business.products ?? []).map((product) => ({ label: localizeText(product, language), business })),
  );
}

export function localizeText(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en ?? text.bg;
}

/** Google Maps link for a business, by coordinates when known, else by address. */
export function mapUrl(business: LocalBusiness): string | undefined {
  if (business.latitude !== undefined && business.longitude !== undefined) {
    return `https://www.google.com/maps/search/?api=1&query=${business.latitude},${business.longitude}`;
  }
  if (business.address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, Bulgaria`)}`;
  }
  return undefined;
}

const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7] as const;

/** True only when opening hours were supplied and the business is open now. */
export function isOpenNow(business: LocalBusiness, now = new Date()): boolean {
  const hours = business.openingHours;
  if (!hours || business.status === "temporarily_closed") return false;
  const weekday = (now.getDay() === 0 ? 7 : now.getDay()) as (typeof WEEKDAYS)[number];
  const minutes = now.getHours() * 60 + now.getMinutes();
  return (hours[weekday] ?? []).some((slot) => toMinutes(slot.open) <= minutes && minutes < toMinutes(slot.close));
}

/** Whether "open now" filtering can be offered at all for the current data. */
export function hasOpeningHours(): boolean {
  return publishedBusinesses().some((business) => business.openingHours);
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export { WEEKDAYS };
