import { contentByLanguage } from "./content";
import type { LanguageCode } from "./locales/types";
import {
  AGLEN,
  LOVECH_PROVINCE,
  distanceFromAglenKm,
  regionName,
  regionNote,
  regionPlaces,
  sameAsUrls,
} from "./region";
import { buildRoutePath, type RouteId } from "./routes";
import { localizeTrust, trustPageByRoute, type TrustPage as TrustPageData } from "./trustPages";
import { uiTextByLanguage } from "./uiText";

// The four trust routes used to render the home page. This renders what they say
// instead, reusing the guide page's typography classes so nothing new is
// designed — only content that was missing is added.

const labels = {
  lastReviewed: { bg: "Последна редакция", en: "Last reviewed" },
  coordinates: { bg: "Координати", en: "Coordinates" },
  postcode: { bg: "Пощенски код", en: "Postcode" },
  municipality: { bg: "Община", en: "Municipality" },
  province: { bg: "Област", en: "Province" },
  openMap: { bg: "Отвори в Google Maps", en: "Open in Google Maps" },
  identifiers: { bg: "Външни идентификатори", en: "External identifiers" },
  nearbyTitle: { bg: "Близки места в Луковитския карст", en: "Nearby places in the Lukovit karst" },
  nearbyNote: {
    bg: "Разстоянията са по въздушна линия, изчислени от публикуваните координати. По път разстоянието винаги е по-голямо.",
    en: "Distances are straight-line, computed from the published coordinates. By road the distance is always greater.",
  },
  readMore: { bg: "Отвори страницата", en: "Open the page" },
  source: { bg: "Източник", en: "Source" },
} as const;

function label(key: keyof typeof labels, language: LanguageCode): string {
  const text = labels[key] as { bg: string; en: string };
  return language === "bg" ? text.bg : text.en;
}

export default function TrustPage({
  language,
  routeId,
  onNavigate,
}: {
  language: LanguageCode;
  routeId: RouteId;
  onNavigate: (path: string) => void;
}) {
  const page = trustPageByRoute.get(routeId as TrustPageData["routeId"]);
  if (!page) return null;

  const copy = contentByLanguage[language];
  const ui = uiTextByLanguage[language];
  const relatedLabel = (id: string) =>
    ui.trustLinks.find((link) => link.routeId === id)?.label ??
    (id === "contact" ? copy.contact.cta : id === "guides" ? copy.hub.title : copy.nav.business);

  return (
    <div className="guides-page trust-page">
      <section className="section-shell" aria-labelledby="trust-title">
        <div className="section-heading">
          <p className="eyebrow">{localizeTrust(page.eyebrow, language)}</p>
          <h1 id="trust-title">{localizeTrust(page.h1, language)}</h1>
          <p>{localizeTrust(page.intro, language)}</p>
          <p className="trust-reviewed">
            <strong>{label("lastReviewed", language)}:</strong>{" "}
            <time dateTime={page.lastReviewed}>{page.lastReviewed}</time>
          </p>
        </div>
      </section>

      <div className="section-shell guide-body">
        {page.routeId === "localSeo" && <LocationFacts language={language} />}

        {page.sections.map((section, index) => (
          <section className="guide-section" key={index}>
            <h2>{localizeTrust(section.heading, language)}</h2>
            {section.body.map((paragraph, bodyIndex) => (
              <p key={bodyIndex}>{localizeTrust(paragraph, language)}</p>
            ))}
            {section.list && (
              <ul className="guide-checklist">
                {section.list.map((item, itemIndex) => (
                  <li key={itemIndex}>{localizeTrust(item, language)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {page.routeId === "localSeo" && <NearbyPlaces language={language} onNavigate={onNavigate} />}

        <section className="guide-related" aria-labelledby="trust-related-title">
          <h2 id="trust-related-title">{ui.landing.internalLinks}</h2>
          <div className="hub-grid">
            {page.relatedRouteIds.map((id) => {
              const href = buildRoutePath(language, id as RouteId);
              return (
                <a
                  className="hub-card"
                  href={href}
                  key={id}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    onNavigate(href);
                  }}
                >
                  <span>{relatedLabel(id)}</span>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

/** The NAP block: name, address, position — the data local search asks for. */
function LocationFacts({ language }: { language: LanguageCode }) {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${AGLEN.latitude},${AGLEN.longitude}`;
  const lukovit = regionPlaces.find((place) => place.id === "lukovit");

  return (
    <aside className="guide-facts" aria-label={label("coordinates", language)}>
      <h2>{label("coordinates", language)}</h2>
      <dl>
        <div>
          <dt>{label("coordinates", language)}</dt>
          <dd>
            {AGLEN.latitude.toFixed(6)}, {AGLEN.longitude.toFixed(6)}
          </dd>
        </div>
        <div>
          <dt>{label("postcode", language)}</dt>
          <dd>{AGLEN.postalCode}</dd>
        </div>
        <div>
          <dt>{label("municipality", language)}</dt>
          <dd>{lukovit ? regionName(lukovit, language) : "Lukovit"}</dd>
        </div>
        <div>
          <dt>{label("province", language)}</dt>
          <dd>{regionName(LOVECH_PROVINCE, language)}</dd>
        </div>
      </dl>
      <p className="trust-links">
        <a href={mapHref} target="_blank" rel="noopener noreferrer">
          {label("openMap", language)}
        </a>
      </p>
      <p className="trust-links">
        <strong>{label("identifiers", language)}:</strong>{" "}
        {sameAsUrls(AGLEN).map((url) => (
          <a href={url} key={url} target="_blank" rel="noopener noreferrer nofollow">
            {new URL(url).hostname.replace("www.", "")}
          </a>
        ))}
      </p>
    </aside>
  );
}

/**
 * The regional cluster, closest first. Every row links to the page that covers
 * that place, which is what turns a list of names into internal linking.
 */
function NearbyPlaces({
  language,
  onNavigate,
}: {
  language: LanguageCode;
  onNavigate: (path: string) => void;
}) {
  const ordered = [...regionPlaces].sort(
    (a, b) => (distanceFromAglenKm(a) ?? Infinity) - (distanceFromAglenKm(b) ?? Infinity),
  );

  return (
    <section className="guide-places" aria-labelledby="nearby-title">
      <h2 id="nearby-title">{label("nearbyTitle", language)}</h2>
      <p className="guide-notice" role="note">
        {label("nearbyNote", language)}
      </p>
      <ul className="trust-nearby">
        {ordered.map((place) => {
          const km = distanceFromAglenKm(place);
          const href = place.guideSlug
            ? `/${language}/guides/${place.guideSlug}/`
            : place.routeId
              ? buildRoutePath(language, place.routeId as RouteId)
              : undefined;
          return (
            <li key={place.id}>
              <div>
                <strong>
                  {href ? (
                    <a
                      href={href}
                      onClick={(event) => {
                        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                        event.preventDefault();
                        onNavigate(href);
                      }}
                    >
                      {regionName(place, language)}
                    </a>
                  ) : (
                    regionName(place, language)
                  )}
                </strong>
                {km !== undefined && <span className="trust-nearby-km">≈ {km} km</span>}
              </div>
              <p>{regionNote(place, language)}</p>
              {sameAsUrls(place).length > 0 && (
                <p className="trust-links">
                  <span>{label("source", language)}:</span>{" "}
                  {sameAsUrls(place).map((url) => (
                    <a href={url} key={url} target="_blank" rel="noopener noreferrer nofollow">
                      {new URL(url).hostname.replace("www.", "")}
                    </a>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
