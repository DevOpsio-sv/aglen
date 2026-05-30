import type { LanguageCode } from "./locales/types";

export type LocalizedUiText = {
  trustLinks: Array<{ label: string; routeId: string }>;
  landing: {
    routeMap: string;
    visitorAnswers: string;
    internalLinks: string;
    relatedGuides: string;
    relatedGuidesAria: string;
  };
  aria: {
    mobileNav: string;
    footerPolicy: string;
  };
};

export const uiTextByLanguage: Record<LanguageCode, LocalizedUiText> = {
  bg: {
    trustLinks: [
      { label: "За този пътеводител", routeId: "trust" },
      { label: "Редакционна политика", routeId: "editorial" },
      { label: "Проверка на местно присъствие", routeId: "localSeo" },
      { label: "Политика за обхождане", routeId: "crawlerPolicy" },
      { label: "Събития и актуализации", routeId: "events" },
    ],
    landing: { routeMap: "Виж маршрутната карта", visitorAnswers: "Отговори за посетители", internalLinks: "Вътрешни връзки", relatedGuides: "Свързани ръководства", relatedGuidesAria: "Свързани ръководства за Ъглен" },
    aria: { mobileNav: "Навигация", footerPolicy: "Страници за доверие и политики" },
  },
  en: {
    trustLinks: [
      { label: "About this guide", routeId: "trust" },
      { label: "Editorial policy", routeId: "editorial" },
      { label: "Local presence checklist", routeId: "localSeo" },
      { label: "Crawler policy", routeId: "crawlerPolicy" },
      { label: "Events and updates", routeId: "events" },
    ],
    landing: { routeMap: "View route map", visitorAnswers: "Visitor answers", internalLinks: "Internal links", relatedGuides: "Related guides", relatedGuidesAria: "Related Aglen guides" },
    aria: { mobileNav: "Navigation", footerPolicy: "Trust and policy pages" },
  },
  de: {
    trustLinks: [
      { label: "Über diesen Reiseführer", routeId: "trust" },
      { label: "Redaktionsrichtlinie", routeId: "editorial" },
      { label: "Checkliste lokale Präsenz", routeId: "localSeo" },
      { label: "Crawler-Richtlinie", routeId: "crawlerPolicy" },
      { label: "Events und Updates", routeId: "events" },
    ],
    landing: { routeMap: "Routenkarte ansehen", visitorAnswers: "Antworten für Besucher", internalLinks: "Interne Links", relatedGuides: "Verwandte Führer", relatedGuidesAria: "Verwandte Aglen-Führer" },
    aria: { mobileNav: "Navigation", footerPolicy: "Vertrauens- und Richtlinienseiten" },
  },
  fr: {
    trustLinks: [
      { label: "À propos de ce guide", routeId: "trust" },
      { label: "Politique éditoriale", routeId: "editorial" },
      { label: "Checklist de présence locale", routeId: "localSeo" },
      { label: "Politique crawler", routeId: "crawlerPolicy" },
      { label: "Événements et mises à jour", routeId: "events" },
    ],
    landing: { routeMap: "Voir la carte d'itinéraire", visitorAnswers: "Réponses visiteurs", internalLinks: "Liens internes", relatedGuides: "Guides associés", relatedGuidesAria: "Guides Aglen associés" },
    aria: { mobileNav: "Navigation", footerPolicy: "Pages de confiance et politiques" },
  },
  es: {
    trustLinks: [
      { label: "Sobre esta guía", routeId: "trust" },
      { label: "Política editorial", routeId: "editorial" },
      { label: "Lista de presencia local", routeId: "localSeo" },
      { label: "Política de rastreo", routeId: "crawlerPolicy" },
      { label: "Eventos y novedades", routeId: "events" },
    ],
    landing: { routeMap: "Ver mapa de ruta", visitorAnswers: "Respuestas para visitantes", internalLinks: "Enlaces internos", relatedGuides: "Guías relacionadas", relatedGuidesAria: "Guías relacionadas de Aglen" },
    aria: { mobileNav: "Navegación", footerPolicy: "Páginas de confianza y políticas" },
  },
  it: {
    trustLinks: [
      { label: "Informazioni su questa guida", routeId: "trust" },
      { label: "Politica editoriale", routeId: "editorial" },
      { label: "Checklist presenza locale", routeId: "localSeo" },
      { label: "Politica crawler", routeId: "crawlerPolicy" },
      { label: "Eventi e aggiornamenti", routeId: "events" },
    ],
    landing: { routeMap: "Vedi mappa del percorso", visitorAnswers: "Risposte per visitatori", internalLinks: "Link interni", relatedGuides: "Guide correlate", relatedGuidesAria: "Guide correlate di Aglen" },
    aria: { mobileNav: "Navigazione", footerPolicy: "Pagine di fiducia e politiche" },
  },
  ro: {
    trustLinks: [
      { label: "Despre acest ghid", routeId: "trust" },
      { label: "Politică editorială", routeId: "editorial" },
      { label: "Listă prezență locală", routeId: "localSeo" },
      { label: "Politică crawler", routeId: "crawlerPolicy" },
      { label: "Evenimente și actualizări", routeId: "events" },
    ],
    landing: { routeMap: "Vezi harta traseului", visitorAnswers: "Răspunsuri pentru vizitatori", internalLinks: "Linkuri interne", relatedGuides: "Ghiduri asociate", relatedGuidesAria: "Ghiduri Aglen asociate" },
    aria: { mobileNav: "Navigare", footerPolicy: "Pagini de încredere și politici" },
  },
  tr: {
    trustLinks: [
      { label: "Bu rehber hakkında", routeId: "trust" },
      { label: "Yayın politikası", routeId: "editorial" },
      { label: "Yerel varlık kontrol listesi", routeId: "localSeo" },
      { label: "Tarayıcı politikası", routeId: "crawlerPolicy" },
      { label: "Etkinlikler ve güncellemeler", routeId: "events" },
    ],
    landing: { routeMap: "Rota haritasını gör", visitorAnswers: "Ziyaretçi yanıtları", internalLinks: "İç bağlantılar", relatedGuides: "İlgili rehberler", relatedGuidesAria: "İlgili Aglen rehberleri" },
    aria: { mobileNav: "Gezinme", footerPolicy: "Güven ve politika sayfaları" },
  },
  el: {
    trustLinks: [
      { label: "Σχετικά με τον οδηγό", routeId: "trust" },
      { label: "Συντακτική πολιτική", routeId: "editorial" },
      { label: "Λίστα τοπικής παρουσίας", routeId: "localSeo" },
      { label: "Πολιτική crawler", routeId: "crawlerPolicy" },
      { label: "Εκδηλώσεις και ενημερώσεις", routeId: "events" },
    ],
    landing: { routeMap: "Δείτε τον χάρτη διαδρομής", visitorAnswers: "Απαντήσεις επισκεπτών", internalLinks: "Εσωτερικοί σύνδεσμοι", relatedGuides: "Σχετικοί οδηγοί", relatedGuidesAria: "Σχετικοί οδηγοί Aglen" },
    aria: { mobileNav: "Πλοήγηση", footerPolicy: "Σελίδες εμπιστοσύνης και πολιτικών" },
  },
  ru: {
    trustLinks: [
      { label: "Об этом путеводителе", routeId: "trust" },
      { label: "Редакционная политика", routeId: "editorial" },
      { label: "Проверка локального присутствия", routeId: "localSeo" },
      { label: "Политика для crawler", routeId: "crawlerPolicy" },
      { label: "События и обновления", routeId: "events" },
    ],
    landing: { routeMap: "Смотреть карту маршрута", visitorAnswers: "Ответы для посетителей", internalLinks: "Внутренние ссылки", relatedGuides: "Связанные гиды", relatedGuidesAria: "Связанные гиды по Аглену" },
    aria: { mobileNav: "Навигация", footerPolicy: "Страницы доверия и политик" },
  },
  ja: {
    trustLinks: [
      { label: "このガイドについて", routeId: "trust" },
      { label: "編集方針", routeId: "editorial" },
      { label: "地域プレゼンス確認", routeId: "localSeo" },
      { label: "クローラーポリシー", routeId: "crawlerPolicy" },
      { label: "イベントと更新", routeId: "events" },
    ],
    landing: { routeMap: "ルートマップを見る", visitorAnswers: "訪問者向け回答", internalLinks: "内部リンク", relatedGuides: "関連ガイド", relatedGuidesAria: "アグレン関連ガイド" },
    aria: { mobileNav: "ナビゲーション", footerPolicy: "信頼とポリシーのページ" },
  },
  sr: {
    trustLinks: [
      { label: "О овом водичу", routeId: "trust" },
      { label: "Уредничка политика", routeId: "editorial" },
      { label: "Провера локалног присуства", routeId: "localSeo" },
      { label: "Политика crawler-а", routeId: "crawlerPolicy" },
      { label: "Догађаји и ажурирања", routeId: "events" },
    ],
    landing: { routeMap: "Погледај мапу руте", visitorAnswers: "Одговори за посетиоце", internalLinks: "Унутрашње везе", relatedGuides: "Повезани водичи", relatedGuidesAria: "Повезани водичи за Аглен" },
    aria: { mobileNav: "Навигација", footerPolicy: "Странице поверења и политика" },
  },
  zh: {
    trustLinks: [
      { label: "关于本指南", routeId: "trust" },
      { label: "编辑政策", routeId: "editorial" },
      { label: "本地展示检查表", routeId: "localSeo" },
      { label: "爬虫政策", routeId: "crawlerPolicy" },
      { label: "活动与更新", routeId: "events" },
    ],
    landing: { routeMap: "查看路线地图", visitorAnswers: "访客问答", internalLinks: "内部链接", relatedGuides: "相关指南", relatedGuidesAria: "阿格伦相关指南" },
    aria: { mobileNav: "导航", footerPolicy: "信任与政策页面" },
  },
  hu: {
    trustLinks: [
      { label: "Erről az útmutatóról", routeId: "trust" },
      { label: "Szerkesztési irányelvek", routeId: "editorial" },
      { label: "Helyi jelenlét ellenőrzőlista", routeId: "localSeo" },
      { label: "Crawler irányelv", routeId: "crawlerPolicy" },
      { label: "Események és frissítések", routeId: "events" },
    ],
    landing: { routeMap: "Útvonaltérkép megtekintése", visitorAnswers: "Válaszok látogatóknak", internalLinks: "Belső linkek", relatedGuides: "Kapcsolódó kalauzok", relatedGuidesAria: "Kapcsolódó Aglen-kalauzok" },
    aria: { mobileNav: "Navigáció", footerPolicy: "Bizalmi és irányelv oldalak" },
  },
};
