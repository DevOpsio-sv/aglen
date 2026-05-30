# Bulgarian Copy Audit

Generated: 2026-05-30T11:00:52.734Z
Source of truth: `src/locales/bg.ts`

## How To Use This

1. Review the Bulgarian source checklist below for spelling, tone, and factual accuracy.
2. Update each non-Bulgarian locale at the same object path as the Bulgarian source.
3. Use the per-language sections as the update brief: each row shows the Bulgarian source and the current target value that needs review.
4. Run `npm run i18n:audit` again until every locale has zero missing paths and no stale Bulgarian text.
5. Run `npm run build` before publishing.

## Summary

| Language | Text nodes | Missing | Non-text at BG path | Same as BG | Likely too short | Extra |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| de | 172 | 0 | 0 | 1 | 0 | 0 |
| el | 173 | 0 | 0 | 1 | 3 | 1 |
| en | 172 | 0 | 0 | 0 | 0 | 0 |
| es | 172 | 0 | 0 | 0 | 0 | 0 |
| fr | 173 | 0 | 0 | 1 | 0 | 1 |
| it | 173 | 0 | 0 | 1 | 1 | 1 |
| ja | 172 | 0 | 0 | 1 | 11 | 0 |
| pl | 173 | 0 | 0 | 1 | 2 | 1 |
| ro | 173 | 0 | 0 | 1 | 1 | 1 |
| ru | 172 | 0 | 0 | 7 | 0 | 0 |
| sr | 173 | 0 | 0 | 7 | 3 | 1 |
| tr | 173 | 0 | 0 | 1 | 2 | 1 |

## Bulgarian Source Checklist

Total Bulgarian text nodes: 172

| Path | Bulgarian text |
| --- | --- |
| `nav.home` | Начало |
| `nav.about` | За Ъглен |
| `nav.landmarks` | Забележителности |
| `nav.stay` | Настаняване |
| `nav.quests` | Hidden Bulgaria Quests |
| `ui.languageLabel` | Език |
| `ui.languageSelectAria` | Избор на език |
| `ui.modalCloseAria` | Затвори |
| `ui.mobileMenuAria` | Меню |
| `brand.name` | Ъглен |
| `brand.subtitle` | Село до река Вит |
| `hero.meta` | Северна България · река Вит · близо до Луковит |
| `hero.title` | ЪГЛЕН |
| `hero.subtitle` | Скритото съкровище на река Вит |
| `hero.lede` | Място, където варовикови скали, тиха гора, пещери и селски легенди се срещат. |
| `hero.primary` | Разгледай Ъглен |
| `hero.secondary` | Изтегли приложението |
| `hero.cue` | Открий долината |
| `hero.imageAlt` | Кинематографична гледка към речен каньон и селски пейзаж, вдъхновени от Ъглен |
| `statsLabel` | Защо да посетите Ъглен |
| `about.eyebrow` | История и местна памет |
| `about.title` | Пластове време край реката |
| `about.text` | Ъглен не е просто точка на картата. Разказът му събира пещери, речни пътеки, стари маршрути, селска памет и рядко име, което остава в съзнанието. |
| `legends.eyebrow` | Легенди и мистерии на Ъглен |
| `legends.title` | Някои места се откриват бавно. |
| `legends.text` | Най-силните истории тук не са шумни. Те живеят в местните имена, пещерните прагове, странните скални форми и завоите на реката. |
| `landmarks.eyebrow` | Места за откриване |
| `landmarks.title` | Каньон, река, пещери и селска тишина |
| `landmarks.text` | Компактна дестинация с рядка комбинация от природни забележителности и местни истории. Най-доброто посещение е спокойно: върви, слушай, снимай и остави място за откритие. |
| `landmarks.aria` | Маршрутни точки около Ъглен |
| `experiences.eyebrow` | Избери своя уикенд в Ъглен |
| `experiences.title` | Водени моменти, не туристически списък |
| `experiences.text` | Екскурзиите са оформени като ясни преживявания: достатъчно кратки за уикенд, достатъчно лични, за да се почувстват местни. |
| `experiences.cta` | Запитай за маршрута |
| `gallery.eyebrow` | Имерсивна галерия |
| `gallery.title` | Място, разказано чрез речна светлина и камък |
| `gallery.aria` | Галерия Ъглен |
| `stay.eyebrow` | Настаняване в Ъглен |
| `stay.title` | Остани близо до реката |
| `stay.text` | Ъглен предлага тихи варианти за нощувка сред природата. За конкретна наличност и резервации - свържи се с нас. |
| `quests.eyebrow` | Първото по рода си в България |
| `quests.title` | Истинско AR приключение до Ъглен |
| `quests.text` | Hidden Bulgaria Quests те завежда на реални места - с телефона си виждаш скрит 3D свят, решаваш загадки и следваш следите на Пазителя. Не симулация. Не музей. Истинско приключение на живо. |
| `quests.cta` | Изтегли и започни |
| `quests.features.0.title` | Добавена Реалност (AR) |
| `quests.features.0.text` | Насочи камерата към обозначено място и виж как скритият свят оживява пред очите ти — 3D персонажи, знаци и истории. |
| `quests.features.1.title` | GPS мисии на живо |
| `quests.features.1.text` | Пътешествията те водят до реални забележителности около Ъглен. Всяко място крие следваща улика. |
| `quests.features.2.title` | История, разказана различно |
| `quests.features.2.text` | Легендите на пещера Проходна оживяват като игра. Пазителят, пещерата, древните знаци - всичко е свързано в едно преживяване. |
| `ar.eyebrow` | AR приключение |
| `ar.title` | Погледни света на Пазителя |
| `ar.text` | С камерата на телефона си оживи скрития свят на Проходна. AR слоят разкрива истории, знаци и персонажи, невидими с просто око, но само на местата, където са се случили. |
| `ar.steps.0` | Изтегли Hidden Bulgaria Quests от Google Play |
| `ar.steps.1` | Отиди на обозначено AR място около Ъглен |
| `ar.steps.2` | Насочи камерата и виж скрития свят |
| `ar.cta` | Изтегли и започни |
| `app.eyebrow` | Изтегли приложението |
| `app.title` | Hidden Bulgaria Quests |
| `app.text` | Мобилно приложение за Android. Намери мисиите около Ъглен и тръгни на истинско приключение. |
| `app.badge` | Изтегли от Google Play |
| `app.note` | Налично за Android. iOS версия - очаквай скоро. |
| `contact.eyebrow` | Планирай посещение |
| `contact.title` | Прекарай уикенд там, където Вит пази тайните си. |
| `contact.text` | Попитай за маршрути, водени разходки, места за снимки, местни истории и практична информация за посетители. |
| `contact.notesTitle` | Бележки за посетители |
| `contact.noteOne` | Подходящо за природни разходки, фотография, речни гледки, пещери и местна памет. |
| `contact.noteTwo` | Носи удобни обувки, вода, защита от слънце и уважение към местните пространства. |
| `contact.cta` | Изпрати запитване |
| `highlights.0.label` | Скрита България |
| `highlights.0.value` | Тихо село край Вит |
| `highlights.0.detail` | За посетители, които предпочитат откриване, речни пътеки, скали, пещери и тишина. |
| `highlights.1.label` | Природа |
| `highlights.1.value` | Река, варовик, гора |
| `highlights.1.detail` | Пейзажът около селото е оформен от Вит, естествени скални форми, каньонни гледки и пещерен терен. |
| `highlights.2.label` | Идентичност |
| `highlights.2.value` | Рядкото име Ъглен |
| `highlights.2.detail` | Познато като единственото българско село, започващо с буквата 'Ъ'. |
| `timeline.0.title` | Палеолитни следи в близки пещери подсказват ранно човешко присъствие в района. |
| `timeline.0.detail` | Пещерите и варовиковите форми около поречието на Вит са част от по-дълбоката история на района. В туристическия разказ това може да се представи като пласт от време преди селото: земя, която е давала убежище, пътеки и наблюдателни точки много преди съвременните маршрути. |
| `timeline.1.title` | Римски път и укрепени останки свързват района със стари маршрути и движение. |
| `timeline.1.detail` | Старите пътища са важни, защото показват, че районът не е бил изолиран. Реката, скалите и високите места са помагали за ориентация, преминаване и защита. |
| `timeline.2.title` | Местната легенда за преселници от Чурек пази памет за заселване и убежище. |
| `timeline.2.detail` | Легендите не трябва да се представят като доказан архив, а като местна памет. Те дават човешко лице на мястото: хора, които търсят безопасност, започват отново и оставят имена, разкази и принадлежност. |
| `timeline.3.title` | Паметта за 1877 г. остава част от историческото уважение и идентичност на селото. |
| `timeline.3.detail` | Тази част трябва да бъде разказана спокойно и с уважение. Тя свързва Ъглен с по-широката национална памет, без да превръща сайта в учебник. |
| `timeline.4.title` | Днес Ъглен може да расте като тиха дестинация за екотуризъм, занаяти и бавно пътуване. |
| `timeline.4.detail` | Бъдещето на Ъглен е най-силно, ако остане автентично. Вместо масов туризъм — уикенд посещения, малки групи, фотографски маршрути и уважение към хората, реката и селската среда. |
| `mysteries.0.title` | Където реката изчезва от поглед |
| `mysteries.0.tag` | Скрити пътеки |
| `mysteries.0.description` | Вит не разкрива всичко наведнъж. Завоите, сенките и скалите превръщат разходката в търсене. |
| `mysteries.1.title` | Пещерните прагове |
| `mysteries.1.tag` | Камък и тишина |
| `mysteries.1.description` | Пещерите около района принадлежат на по-старата памет на земята: геоложка, човешка и символична. |
| `mysteries.2.title` | Скали с местни имена |
| `mysteries.2.tag` | Фолклорен пейзаж |
| `mysteries.2.description` | Имена като Дупката и Слончето правят пейзажа личен. Те са забележителности и истории едновременно. |
| `placesList.0.title` | Дупката |
| `placesList.0.tag` | Скална арка |
| `placesList.0.imageAlt` | Варовикова скална арка над реката край Ъглен |
| `placesList.0.description` | Естествена каменна арка над Вит, създадена за бавни разходки, тихи снимки и усещане за скрит маршрут. |
| `placesList.1.title` | Слончето |
| `placesList.1.tag` | Скална фигура |
| `placesList.1.imageAlt` | Каньон, река и варовикови скали край Ъглен |
| `placesList.1.description` | Игрива крайречна форма, която превръща обикновената разходка в малко откритие. |
| `placesList.2.title` | Червена стена |
| `placesList.2.tag` | Каньонна гледка |
| `placesList.2.imageAlt` | Каньонен пейзаж с река и село |
| `placesList.2.description` | Драматична среща на варовик, гора и речна светлина близо до селото. |
| `placesList.3.title` | Рачков вир |
| `placesList.3.tag` | Речен вир |
| `placesList.3.imageAlt` | Тих речен вир с варовиков бряг и гора |
| `placesList.3.description` | Спокойна природна точка за пауза край водата, пикник и по-бавен ритъм до Вит. |
| `placesList.4.title` | Св. Архангел Михаил |
| `placesList.4.tag` | Селска памет |
| `placesList.4.imageAlt` | Селска църква, каменна улица и зелена долина |
| `placesList.4.description` | Църквата от 1888 г. пази човешкия пласт от историята на Ъглен. |
| `placesList.5.title` | Калето |
| `placesList.5.tag` | Археология |
| `placesList.5.imageAlt` | Каменни останки на хълм над каньон и река |
| `placesList.5.description` | Място, свързано със стари маршрути, укрепена памет и дългия живот край реката. |
| `experiencesList.0.title` | Каньонна разходка |
| `experiencesList.0.duration` | 2-3 часа |
| `experiencesList.0.bestFor` | Първо посещение |
| `experiencesList.0.description` | Водени гледки към Вит, скални форми и местните имена зад пейзажа. |
| `experiencesList.1.title` | Речно фото пътешествие |
| `experiencesList.1.duration` | Полуден |
| `experiencesList.1.bestFor` | Фотографи |
| `experiencesList.1.description` | Подбрани места около реката, скалите, старите улици и меката естествена светлина. |
| `experiencesList.2.title` | Риболов край Вит |
| `experiencesList.2.duration` | 2 часа |
| `experiencesList.2.bestFor` | Бавно пътуване |
| `experiencesList.2.description` | Тих местен ритъм край водата с практични насоки и грижа към реката. |
| `experiencesList.3.title` | Уикенд бягство в Ъглен |
| `experiencesList.3.duration` | 2 дни |
| `experiencesList.3.bestFor` | Двойки и приятели |
| `experiencesList.3.description` | Разходки, пикник, занаяти и вечерен маршрут през селски истории. |
| `experiencesList.4.title` | Билки и селско знание |
| `experiencesList.4.duration` | 90 мин. |
| `experiencesList.4.bestFor` | Любопитни пътешественици |
| `experiencesList.4.description` | Разпознаване на билки, традиционна употреба и отговорно събиране. |
| `experiencesList.5.title` | Ученически ден за откриване |
| `experiencesList.5.duration` | 1 ден |
| `experiencesList.5.bestFor` | Ученически групи |
| `experiencesList.5.description` | Полеви маршрут през география, история, местни легенди и природозащита. |
| `galleryItems.0.title` | Каньонът на Вит |
| `galleryItems.0.alt` | Кинематографичен речен каньон и село при изгрев |
| `galleryItems.1.title` | Каменната арка |
| `galleryItems.1.alt` | Естествена варовикова арка над реката |
| `galleryItems.2.title` | Пещерна светлина |
| `galleryItems.2.alt` | Пещерен вход с топла светлина |
| `galleryItems.3.title` | Над скритата долина |
| `galleryItems.3.alt` | Въздушна гледка към река, скали и село |
| `mapStops.0.title` | Центърът на селото |
| `mapStops.0.detail` | Започни от човешкия мащаб на Ъглен: улици, църква, местна памет и ориентация. |
| `mapStops.1.title` | Пътеката край Вит |
| `mapStops.1.detail` | Следвай водата към тихи гледки, завои и сенчести места за фотография. |
| `mapStops.2.title` | Дупката |
| `mapStops.2.detail` | Естествен каменен праг и един от силните визуални символи на дестинацията. |
| `mapStops.3.title` | Пещери и скални форми |
| `mapStops.3.detail` | Открий по-стария пейзаж с внимание, местно водене и уважение към терена. |
| `accommodationList.0.title` | Стаи за гости |
| `accommodationList.0.type` | Настаняване в село |
| `accommodationList.0.description` | Тихо настаняване в местен дом, близо до природата и реката. |
| `accommodationList.1.title` | Лагерен терен |
| `accommodationList.1.type` | Къмпинг |
| `accommodationList.1.description` | Открито пространство за палатки с достъп до река Вит и природните маршрути. |
| `accommodationList.2.title` | Планинска вила |
| `accommodationList.2.type` | Вила |
| `accommodationList.2.description` | Уединена вила с гледка към каньона, подходяща за малки групи и уикенд бягства. |
| `sourceNotes.0` | Създаден от DevOpsio - www.devopsio.eu |
| `sourceNotes.1` | Всички изображения са от местни фотографи и са използвани с разрешение. |

## DE Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

_None._

### Extra Target-Language Paths

_None._


## EL Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `timeline.1.detail` | Старите пътища са важни, защото показват, че районът не е бил изолиран. Реката, скалите и високите места са помагали за ориентация, преминаване и защита. | Οι παλιοί δρόμοι δείχνουν ότι η περιοχή δεν ήταν απομονωμένη. |
| `timeline.2.detail` | Легендите не трябва да се представят като доказан архив, а като местна памет. Те дават човешко лице на мястото: хора, които търсят безопасност, започват отново и оставят имена, разкази и принадлежност. | Είναι τοπική μνήμη: άνθρωποι που αναζητούν ασφάλεια και αφήνουν ονόματα και ιστορίες. |
| `timeline.3.detail` | Тази част трябва да бъде разказана спокойно и с уважение. Тя свързва Ъглен с по-широката национална памет, без да превръща сайта в учебник. | Αυτό το στρώμα χρειάζεται ήρεμη και σεβαστική αφήγηση. |

### Extra Target-Language Paths

| Path | Current value |
| --- | --- |
| `sourceNotes.2` | Οι δημιουργημένες εικόνες είναι placeholders για τελικές εγκεκριμένες φωτογραφίες. |


## EN Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

_None._

### Likely Too Short

_None._

### Extra Target-Language Paths

_None._


## ES Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

_None._

### Likely Too Short

_None._

### Extra Target-Language Paths

_None._


## FR Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

_None._

### Extra Target-Language Paths

| Path | Current value |
| --- | --- |
| `sourceNotes.2` | Les visuels générés sont des placeholders pour des photos finales approuvées. |


## IT Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `timeline.0.detail` | Пещерите и варовиковите форми около поречието на Вит са част от по-дълбоката история на района. В туристическия разказ това може да се представи като пласт от време преди селото: земя, която е давала убежище, пътеки и наблюдателни точки много преди съвременните маршрути. | Le grotte e le forme calcaree del Vit sono lo strato più antico del territorio: rifugi, cammini e punti di osservazione. |

### Extra Target-Language Paths

| Path | Current value |
| --- | --- |
| `sourceNotes.2` | Le immagini generate sono placeholder per foto finali approvate. |


## JA Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `about.text` | Ъглен не е просто точка на картата. Разказът му събира пещери, речни пътеки, стари маршрути, селска памет и рядко име, което остава в съзнанието. | アグレンは地図上の一点ではありません。洞窟、川沿いの道、古いルート、村の記憶、そして忘れにくい名前が重なります。 |
| `legends.text` | Най-силните истории тук не са шумни. Те живеят в местните имена, пещерните прагове, странните скални форми и завоите на реката. | ここで強い物語は静かです。地名、洞窟の入口、不思議な岩、川の曲がり角に残っています。 |
| `landmarks.text` | Компактна дестинация с рядка комбинация от природни забележителности и местни истории. Най-доброто посещение е спокойно: върви, слушай, снимай и остави място за откритие. | 自然のランドマークと地元の物語がまとまった小さな目的地。急がず歩き、聞き、撮影し、発見を待つ場所です。 |
| `experiences.text` | Екскурзиите са оформени като ясни преживявания: достатъчно кратки за уикенд, достатъчно лични, за да се почувстват местни. | 週末に合う短さと、土地らしさを感じる個人的な体験です。 |
| `quests.features.2.text` | Легендите на пещера Проходна оживяват като игра. Пазителят, пещерата, древните знаци - всичко е свързано в едно преживяване. | アグレンの伝説がゲームになります。守護者、洞窟、川 — すべてが一つのライブ体験としてつながります。 |
| `ar.text` | С камерата на телефона си оживи скрития свят на Проходна. AR слоят разкрива истории, знаци и персонажи, невидими с просто око, но само на местата, където са се случили. | スマートフォンのカメラでアグレンの隠れた世界を生き生きとさせましょう。ARレイヤーが物語やキャラクターを、それが起きた場所で直接明かします。 |
| `timeline.0.detail` | Пещерите и варовиковите форми около поречието на Вит са част от по-дълбоката история на района. В туристическия разказ това може да се представи като пласт от време преди селото: земя, която е давала убежище, пътеки и наблюдателни точки много преди съвременните маршрути. | ヴィト川流域の洞窟と石灰岩の地形は、目的地の最も古い層として語れます。現代の旅よりずっと前から、避難場所、道、見晴らしの場所を与えてきた土地です。 |
| `timeline.1.detail` | Старите пътища са важни, защото показват, че районът не е бил изолиран. Реката, скалите и високите места са помагали за ориентация, преминаване и защита. | 古い道は、この地域が孤立していなかったことを示します。川、高台、石の地形は、移動、方向感覚、防御を支えていました。 |
| `timeline.2.detail` | Легендите не трябва да се представят като доказан архив, а като местна памет. Те дават човешко лице на мястото: хора, които търсят безопасност, започват отново и оставят имена, разкази и принадлежност. | この物語は確定した記録ではなく、土地の記憶として扱うのが自然です。安全を求め、新しく始め、名前と物語を残した人々の層を加えます。 |
| `timeline.3.detail` | Тази част трябва да бъде разказана спокойно и с уважение. Тя свързва Ъглен с по-широката национална памет, без да превръща сайта в учебник. | この部分は静かに、敬意をもって語るべきです。ページを教科書にせず、アグレンをブルガリアの広い記憶へつなげます。 |
| `timeline.4.detail` | Бъдещето на Ъглен е най-силно, ако остане автентично. Вместо масов туризъм — уикенд посещения, малки групи, фотографски маршрути и уважение към хората, реката и селската среда. | アグレンの強みは小さく本物であることです。週末訪問、ガイド散策、写真、手仕事、川沿いのルート、地域環境への敬意が未来を支えます。 |

### Extra Target-Language Paths

_None._


## PL Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `timeline.0.detail` | Пещерите и варовиковите форми около поречието на Вит са част от по-дълбоката история на района. В туристическия разказ това може да се представи като пласт от време преди селото: земя, която е давала убежище, пътеки и наблюдателни точки много преди съвременните маршрути. | Jaskinie i wapienne formy wokół Vit są najstarszą warstwą miejsca: schronienia, ścieżki i punkty obserwacyjne. |
| `timeline.3.detail` | Тази част трябва да бъде разказана спокойно и с уважение. Тя свързва Ъглен с по-широката национална памет, без да превръща сайта в учебник. | Tę warstwę warto opowiadać spokojnie i z szacunkiem. |

### Extra Target-Language Paths

| Path | Current value |
| --- | --- |
| `sourceNotes.2` | Wygenerowane obrazy są placeholderami dla finalnych zatwierdzonych zdjęć. |


## RO Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `timeline.2.detail` | Легендите не трябва да се представят като доказан архив, а като местна памет. Те дават човешко лице на мястото: хора, които търсят безопасност, започват отново и оставят имена, разкази и принадлежност. | Este memorie locală: oameni care caută siguranță, încep din nou și lasă nume și povești. |

### Extra Target-Language Paths

| Path | Current value |
| --- | --- |
| `sourceNotes.2` | Imaginile generate sunt placeholder pentru fotografii finale aprobate. |


## RU Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `ui.mobileMenuAria` | Меню | Меню |
| `highlights.1.label` | Природа | Природа |
| `placesList.5.tag` | Археология | Археология |
| `experiencesList.0.duration` | 2-3 часа | 2-3 часа |
| `experiencesList.2.duration` | 2 часа | 2 часа |
| `experiencesList.4.duration` | 90 мин. | 90 мин. |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

_None._

### Extra Target-Language Paths

_None._


## SR Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `ui.modalCloseAria` | Затвори | Затвори |
| `highlights.1.label` | Природа | Природа |
| `experiencesList.1.bestFor` | Фотографи | Фотографи |
| `experiencesList.4.duration` | 90 мин. | 90 мин. |
| `mapStops.2.title` | Дупката | Дупката |
| `accommodationList.2.title` | Планинска вила | Планинска вила |
| `accommodationList.2.type` | Вила | Вила |

### Likely Too Short

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `timeline.0.detail` | Пещерите и варовиковите форми около поречието на Вит са част от по-дълбоката история на района. В туристическия разказ това може да се представи като пласт от време преди селото: земя, която е давала убежище, пътеки и наблюдателни точки много преди съвременните маршрути. | Пећине и кречњачке форме око Вита су најстарији слој подручја: склоништа, стазе и видиковци пре модерних рута. |
| `timeline.2.detail` | Легендите не трябва да се представят като доказан архив, а като местна памет. Те дават човешко лице на мястото: хора, които търсят безопасност, започват отново и оставят имена, разкази и принадлежност. | То је локално памћење: људи који траже сигурност, почињу поново и остављају имена и приче. |
| `timeline.3.detail` | Тази част трябва да бъде разказана спокойно и с уважение. Тя свързва Ъглен с по-широката национална памет, без да превръща сайта в учебник. | Овај слој треба причати мирно и с поштовањем. |

### Extra Target-Language Paths

| Path | Current value |
| --- | --- |
| `sourceNotes.2` | Генерисане слике су привремене док се не одобре финалне фотографије. |


## TR Update Checklist

### Missing Bulgarian Paths

_None._

### Non-Text Values Where Bulgarian Has Text

_None._

### Same As Bulgarian

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `mapStops.2.title` | Дупката | Дупката |

### Likely Too Short

| Path | Bulgarian source | Current value |
| --- | --- | --- |
| `timeline.0.detail` | Пещерите и варовиковите форми около поречието на Вит са част от по-дълбоката история на района. В туристическия разказ това може да се представи като пласт от време преди селото: земя, която е давала убежище, пътеки и наблюдателни точки много преди съвременните маршрути. | Vit çevresindeki mağaralar ve kireçtaşı formları bölgenin en eski katmanıdır: sığınaklar, yollar ve gözlem noktaları. |
| `timeline.2.detail` | Легендите не трябва да се представят като доказан архив, а като местна памет. Те дават човешко лице на мястото: хора, които търсят безопасност, започват отново и оставят имена, разкази и принадлежност. | Bunu kesin arşiv değil, yerel hafıza olarak anlatmak doğru olur. |

### Extra Target-Language Paths

| Path | Current value |
| --- | --- |
| `sourceNotes.2` | Oluşturulan görseller final onaylı fotoğraflar için yer tutucudur. |

