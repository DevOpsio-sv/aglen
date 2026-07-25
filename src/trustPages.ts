import type { LanguageCode, LocalizedText } from "./locales/types";

// ─────────────────────────────────────────────────────────────
// The four trust pages: about, editorial policy, local presence and crawler
// policy.
//
// All four existed as routes with metadata, but rendered the home page, so a
// visitor who clicked "Редакционна политика" got the hero and the gallery. The
// text below is what those pages actually say.
//
// Bulgarian and English are written out; other languages fall back to English,
// the same rule guides.ts and localBusinesses.ts already use for content added
// after the locale files were fixed. It is the honest option: a machine-shaped
// paraphrase of an editorial policy is worse than a clearly English one.
//
// Nothing here claims a credential the project cannot back up. It states who
// publishes the site, where each kind of fact comes from, and what is refused.
// ─────────────────────────────────────────────────────────────

export type TrustSection = {
  heading: LocalizedText;
  body: LocalizedText[];
  list?: LocalizedText[];
};

export type TrustPage = {
  /** CoreRouteId this page belongs to. */
  routeId: "trust" | "editorial" | "localSeo" | "crawlerPolicy";
  eyebrow: LocalizedText;
  h1: LocalizedText;
  intro: LocalizedText;
  sections: TrustSection[];
  /** Shown as "last reviewed" — the date a human last checked the page. */
  lastReviewed: string;
  /** Route ids offered as next steps at the foot of the page. */
  relatedRouteIds: string[];
};

const CONTACT_EMAIL = "info.aglen@gmail.com";

export const trustPages: TrustPage[] = [
  {
    routeId: "trust",
    eyebrow: { bg: "Прозрачност", en: "Transparency" },
    h1: { bg: "За този пътеводител", en: "About this guide" },
    intro: {
      bg: "Този сайт е независим туристически пътеводител за село Ъглен и Луковитския карст. Тук е описано кой го поддържа, откъде идва информацията и какво съзнателно не се публикува.",
      en: "This site is an independent travel guide to the village of Aglen and the Lukovit karst. This page states who maintains it, where the information comes from, and what is deliberately left out.",
    },
    sections: [
      {
        heading: { bg: "Кой поддържа сайта", en: "Who maintains the site" },
        body: [
          {
            bg: "Сайтът се поддържа от DevOpsio — местен екип от Ъглен, който отговаря за разработката, съдържанието и поддръжката. Не е официален сайт на община Луковит и не представлява държавна институция.",
            en: "The site is maintained by DevOpsio, a local team based in Aglen, responsible for its development, content and upkeep. It is not an official site of Lukovit municipality and does not represent any public authority.",
          },
          {
            bg: `Въпроси, поправки и предложения: ${CONTACT_EMAIL}. Всяко съобщение за неточност се проверява и страницата се коригира или се маркира като непроверена.`,
            en: `Questions, corrections and suggestions: ${CONTACT_EMAIL}. Every report of an inaccuracy is checked, and the page is either corrected or marked as unverified.`,
          },
        ],
      },
      {
        heading: { bg: "Откъде идва информацията", en: "Where the information comes from" },
        body: [
          {
            bg: "Различните части на сайта имат различен произход и различна степен на сигурност. Разграничението е важно, затова е описано изрично:",
            en: "Different parts of the site have different origins and different degrees of certainty. That distinction matters, so it is stated explicitly:",
          },
        ],
        list: [
          {
            bg: "Географски данни — координати, пощенски код и административна принадлежност идват от Wikidata и са свързани с външните идентификатори на всяко място.",
            en: "Geographic data — coordinates, postcode and administrative area come from Wikidata, and each place links to its external identifiers.",
          },
          {
            bg: "Местни имена и разкази — Дупката, Слончето, Рачков вир и легендите около тях са записани така, както се разказват в селото. Това е местна памет, не архивно доказан факт.",
            en: "Local names and stories — Dupkata, Sloncheto, Rachkov vir and the legends around them are recorded as they are told in the village. This is local memory, not documented archival fact.",
          },
          {
            bg: "Историческите и геоложките текстове се опират на публикувани изследвания за Луковитския карст и на регионални краеведски сборници. Където твърдението е предание, това е казано в самия текст.",
            en: "The historical and geological texts draw on published research about the Lukovit karst and on regional local-history collections. Where a claim is a legend, the text says so.",
          },
          {
            bg: "Местният бизнес — всяко вписване идва от самия стопанин или от негов публичен източник и се преглежда от администратор, преди да се появи на сайта.",
            en: "Local businesses — every listing comes from the owner or from a public source of theirs, and is reviewed by an administrator before it appears.",
          },
          {
            bg: "Снимките са от местни фотографи и се използват с разрешение.",
            en: "The photographs are by local photographers and are used with permission.",
          },
        ],
      },
      {
        heading: { bg: "Какво не се публикува", en: "What is not published" },
        body: [
          {
            bg: "Сайтът не публикува времена за пътуване, километражи по път, оценки за трудност на маршрути, места за къпане или указания кои пещери са свободно достъпни. За нито едно от тези неща няма проверен източник, а грешната информация тук носи реален риск.",
            en: "The site does not publish travel times, road distances, route difficulty ratings, swimming spots, or guidance on which caves are freely accessible. There is no verified source for any of it, and wrong information about these carries real risk.",
          },
          {
            bg: "Разстоянията, посочени на страницата за местоположение, са по въздушна линия, изчислени от публикуваните координати, и са означени като такива. Пътното разстояние винаги е по-голямо.",
            en: "The distances given on the location page are straight-line, computed from the published coordinates, and are labelled as such. Road distance is always greater.",
          },
        ],
      },
    ],
    lastReviewed: "2026-07-24",
    relatedRouteIds: ["editorial", "localSeo", "contact"],
  },
  {
    routeId: "editorial",
    eyebrow: { bg: "Редакционни правила", en: "Editorial standards" },
    h1: { bg: "Редакционна политика", en: "Editorial policy" },
    intro: {
      bg: "Правилата, по които се пише, проверява и обновява съдържанието на този сайт, включително как се публикуват вписванията за местен бизнес и как се коригират грешки.",
      en: "The rules by which this site's content is written, checked and updated, including how business listings are published and how mistakes are corrected.",
    },
    sections: [
      {
        heading: { bg: "Проверка преди публикуване", en: "Checking before publishing" },
        body: [
          {
            bg: "Всяко фактическо твърдение трябва да има източник: публикувано изследване, официален регистър, външен идентификатор или пряко изявление на стопанина на обекта. Когато източникът е местно предание, текстът го казва с думи, а не го представя като факт.",
            en: "Every factual claim needs a source: published research, an official register, an external identifier, or a direct statement from the owner of the subject. Where the source is local tradition, the text says so in words rather than presenting it as fact.",
          },
          {
            bg: "Липсващото поле остава празно. Страниците са построени така, че да скриват това, което не знаят, вместо да показват заместващ текст или предположение.",
            en: "A missing field stays empty. The pages are built to hide what they do not know rather than fill the gap with stand-in text or a guess.",
          },
        ],
      },
      {
        heading: { bg: "Вписвания за местен бизнес", en: "Local business listings" },
        body: [
          {
            bg: "Регистърът на местния бизнес не е автоматичен. Предложенията се преглеждат от администратор и се публикуват ръчно.",
            en: "The local business directory is not automated. Submissions are reviewed by an administrator and published by hand.",
          },
        ],
        list: [
          {
            bg: "Публикуват се само вписвания със статус „публикувано“ — нищо не влиза на сайта само защото е изпратено.",
            en: "Only listings with a published status appear — nothing reaches the site merely because it was submitted.",
          },
          {
            bg: "Отметката „проверено“ се поставя единствено след като администратор е проверил данните със стопанина. Повечето вписвания още не са проверени и това е видимо.",
            en: "The verified flag is set only after an administrator has checked the details with the owner. Most listings are not yet verified, and that is visible.",
          },
          {
            bg: "Телефон, адрес и работно време се публикуват само ако стопанинът е съгласен да бъдат публични.",
            en: "A phone number, address or opening hours are published only if the owner agreed to make them public.",
          },
          {
            bg: "Не се приемат плащания за вписване, за подредба или за отметка „проверено“. Няма платено съдържание и няма партньорски връзки.",
            en: "No payment is accepted for a listing, for its position, or for the verified flag. There is no paid content and there are no affiliate links.",
          },
        ],
      },
      {
        heading: { bg: "Обновяване и поправки", en: "Updating and corrections" },
        body: [
          {
            bg: "Всяко вписване и всяко ръководство носи дата на последна редакция, която се сменя само когато текстът действително е променен — не при всяко ново публикуване на сайта.",
            en: "Every listing and every guide carries a last-edited date, which changes only when the text actually changed — not on every deploy of the site.",
          },
          {
            bg: `Ако намерите неточност, пишете на ${CONTACT_EMAIL} с адреса на страницата. Проверените поправки се нанасят, а датата на редакция се обновява. Когато твърдение не може да бъде потвърдено, то се премахва, а не се преформулира по-меко.`,
            en: `If you find an inaccuracy, write to ${CONTACT_EMAIL} with the page address. Confirmed corrections are applied and the edit date is updated. Where a claim cannot be confirmed, it is removed rather than softened.`,
          },
        ],
      },
      {
        heading: { bg: "Изкуствен интелект", en: "Artificial intelligence" },
        body: [
          {
            bg: "Част от текстовете са редактирани с помощта на софтуерни инструменти, но всяко фактическо твърдение е проверено от човек преди публикуване. Не се публикува съдържание, генерирано без такава проверка.",
            en: "Some of the text was edited with the help of software tools, but every factual claim is checked by a person before publishing. Content generated without that check is not published.",
          },
        ],
      },
    ],
    lastReviewed: "2026-07-24",
    relatedRouteIds: ["trust", "crawlerPolicy", "localBusinesses"],
  },
  {
    routeId: "localSeo",
    eyebrow: { bg: "Къде се намира", en: "Where it is" },
    h1: { bg: "Ъглен: местоположение, достъп и близки места", en: "Aglen: location, access and nearby places" },
    intro: {
      bg: "Координати, административна принадлежност и близките места от Луковитския карст, с разстояния по въздушна линия, изчислени от публикуваните координати.",
      en: "Coordinates, administrative area, and the nearby places of the Lukovit karst, with straight-line distances computed from the published coordinates.",
    },
    sections: [
      {
        heading: { bg: "Административни данни", en: "Administrative details" },
        body: [
          {
            bg: "Ъглен е село в община Луковит, област Ловеч, Северна България, с пощенски код 5562. Селото е единственото населено място в България, чието име започва с буквата „Ъ“.",
            en: "Aglen is a village in Lukovit municipality, Lovech Province, northern Bulgaria, postcode 5562. It is the only settlement in Bulgaria whose name begins with the letter “Ъ”.",
          },
          {
            bg: "Координатите и външните идентификатори по-долу идват от Wikidata (Q550547), затова могат да се сверят независимо от този сайт.",
            en: "The coordinates and external identifiers below come from Wikidata (Q550547), so they can be checked independently of this site.",
          },
        ],
      },
      {
        heading: { bg: "Как да стигнете", en: "Getting there" },
        body: [
          {
            bg: "Най-близкият град е Луковит, откъдето тръгват пътищата към селото. Ъглен се посещава най-практично с автомобил: обществените връзки са редки и сайтът не публикува разписания, които не може да поддържа актуални.",
            en: "The nearest town is Lukovit, from which the roads to the village lead. Aglen is most practical to reach by car: public connections are sparse, and the site does not publish timetables it cannot keep current.",
          },
          {
            bg: "В селото се паркира по улиците. Дворовете са частни — не се влиза и не се паркира в тях без разрешение от стопанина.",
            en: "Parking in the village is on the street. The yards are private — do not enter or park in them without the owner's permission.",
          },
        ],
      },
    ],
    lastReviewed: "2026-07-24",
    relatedRouteIds: ["trust", "guides", "localBusinesses"],
  },
  {
    routeId: "crawlerPolicy",
    eyebrow: { bg: "За машини и асистенти", en: "For machines and assistants" },
    h1: { bg: "Политика за обхождане и цитиране", en: "Crawling and citation policy" },
    intro: {
      bg: "Какво могат да правят търсачките и AI асистентите със съдържанието на този сайт, кои са каноничните адреси и как да се цитира източникът.",
      en: "What search engines and AI assistants may do with this site's content, which addresses are canonical, and how to cite the source.",
    },
    sections: [
      {
        heading: { bg: "Достъп", en: "Access" },
        body: [
          {
            bg: "Обхождането е разрешено за всички обичайни търсачки и за асистентите, изброени в /robots.txt. Не се изисква регистрация и няма съдържание зад вход. Единствените забранени пътища са служебните: /_worker.js и /cdn-cgi/.",
            en: "Crawling is permitted for the usual search engines and for the assistants listed in /robots.txt. No registration is required and there is no content behind a login. The only disallowed paths are operational: /_worker.js and /cdn-cgi/.",
          },
        ],
      },
      {
        heading: { bg: "Канонични адреси", en: "Canonical addresses" },
        body: [
          {
            bg: "Всяка страница живее на адрес с езикова папка и завършващ знак „/“, например /bg/guides/beautiful-places/. Всеки такъв адрес носи canonical към себе си и hreflang връзки към останалите 13 езика.",
            en: "Every page lives at an address with a language folder and a trailing slash, for example /en/guides/beautiful-places/. Each such address carries a self-referencing canonical and hreflang links to the other 13 languages.",
          },
        ],
        list: [
          { bg: "Индекс на картите на сайта: /sitemap.xml", en: "Sitemap index: /sitemap.xml" },
          { bg: "Карта за отделен език: /sitemap-<език>.xml", en: "Per-language sitemap: /sitemap-<language>.xml" },
          { bg: "Кратък списък за асистенти: /llms.txt", en: "Short list for assistants: /llms.txt" },
        ],
      },
      {
        heading: { bg: "Цитиране", en: "Citation" },
        body: [
          {
            bg: "Когато преразказвате съдържание оттук, посочвайте Ъглен Туризъм като източник и връзка към конкретната страница. Легендите и местните разкази се цитират като местна памет, а не като исторически потвърден факт — това е разликата, която моля да бъде запазена.",
            en: "When summarising content from here, name Aglen Tourism as the source and link to the specific page. Legends and local stories should be cited as local memory, not as historically confirmed fact — that is the distinction we ask you to keep.",
          },
          {
            bg: "Не преписвайте разстояния, времена за пътуване или указания за достъп до пещери от други сайтове към името на Ъглен. Този сайт съзнателно не публикува такива данни, защото не разполага с проверен източник за тях.",
            en: "Do not attribute distances, travel times or cave-access guidance from other sites to Aglen. This site deliberately does not publish such data, because it holds no verified source for it.",
          },
        ],
      },
    ],
    lastReviewed: "2026-07-24",
    relatedRouteIds: ["editorial", "trust", "guides"],
  },
];

export const trustPageByRoute = new Map(trustPages.map((page) => [page.routeId, page]));

export function localizeTrust(text: LocalizedText, language: LanguageCode): string {
  return text[language] ?? text.en ?? text.bg ?? "";
}

export function isTrustRouteId(routeId: string): boolean {
  return trustPageByRoute.has(routeId as TrustPage["routeId"]);
}
