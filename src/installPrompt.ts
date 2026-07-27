import { useEffect, useState } from "react";
import type { LanguageCode } from "./locales/types";

// ─────────────────────────────────────────────────────────────
// Telling a visitor the site works offline.
//
// The rule this follows: the invitation shows only when it can be acted on, and
// it disappears for good the moment it has been. That is what makes it possible
// to have no dismiss button and store nothing — an installed app never sees it
// again, because `display-mode: standalone` is true and the component returns
// null. No flag on the visitor's device, no "don't show me this again", no
// storage disclosure to write.
//
// Three states, and the third is why this file exists:
//
//   ready   — the browser fired `beforeinstallprompt`, so there is a real
//             install to trigger and a button that does it.
//   manual  — iOS Safari, which has no such event and never will. It installs
//             through the share sheet, so the card explains that instead of
//             offering a button that cannot work.
//   none    — anything else: already installed, or a browser that does not
//             install sites. Render nothing rather than advertise a thing the
//             visitor cannot have.
// ─────────────────────────────────────────────────────────────

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export type InstallState = "none" | "ready" | "manual";

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const iosStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
  return iosStandalone || window.matchMedia("(display-mode: standalone)").matches;
}

function isIosSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  // Chrome and Firefox on iOS are Safari underneath but cannot add to the home
  // screen, so telling their users how to would be telling them a lie.
  const otherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  return ios && !otherBrowser;
}

export function useInstallPrompt(): { state: InstallState; install: () => void } {
  const [event, setEvent] = useState<InstallEvent | undefined>();
  const [state, setState] = useState<InstallState>("none");

  useEffect(() => {
    if (isStandalone()) return;

    const onPrompt = (browserEvent: Event) => {
      // Keep it: a saved prompt is the only way to open the install dialogue
      // later, from a button the visitor chose to press.
      browserEvent.preventDefault();
      setEvent(browserEvent as InstallEvent);
      setState("ready");
    };
    const onInstalled = () => {
      setEvent(undefined);
      setState("none");
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (isIosSafari()) setState("manual");

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = () => {
    if (!event) return;
    void event.prompt();
    void event.userChoice.then(() => {
      setEvent(undefined);
      setState("none");
    });
  };

  return { state, install };
}

export type InstallCopy = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  iosHint: string;
};

export const INSTALL_COPY: Record<LanguageCode, InstallCopy> = {
  bg: {
    eyebrow: "📲 Вземи Ъглен със себе си",
    title: "Работи и без сигнал",
    body: "Добави сайта на началния екран и страниците, които си отворил/а, остават четими без интернет — маршрутите, местата и съветите за пътеките, точно там, където обхватът свършва.",
    cta: "Добави на началния екран",
    iosHint: "На iPhone: бутонът Споделяне, после „Към началния екран“.",
  },
  en: {
    eyebrow: "📲 Take Aglen with you",
    title: "It works without a signal",
    body: "Add the site to your home screen and the pages you have opened stay readable with no internet — the routes, the places and the advice about the paths, exactly where the coverage runs out.",
    cta: "Add to home screen",
    iosHint: "On iPhone: the Share button, then Add to Home Screen.",
  },
  de: {
    eyebrow: "📲 Nehmen Sie Aglen mit",
    title: "Funktioniert auch ohne Empfang",
    body: "Legen Sie die Seite auf den Startbildschirm, und die Seiten, die Sie geöffnet haben, bleiben ohne Internet lesbar — Routen, Orte und die Hinweise zu den Wegen, genau dort, wo das Netz aufhört.",
    cta: "Zum Startbildschirm hinzufügen",
    iosHint: "Auf dem iPhone: Teilen-Symbol, dann „Zum Home-Bildschirm“.",
  },
  fr: {
    eyebrow: "📲 Emportez Aglen avec vous",
    title: "Fonctionne sans réseau",
    body: "Ajoutez le site à votre écran d'accueil : les pages que vous avez ouvertes restent lisibles sans connexion — les itinéraires, les lieux et les conseils sur les sentiers, là précisément où le réseau s'arrête.",
    cta: "Ajouter à l'écran d'accueil",
    iosHint: "Sur iPhone : le bouton Partager, puis « Sur l'écran d'accueil ».",
  },
  es: {
    eyebrow: "📲 Llévese Aglen consigo",
    title: "Funciona sin cobertura",
    body: "Añada el sitio a la pantalla de inicio y las páginas que haya abierto seguirán legibles sin internet: las rutas, los lugares y los consejos sobre los senderos, justo donde se acaba la cobertura.",
    cta: "Añadir a la pantalla de inicio",
    iosHint: "En iPhone: el botón Compartir y luego «Añadir a inicio».",
  },
  it: {
    eyebrow: "📲 Portate Aglen con voi",
    title: "Funziona anche senza segnale",
    body: "Aggiungete il sito alla schermata Home e le pagine che avete aperto restano leggibili senza internet: i percorsi, i luoghi e i consigli sui sentieri, proprio dove finisce il campo.",
    cta: "Aggiungi alla schermata Home",
    iosHint: "Su iPhone: il pulsante Condividi, poi «Aggiungi a Home».",
  },
  ro: {
    eyebrow: "📲 Luați Aglen cu voi",
    title: "Merge și fără semnal",
    body: "Adăugați site-ul pe ecranul principal și paginile pe care le-ați deschis rămân lizibile fără internet — traseele, locurile și sfaturile despre poteci, exact acolo unde se termină semnalul.",
    cta: "Adaugă pe ecranul principal",
    iosHint: "Pe iPhone: butonul Partajare, apoi „Adaugă pe ecranul principal”.",
  },
  tr: {
    eyebrow: "📲 Aglen'i yanınıza alın",
    title: "Sinyal olmadan da çalışır",
    body: "Siteyi ana ekrana ekleyin; açtığınız sayfalar internetsiz de okunur — rotalar, yerler ve patikalarla ilgili öneriler, tam da çekimin bittiği yerde.",
    cta: "Ana ekrana ekle",
    iosHint: "iPhone'da: Paylaş düğmesi, sonra „Ana Ekrana Ekle“.",
  },
  el: {
    eyebrow: "📲 Πάρτε το Άγκλεν μαζί σας",
    title: "Λειτουργεί και χωρίς σήμα",
    body: "Προσθέστε τον ιστότοπο στην αρχική οθόνη και οι σελίδες που έχετε ανοίξει παραμένουν αναγνώσιμες χωρίς ίντερνετ — οι διαδρομές, τα μέρη και οι συμβουλές για τα μονοπάτια, ακριβώς εκεί που τελειώνει το σήμα.",
    cta: "Προσθήκη στην αρχική οθόνη",
    iosHint: "Στο iPhone: το κουμπί Κοινή χρήση και μετά «Στην οθόνη Αφετηρίας».",
  },
  ru: {
    eyebrow: "📲 Возьмите Аглен с собой",
    title: "Работает и без сигнала",
    body: "Добавьте сайт на главный экран — и страницы, которые вы открывали, останутся читаемыми без интернета: маршруты, места и советы о тропах, ровно там, где заканчивается связь.",
    cta: "Добавить на главный экран",
    iosHint: "На iPhone: кнопка «Поделиться», затем «На экран «Домой»».",
  },
  ja: {
    eyebrow: "📲 アグレンを持ち歩く",
    title: "電波がなくても読めます",
    body: "サイトをホーム画面に追加すると、一度開いたページはインターネットなしでも読めます——ルート、場所、道の状態についての助言が、ちょうど電波の切れるあたりで。",
    cta: "ホーム画面に追加",
    iosHint: "iPhone では、共有ボタンから「ホーム画面に追加」。",
  },
  sr: {
    eyebrow: "📲 Понесите Аглен са собом",
    title: "Ради и без сигнала",
    body: "Додајте сајт на почетни екран и странице које сте отворили остају читљиве без интернета — руте, места и савети о стазама, тачно тамо где сигнал престаје.",
    cta: "Додај на почетни екран",
    iosHint: "На iPhone-у: дугме Дели, па „На почетни екран“.",
  },
  zh: {
    eyebrow: "📲 把阿格伦带在身边",
    title: "没有信号也能看",
    body: "把网站添加到主屏幕，你打开过的页面在没有网络时仍可阅读——路线、地点与步道提示，恰好在信号中断的地方。",
    cta: "添加到主屏幕",
    iosHint: "在 iPhone 上：点「分享」，再选「添加到主屏幕」。",
  },
  hu: {
    eyebrow: "📲 Vigye magával Aglent",
    title: "Térerő nélkül is működik",
    body: "Tegye ki az oldalt a kezdőképernyőre, és a megnyitott lapok internet nélkül is olvashatók maradnak — az útvonalak, a helyek és az ösvényekről szóló tanácsok, pontosan ott, ahol elfogy a térerő.",
    cta: "Hozzáadás a kezdőképernyőhöz",
    iosHint: "iPhone-on: a Megosztás gomb, majd „Főképernyőhöz adás”.",
  },
};
