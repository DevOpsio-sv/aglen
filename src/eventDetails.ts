import type { EventItem } from "./locales/types";

// Full write-up for the children's photography contest, shown in the details
// dialog on /events. Bulgarian is the source text; English is provided for the
// other locales, which fall back to it (see `localize`).
export const childrenPhotoContestDetails: NonNullable<EventItem["details"]> = {
  intro: [
    {
      bg: "Улови красотата на Ъглен през своя обектив!",
      en: "Capture the beauty of Aglen through your lens!",
    },
    {
      bg: "Обичаш ли да снимаш? Виждаш ли красиви места, интересни моменти или забавни случки, които другите пропускат? Тогава този конкурс е точно за теб!",
      en: "Do you love taking photos? Do you notice beautiful places, interesting moments or funny scenes that others miss? Then this contest is just for you!",
    },
    {
      bg: "Каним всички деца и младежи до 18 години да се включат в първото издание на Детския фотографски конкурс на село Ъглен и да покажат своя поглед към природата, живота и красотата на селото.",
      en: "We invite all children and young people up to the age of 18 to take part in the first edition of the Aglen Children's Photography Contest and to show their own view of the nature, the life and the beauty of the village.",
    },
  ],
  sections: [
    {
      title: { bg: "Категории", en: "Categories" },
      sections: [
        {
          title: { bg: "„Природна красота“", en: "“Natural beauty”" },
          body: {
            bg: "Покажи великолепието на природата около Ъглен. Можеш да снимаш:",
            en: "Show the splendour of the nature around Aglen. You can photograph:",
          },
          items: [
            { bg: "река Вит", en: "the Vit River" },
            { bg: "скалите", en: "the rocks" },
            { bg: "мостовете", en: "the bridges" },
            { bg: "горите", en: "the forests" },
            { bg: "изгреви и залези", en: "sunrises and sunsets" },
            { bg: "цветя", en: "flowers" },
            { bg: "диви животни", en: "wild animals" },
            { bg: "красиви природни гледки", en: "beautiful natural views" },
          ],
          note: {
            bg: "Търсим снимки, които показват уникалната природа на района.",
            en: "We are looking for photos that show the unique nature of the area.",
          },
        },
        {
          title: { bg: "„Утро на село“", en: "“Morning in the village”" },
          body: {
            bg: "Как започва денят в Ъглен? Улови атмосферата на ранното утро:",
            en: "How does the day begin in Aglen? Capture the atmosphere of the early morning:",
          },
          items: [
            { bg: "първите слънчеви лъчи", en: "the first rays of sun" },
            { bg: "улиците", en: "the streets" },
            { bg: "дворовете", en: "the yards" },
            { bg: "домашните животни", en: "the farm animals" },
            { bg: "хората, които започват деня си", en: "the people starting their day" },
            { bg: "мъглата над реката", en: "the mist over the river" },
            { bg: "спокойствието на селото", en: "the calm of the village" },
          ],
          note: {
            bg: "Тук най-важни са светлината, настроението и емоцията.",
            en: "Here light, mood and emotion matter most.",
          },
        },
        {
          title: { bg: "„Най-забавен кадър“", en: "“Funniest shot”" },
          body: {
            bg: "Фотографията може да бъде и усмивка. Покажи весел момент:",
            en: "Photography can be a smile too. Show a cheerful moment:",
          },
          items: [
            { bg: "игри с приятели", en: "games with friends" },
            { bg: "домашни любимци", en: "pets" },
            { bg: "смешни ситуации", en: "funny situations" },
            { bg: "забавни физиономии", en: "funny faces" },
            { bg: "интересни моменти от ежедневието", en: "interesting everyday moments" },
          ],
          note: {
            bg: "Тази категория насърчава креативността и доброто настроение.",
            en: "This category rewards creativity and good spirits.",
          },
        },
      ],
    },
    {
      title: { bg: "Кой може да участва?", en: "Who can take part?" },
      body: {
        bg: "В конкурса могат да участват всички деца и младежи до 18-годишна възраст. Всеки участник може да изпрати до 3 фотографии – по една във всяка категория.",
        en: "The contest is open to all children and young people up to the age of 18. Each participant may send up to 3 photographs — one in each category.",
      },
    },
    {
      title: { bg: "Изисквания към снимките", en: "Photo requirements" },
      items: [
        { bg: "Формат: JPG или JPEG", en: "Format: JPG or JPEG" },
        { bg: "Максимален размер на файла: до 10 MB", en: "Maximum file size: up to 10 MB" },
        {
          bg: "Минимална резолюция: 3000 px по дългата страна (препоръчително)",
          en: "Minimum resolution: 3000 px on the long side (recommended)",
        },
        {
          bg: "Снимките трябва да бъдат авторски и заснети лично от участника.",
          en: "The photos must be the participant's own work, taken personally by them.",
        },
        {
          bg: "Позволяват се леки корекции (яркост, контраст, цветове, изрязване), но не и фотомонтаж или изображения, генерирани с изкуствен интелект.",
          en: "Light adjustments (brightness, contrast, colours, cropping) are allowed, but no photo montage or AI-generated images.",
        },
        { bg: "Всяка снимка трябва да има заглавие.", en: "Every photo must have a title." },
      ],
    },
    {
      title: { bg: "Изпращане на снимките", en: "Sending your photos" },
      body: {
        bg: "Снимките се изпращат до 20 август 2026 г. на aglen@lukovit.bg или чрез формата на www.aglen.bg. При изпращане е необходимо да бъдат посочени:",
        en: "Photos must be sent by 20 August 2026 to aglen@lukovit.bg or through the form on www.aglen.bg. Please include:",
      },
      items: [
        { bg: "име и фамилия на участника", en: "the participant's first and last name" },
        { bg: "възраст", en: "age" },
        { bg: "населено място", en: "town or village" },
        {
          bg: "телефон или имейл за връзка на родител/настойник",
          en: "a contact phone or email of a parent/guardian",
        },
        { bg: "категорията, в която участва всяка снимка", en: "the category each photo is entered in" },
      ],
    },
    {
      title: { bg: "Изложба", en: "Exhibition" },
      body: {
        bg: "Всички одобрени фотографии ще бъдат изложени в зала Ъглен в периода 20 – 28 август 2026 г.",
        en: "All approved photographs will be exhibited in the Aglen hall from 20 to 28 August 2026.",
      },
    },
    {
      title: { bg: "Награждаване", en: "Award ceremony" },
      body: {
        bg: "Победителят ще бъде обявен по време на традиционния Панаир на село Ъглен на 28 август 2026 г. от 19:30 часа.",
        en: "The winner will be announced during the traditional Aglen Village Fair on 28 August 2026 at 19:30.",
      },
    },
    {
      title: { bg: "Голямата награда", en: "The grand prize" },
      body: {
        bg: "🏆 Семеен билет за Музея на илюзиите – гр. София. Освен това победителят ще получи специална грамота, а всички участници – удостоверение за участие.",
        en: "🏆 A family ticket to the Museum of Illusions in Sofia. The winner also receives a special certificate of honour, and every participant a certificate of participation.",
      },
    },
    {
      title: { bg: "Авторски права и декларация", en: "Copyright and declaration" },
      body: {
        bg: "С изпращането на фотографиите участникът (или неговият родител/настойник, когато участникът е непълнолетен) декларира, че:",
        en: "By sending the photographs, the participant (or their parent/guardian, when the participant is a minor) declares that:",
      },
      items: [
        {
          bg: "снимките са негово лично авторско произведение;",
          en: "the photos are their own original work;",
        },
        {
          bg: "не нарушават авторски или други права на трети лица;",
          en: "they do not infringe the copyright or other rights of third parties;",
        },
        {
          bg: "предоставя на организаторите безвъзмездно, неизключително право да използват изпратените фотографии за популяризиране на конкурса, село Ъглен и бъдещи инициативи, включително в интернет страницата, социалните мрежи, изложби, рекламни и информационни материали, като винаги се посочва името на автора;",
          en: "they grant the organisers a free, non-exclusive right to use the submitted photographs to promote the contest, the village of Aglen and future initiatives — including on the website, social networks, exhibitions, advertising and information materials — always crediting the author by name;",
        },
        {
          bg: "отличената с първо място фотография може да бъде отпечатана във висококачествен формат и използвана за официални изложби, презентации, печатни материали и други инициативи, свързани с популяризирането на село Ъглен, като авторството на снимката винаги ще бъде отбелязвано.",
          en: "the first-prize photograph may be printed in high quality and used for official exhibitions, presentations, printed materials and other initiatives promoting the village of Aglen, with the author always credited.",
        },
      ],
    },
  ],
  outro: [
    {
      bg: "📷 Покажи света такъв, какъвто го виждаш ти!",
      en: "📷 Show the world the way you see it!",
    },
    {
      bg: "Всеки кадър разказва история. Очакваме с нетърпение да видим Ъглен през твоите очи!",
      en: "Every shot tells a story. We can't wait to see Aglen through your eyes!",
    },
  ],
};
