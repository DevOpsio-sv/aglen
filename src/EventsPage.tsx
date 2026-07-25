import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { contentByLanguage } from "./content";
import type { EventCategory, EventDetailSection, EventItem, LanguageCode } from "./locales/types";
import { localize, memoriesGallery, sortedEvents } from "./events";
import {
  categoryLabel,
  categoryOrder,
  eventsUiByLanguage,
  seasonEmoji,
  seasonLabel,
  seasonOrder,
} from "./eventsUi";

import { imageProps } from "./images";

const fallbackImage = "/assets/aglen-hero-river-canyon.webp";

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.src.endsWith(fallbackImage)) return;
  image.src = fallbackImage;
}

type EventStatus = "upcoming" | "active" | "past";

// "upcoming" is first: visitors land on what is coming next, not on a calendar grid.
type View = "upcoming" | "calendar" | "past";
const VIEWS: View[] = ["upcoming", "calendar", "past"];

// ── date helpers ─────────────────────────────────────────────
function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function ymd(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function daysBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / 86_400_000);
}
function statusOf(event: EventItem, today: Date): EventStatus {
  const start = parseDate(event.startDate);
  const end = event.endDate ? parseDate(event.endDate) : start;
  const t = startOfDay(today).getTime();
  if (t < startOfDay(start).getTime()) return "upcoming";
  if (t > startOfDay(end).getTime()) return "past";
  return "active";
}

export default function EventsPage({ language }: { language: LanguageCode }) {
  const ui = eventsUiByLanguage[language];
  const copy = contentByLanguage[language];
  const eventsCopy = copy.events;

  // A single "now" for the render pass. new Date() is fine in a client component.
  const today = useMemo(() => startOfDay(new Date()), []);
  const allEvents = useMemo(() => sortedEvents(), []);

  const upcomingEvents = useMemo(
    () =>
      allEvents
        .filter((e) => statusOf(e, today) !== "past")
        .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [allEvents, today],
  );
  const pastEvents = useMemo(
    () => allEvents.filter((e) => statusOf(e, today) === "past").sort((a, b) => b.startDate.localeCompare(a.startDate)),
    [allEvents, today],
  );

  // The calendar opens on the month of the next event rather than on a (usually
  // empty) current month, so it never looks dead on first paint.
  const defaultMonth = useMemo(() => {
    const base = upcomingEvents[0] ? parseDate(upcomingEvents[0].startDate) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [upcomingEvents, today]);

  // ── URL-synced state ───────────────────────────────────────
  const readParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("view");
    const view: View = VIEWS.includes(v as View) ? (v as View) : "upcoming";
    const monthParam = params.get("month");
    let month = defaultMonth;
    if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
      const [y, m] = monthParam.split("-").map(Number);
      month = new Date(y, m - 1, 1);
    }
    const cat = params.get("category");
    const category: EventCategory | "all" = categoryOrder.includes(cat as EventCategory) ? (cat as EventCategory) : "all";
    return { view, month, category };
  }, [defaultMonth]);

  const [view, setView] = useState<View>(() => (typeof window === "undefined" ? "upcoming" : readParams().view));
  const [month, setMonth] = useState<Date>(() => (typeof window === "undefined" ? defaultMonth : readParams().month));
  const [category, setCategory] = useState<EventCategory | "all">(() =>
    typeof window === "undefined" ? "all" : readParams().category,
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);
  const [detailsEvent, setDetailsEvent] = useState<EventItem | null>(null);

  // Sync state → URL (replaceState keeps the /events/ path, adds the query).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("view", view);
    if (view === "calendar") {
      params.set("month", `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`);
    } else {
      params.delete("month");
    }
    if (category !== "all") params.set("category", category);
    else params.delete("category");
    const search = params.toString();
    const next = `${window.location.pathname}${search ? `?${search}` : ""}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, "", next);
    }
  }, [view, month, category]);

  // Sync URL → state on back/forward.
  useEffect(() => {
    const onPop = () => {
      const p = readParams();
      setView(p.view);
      setMonth(p.month);
      setCategory(p.category);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [readParams]);

  const filteredEvents = useMemo(
    () => (category === "all" ? allEvents : allEvents.filter((e) => e.category === category)),
    [allEvents, category],
  );

  const openImage = useCallback<OpenImage>((images, index) => setLightbox({ images, index }), []);
  const openDetails = useCallback((event: EventItem) => setDetailsEvent(event), []);

  const changeView = (next: View) => {
    setSelectedDay(null);
    setView(next);
    document.getElementById("events-views")?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className="events-page-v2">
      <EventsHero ui={ui} title={eventsCopy.title} />

      <ViewTabs ui={ui} view={view} onChange={changeView} />

      <div id="events-views" className="events-views section-shell">
        {view === "calendar" && (
          <CalendarView
            key="calendar"
            ui={ui}
            language={language}
            month={month}
            setMonth={setMonth}
            today={today}
            events={filteredEvents}
            category={category}
            setCategory={setCategory}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            dateLabel={eventsCopy.dateLabel}
            locationLabel={eventsCopy.locationLabel}
            onOpenImage={openImage}
            onOpenDetails={openDetails}
          />
        )}
        {view === "upcoming" && (
          <UpcomingView
            key="upcoming"
            ui={ui}
            language={language}
            today={today}
            events={upcomingEvents}
            locationLabel={eventsCopy.locationLabel}
            onOpenImage={openImage}
            onOpenDetails={openDetails}
          />
        )}
        {view === "past" && (
          <PastView key="past" ui={ui} language={language} events={pastEvents} onOpenGallery={(imgs) => setLightbox({ images: imgs, index: 0 })} />
        )}
      </div>

      <SeasonTimeline ui={ui} language={language} events={allEvents} />

      <PhotoMemories
        ui={ui}
        items={memoriesGallery.map((m) => {
          const label = localize(m.title, language);
          return { src: m.src, alt: label, title: label };
        })}
        onOpen={(images, index) => setLightbox({ images, index })}
      />

      {detailsEvent && (
        <EventDetailsDialog
          ui={ui}
          event={detailsEvent}
          language={language}
          copy={{ closeAria: copy.ui.modalCloseAria, dateLabel: eventsCopy.dateLabel, locationLabel: eventsCopy.locationLabel }}
          onClose={() => setDetailsEvent(null)}
        />
      )}

      {lightbox && <Lightbox ui={ui} state={lightbox} onClose={() => setLightbox(null)} onNavigate={(i) => setLightbox({ ...lightbox, index: i })} />}
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function EventsHero({ ui, title }: { ui: ReturnType<typeof getUi>; title: string }) {
  return (
    <section className="events-hero" aria-labelledby="events-hero-title">
      <img className="events-hero-bg" {...imageProps("/assets/aglen-vit-river-sunset.png")} alt="" aria-hidden="true" fetchPriority="high" decoding="async" onError={handleImageError} />
      <div className="events-hero-overlay" aria-hidden="true" />
      <div className="events-hero-inner section-shell">
        <p className="eyebrow events-hero-eyebrow">{ui.timelineEyebrow}</p>
        <h1 id="events-hero-title">{title}</h1>
        <p className="events-hero-sub">{ui.heroSubtitle}</p>
        <a
          className="button primary events-hero-cta"
          href="#events-views"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("events-views")?.scrollIntoView({ block: "start", behavior: "smooth" });
          }}
        >
          {ui.heroCta}
        </a>
      </div>
    </section>
  );
}

// helper to get the UI type without exporting it
function getUi(l: LanguageCode) {
  return eventsUiByLanguage[l];
}

// ── View tabs (tablist) ──────────────────────────────────────
function ViewTabs({ ui, view, onChange }: { ui: ReturnType<typeof getUi>; view: View; onChange: (v: View) => void }) {
  const labels: Record<View, string> = { calendar: ui.viewCalendar, upcoming: ui.viewUpcoming, past: ui.viewPast };
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: ReactKeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % VIEWS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + VIEWS.length) % VIEWS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = VIEWS.length - 1;
    else return;
    e.preventDefault();
    onChange(VIEWS[next]);
    refs.current[next]?.focus();
  };

  return (
    <div className="events-tabs-shell">
      <div className="events-tabs" role="tablist" aria-label={ui.tablistLabel}>
        {VIEWS.map((v, i) => (
          <button
            key={v}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`events-tab-${v}`}
            aria-selected={view === v}
            aria-controls="events-views"
            tabIndex={view === v ? 0 : -1}
            className={`events-tab${view === v ? " is-active" : ""}`}
            onClick={() => onChange(v)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {labels[v]}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Shared bits ──────────────────────────────────────────────
type OpenImage = (images: { src: string; alt: string }[], index: number) => void;

// Event artwork. Landscape photos fill the frame; portrait posters are shown
// whole — letterboxed over a blurred copy of themselves — and open full size.
function EventMedia({
  ui,
  event,
  language,
  className,
  onOpenImage,
  children,
}: {
  ui: ReturnType<typeof getUi>;
  event: EventItem;
  language: LanguageCode;
  className: string;
  onOpenImage?: OpenImage;
  children?: ReactNode;
}) {
  const alt = event.imageAlt ?? localize(event.title, language);
  const src = event.image || fallbackImage;
  const { poster } = event;
  return (
    <div className={`${className}${poster ? " is-poster" : ""}`}>
      {poster && <img className="event-media-blur" {...imageProps(src, { variant: "card" })} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
      <img className="event-media-img" {...imageProps(src, { variant: "card" })} alt={alt} loading="lazy" decoding="async" onError={handleImageError} />
      {poster && onOpenImage && (
        <button type="button" className="event-poster-zoom" onClick={() => onOpenImage([{ src: poster, alt }], 0)}>
          <span aria-hidden="true">⤢</span> {ui.viewPoster}
        </button>
      )}
      {children}
    </div>
  );
}

function CategoryChip({ ui, category }: { ui: ReturnType<typeof getUi>; category?: EventCategory }) {
  if (!category) return null;
  return (
    <span className="event-chip" data-category={category}>
      {categoryLabel(ui, category)}
    </span>
  );
}

function Countdown({ ui, today, startDate, status }: { ui: ReturnType<typeof getUi>; today: Date; startDate: string; status: EventStatus }) {
  if (status === "active") return <span className="event-countdown is-live">● {ui.liveNow}</span>;
  const days = daysBetween(today, parseDate(startDate));
  if (days <= 0) return null;
  if (days === 0) return <span className="event-countdown">{ui.todayLabel}</span>;
  return (
    <span className="event-countdown">
      <strong>{days}</strong> {ui.daysUnit} {ui.countdownSuffix}
    </span>
  );
}

function CategoryFilters({
  ui,
  category,
  setCategory,
  available,
}: {
  ui: ReturnType<typeof getUi>;
  category: EventCategory | "all";
  setCategory: (c: EventCategory | "all") => void;
  available: Set<EventCategory>;
}) {
  return (
    <div className="events-filters" role="group" aria-label={ui.filterAll}>
      <button type="button" className={`events-filter${category === "all" ? " is-active" : ""}`} onClick={() => setCategory("all")}>
        {ui.filterAll}
      </button>
      {categoryOrder
        .filter((c) => available.has(c))
        .map((c) => (
          <button
            key={c}
            type="button"
            data-category={c}
            className={`events-filter${category === c ? " is-active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {categoryLabel(ui, c)}
          </button>
        ))}
    </div>
  );
}

// ── Event card ───────────────────────────────────────────────
function EventCard({
  ui,
  event,
  language,
  today,
  locationLabel,
  onOpenImage,
  onOpenDetails,
}: {
  ui: ReturnType<typeof getUi>;
  event: EventItem;
  language: LanguageCode;
  today: Date;
  locationLabel: string;
  onOpenImage?: OpenImage;
  onOpenDetails?: (event: EventItem) => void;
}) {
  const status = statusOf(event, today);
  return (
    <article className="event-card">
      <EventMedia ui={ui} event={event} language={language} className="event-card-media" onOpenImage={onOpenImage}>
        <span className="event-date-badge">{event.dateLabel}</span>
        {status === "active" && <span className="event-live-badge">● {ui.liveNow}</span>}
      </EventMedia>
      <div className="event-card-body">
        <div className="event-card-meta">
          <CategoryChip ui={ui} category={event.category} />
          <Countdown ui={ui} today={today} startDate={event.startDate} status={status} />
        </div>
        <h3>{localize(event.title, language)}</h3>
        <p className="event-card-loc">
          <span aria-hidden="true">📍</span> {locationLabel}: {event.location}
        </p>
        <p className="event-card-desc">{localize(event.description, language)}</p>
        <div className="event-card-actions">
          {event.ctaUrl ? (
            <a className="button primary event-card-cta" href={event.ctaUrl} target="_blank" rel="noopener noreferrer">
              {event.ctaLabel ? localize(event.ctaLabel, language) : ui.viewEvent}
            </a>
          ) : (
            !event.details && <span className="event-card-more">{ui.learnMore} →</span>
          )}
          {event.details && onOpenDetails && (
            <button type="button" className="button ghost" onClick={() => onOpenDetails(event)}>
              {ui.viewDetails}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Upcoming view ────────────────────────────────────────────
function UpcomingView({
  ui,
  language,
  today,
  events,
  locationLabel,
  onOpenImage,
  onOpenDetails,
}: {
  ui: ReturnType<typeof getUi>;
  language: LanguageCode;
  today: Date;
  events: EventItem[];
  locationLabel: string;
  onOpenImage: OpenImage;
  onOpenDetails: (event: EventItem) => void;
}) {
  if (events.length === 0) {
    return <EmptyState title={ui.upcomingTitle} message={ui.emptyUpcoming} />;
  }
  const [featured, ...rest] = events;
  const status = statusOf(featured, today);

  // group rest by month
  const groups = groupByMonth(rest, language);

  return (
    <section className="events-view events-upcoming" aria-labelledby="upcoming-heading">
      <header className="events-section-head">
        <p className="eyebrow">{ui.upcomingEyebrow}</p>
        <h2 id="upcoming-heading">{ui.upcomingTitle}</h2>
      </header>

      <article className="event-featured">
        <EventMedia ui={ui} event={featured} language={language} className="event-featured-media" onOpenImage={onOpenImage}>
          <span className="event-featured-tag">{ui.featured}</span>
        </EventMedia>
        <div className="event-featured-body">
          <div className="event-card-meta">
            <CategoryChip ui={ui} category={featured.category} />
            <Countdown ui={ui} today={today} startDate={featured.startDate} status={status} />
          </div>
          <h3>{localize(featured.title, language)}</h3>
          <p className="event-featured-when">
            <span aria-hidden="true">🗓</span> {featured.dateLabel}
            {featured.startTime ? ` · ${featured.startTime}` : ""}
          </p>
          <p className="event-card-loc">
            <span aria-hidden="true">📍</span> {locationLabel}: {featured.location}
          </p>
          <p className="event-featured-desc">{localize(featured.description, language)}</p>
          <div className="event-card-actions">
            {featured.ctaUrl ? (
              <a className="button primary" href={featured.ctaUrl} target="_blank" rel="noopener noreferrer">
                {featured.ctaLabel ? localize(featured.ctaLabel, language) : ui.viewEvent}
              </a>
            ) : (
              !featured.details && <span className="button primary event-featured-cta-static">{ui.viewEvent}</span>
            )}
            {featured.details && (
              <button type="button" className="button ghost" onClick={() => onOpenDetails(featured)}>
                {ui.viewDetails}
              </button>
            )}
          </div>
        </div>
      </article>

      {groups.map((group) => (
        <div className="events-month-group" key={group.key}>
          <h3 className="events-month-title">{group.label}</h3>
          <div className="events-grid">
            {group.events.map((e) => (
              <EventCard
                key={e.id}
                ui={ui}
                event={e}
                language={language}
                today={today}
                locationLabel={locationLabel}
                onOpenImage={onOpenImage}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// ── Past view ────────────────────────────────────────────────
function PastView({
  ui,
  language,
  events,
  onOpenGallery,
}: {
  ui: ReturnType<typeof getUi>;
  language: LanguageCode;
  events: EventItem[];
  onOpenGallery: (imgs: { src: string; alt: string }[]) => void;
}) {
  if (events.length === 0) {
    return <EmptyState title={ui.pastTitle} message={ui.emptyPast} />;
  }
  const years = new Map<number, EventItem[]>();
  for (const e of events) {
    const y = parseDate(e.startDate).getFullYear();
    years.set(y, [...(years.get(y) ?? []), e]);
  }
  const sortedYears = [...years.keys()].sort((a, b) => b - a);

  return (
    <section className="events-view events-past" aria-labelledby="past-heading">
      <header className="events-section-head">
        <p className="eyebrow">{ui.pastEyebrow}</p>
        <h2 id="past-heading">{ui.pastTitle}</h2>
      </header>
      {sortedYears.map((year) => (
        <div className="events-year-group" key={year}>
          <h3 className="events-year-title">{year}</h3>
          <div className="events-grid">
            {(years.get(year) ?? []).map((e) => {
              const gallery = (e.gallery ?? []).map((src) => ({ src, alt: localize(e.title, language) }));
              return (
                <article className="event-card is-past" key={e.id}>
                  <div className="event-card-media">
                    <img {...imageProps(e.image || fallbackImage, { variant: "card" })} alt={e.imageAlt ?? localize(e.title, language)} loading="lazy" decoding="async" onError={handleImageError} />
                    <span className="event-date-badge">{e.dateLabel}</span>
                  </div>
                  <div className="event-card-body">
                    <div className="event-card-meta">
                      <CategoryChip ui={ui} category={e.category} />
                      {gallery.length > 0 && (
                        <span className="event-photo-count">
                          {gallery.length} {ui.photosUnit}
                        </span>
                      )}
                    </div>
                    <h3>{localize(e.title, language)}</h3>
                    <p className="event-card-desc">{localize(e.description, language)}</p>
                    {gallery.length > 0 && (
                      <button type="button" className="button ghost event-card-cta" onClick={() => onOpenGallery(gallery)}>
                        {ui.viewGallery}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

// ── Calendar view ────────────────────────────────────────────
function CalendarView({
  ui,
  language,
  month,
  setMonth,
  today,
  events,
  category,
  setCategory,
  selectedDay,
  setSelectedDay,
  dateLabel,
  locationLabel,
  onOpenImage,
  onOpenDetails,
}: {
  ui: ReturnType<typeof getUi>;
  language: LanguageCode;
  month: Date;
  setMonth: (d: Date) => void;
  today: Date;
  events: EventItem[];
  category: EventCategory | "all";
  setCategory: (c: EventCategory | "all") => void;
  selectedDay: string | null;
  setSelectedDay: (d: string | null) => void;
  dateLabel: string;
  locationLabel: string;
  onOpenImage: OpenImage;
  onOpenDetails: (event: EventItem) => void;
}) {
  const available = useMemo(() => {
    const s = new Set<EventCategory>();
    for (const e of sortedEvents()) if (e.category) s.add(e.category);
    return s;
  }, []);

  const monthFmt = useMemo(() => new Intl.DateTimeFormat(language, { month: "long", year: "numeric" }), [language]);
  const weekdayFmt = useMemo(() => new Intl.DateTimeFormat(language, { weekday: "short" }), [language]);

  // Map date → events (only ones intersecting the day within month)
  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      const start = parseDate(e.startDate);
      const end = e.endDate ? parseDate(e.endDate) : start;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = ymd(d);
        map.set(key, [...(map.get(key) ?? []), e]);
      }
    }
    return map;
  }, [events]);

  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const leading = (first.getDay() + 6) % 7; // Monday-first offset
  const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;

  const weekdayLabels = useMemo(() => {
    // Monday-first weekday short names via Intl (2024-01-01 is a Monday)
    return Array.from({ length: 7 }, (_, i) => weekdayFmt.format(new Date(2024, 0, 1 + i)));
  }, [weekdayFmt]);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));

  // Days of this month that hold events, ascending — drives the auto-selection
  // and the "jump to the next event" arrows.
  const monthDays = useMemo(
    () => [...eventsByDay.keys()].filter((k) => k.startsWith(monthKey)).sort(),
    [eventsByDay, monthKey],
  );

  // Slide direction for the month transition (-1 back, 1 forward).
  const [dir, setDir] = useState(1);

  // Never leave the panel empty: opening a month preselects its first event day.
  useEffect(() => {
    setSelectedDay(monthDays[0] ?? null);
  }, [monthDays, setSelectedDay]);

  const goToMonth = (delta: number) => {
    setDir(delta < 0 ? -1 : 1);
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
  };
  const goToday = () => {
    setDir(month.getTime() > today.getTime() ? -1 : 1);
    setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // ←/→ anywhere in the grid flips the month.
  const onGridKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowLeft") goToMonth(-1);
    else if (e.key === "ArrowRight") goToMonth(1);
    else return;
    e.preventDefault();
  };

  const selectedEvents = selectedDay ? eventsByDay.get(selectedDay) ?? [] : [];

  // Month agenda: all events in this month, sorted by day
  const monthAgenda = useMemo(() => {
    const list: { day: Date; event: EventItem }[] = [];
    for (const key of monthDays) {
      const d = parseDate(key);
      for (const e of eventsByDay.get(key) ?? []) list.push({ day: d, event: e });
    }
    return list;
  }, [eventsByDay, monthDays]);

  return (
    <section className="events-view events-calendar" aria-labelledby="calendar-heading">
      <header className="events-section-head">
        <p className="eyebrow">{ui.timelineEyebrow}</p>
        <h2 id="calendar-heading">{ui.viewCalendar}</h2>
      </header>

      <CategoryFilters ui={ui} category={category} setCategory={setCategory} available={available} />

      <div className="cal-layout">
        {/* Compact month picker */}
        <div className="cal-card">
          <div className="cal-toolbar">
            <button type="button" className="cal-nav" aria-label={ui.prevMonth} onClick={() => goToMonth(-1)}>
              ‹
            </button>
            <h3 className="cal-month" aria-live="polite">
              {monthFmt.format(month)}
            </h3>
            <button type="button" className="cal-nav" aria-label={ui.nextMonth} onClick={() => goToMonth(1)}>
              ›
            </button>
          </div>

          <div className="cal-grid" role="grid" aria-label={monthFmt.format(month)} tabIndex={0} onKeyDown={onGridKeyDown}>
            <div className="cal-weekdays" role="row">
              {weekdayLabels.map((w) => (
                <span key={w} role="columnheader" className="cal-weekday">
                  {w}
                </span>
              ))}
            </div>
            <div className="cal-days" key={monthKey} data-dir={dir}>
              {cells.map((date, i) => {
                if (!date) return <span key={`e${i}`} className="cal-cell is-empty" aria-hidden="true" />;
                const key = ymd(date);
                const dayEvents = eventsByDay.get(key) ?? [];
                const isToday = key === ymd(today);
                const isSelected = key === selectedDay;
                const hasEvents = dayEvents.length > 0;
                return (
                  <button
                    key={key}
                    type="button"
                    role="gridcell"
                    className={`cal-cell${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}${hasEvents ? " has-events" : ""}`}
                    style={{ animationDelay: `${Math.min(i, 34) * 12}ms` }}
                    aria-label={`${new Intl.DateTimeFormat(language, { day: "numeric", month: "long" }).format(date)}${hasEvents ? ` — ${dayEvents.length}` : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedDay(key)}
                    disabled={!hasEvents}
                  >
                    <span className="cal-daynum">{date.getDate()}</span>
                    {hasEvents && (
                      <span className="cal-dots" aria-hidden="true">
                        {dayEvents.slice(0, 3).map((e, di) => (
                          <span key={di} className="cal-dot" data-category={e.category ?? "culture"} />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="button" className="cal-today" onClick={goToday}>
            {ui.backToToday}
          </button>

          {/* Month at a glance */}
          <div className="cal-agenda">
            {monthAgenda.length === 0 ? (
              <p className="events-empty-inline">{ui.emptyMonth}</p>
            ) : (
              monthAgenda.map(({ day, event }, i) => {
                const key = ymd(day);
                return (
                  <button
                    key={`${event.id}-${i}`}
                    type="button"
                    className={`cal-agenda-row${key === selectedDay ? " is-active" : ""}`}
                    onClick={() => setSelectedDay(key)}
                  >
                    <span className="cal-agenda-date">
                      <strong>{day.getDate()}</strong>
                      <span>{new Intl.DateTimeFormat(language, { weekday: "short" }).format(day)}</span>
                    </span>
                    <span className="cal-agenda-info">
                      <CategoryChip ui={ui} category={event.category} />
                      <span className="cal-agenda-title">{localize(event.title, language)}</span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected day panel */}
        <div className="cal-day-panel" aria-live="polite">
          {selectedDay && selectedEvents.length > 0 ? (
            <div className="events-grid" key={selectedDay}>
              {selectedEvents.map((e) => (
                <EventCard
                  key={e.id}
                  ui={ui}
                  event={e}
                  language={language}
                  today={today}
                  locationLabel={locationLabel}
                  onOpenImage={onOpenImage}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
          ) : (
            <p className="cal-hint">{monthAgenda.length === 0 ? ui.emptyMonth : ui.selectDay}</p>
          )}
        </div>
      </div>
      <span className="cal-datelabel-sr" hidden>
        {dateLabel}
      </span>
    </section>
  );
}

// ── Season timeline ──────────────────────────────────────────
function SeasonTimeline({ ui, language, events }: { ui: ReturnType<typeof getUi>; language: LanguageCode; events: EventItem[] }) {
  const bySeason = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      const season = e.season ?? seasonFromDate(e.startDate);
      map.set(season, [...(map.get(season) ?? []), e]);
    }
    return map;
  }, [events]);

  return (
    <section className="events-timeline section-shell" aria-labelledby="season-heading">
      <header className="events-section-head is-center">
        <p className="eyebrow">{ui.timelineEyebrow}</p>
        <h2 id="season-heading">{ui.timelineTitle}</h2>
      </header>
      <div className="season-track">
        {seasonOrder.map((season) => {
          const evs = bySeason.get(season) ?? [];
          return (
            <article className="season-col" key={season} data-season={season}>
              <div className="season-head">
                <span className="season-emoji" aria-hidden="true">
                  {seasonEmoji[season]}
                </span>
                <h3>{seasonLabel(ui, season)}</h3>
              </div>
              <ul className="season-events">
                {evs.length > 0 ? (
                  evs.map((e) => (
                    <li key={e.id}>
                      <span className="season-dot" data-category={e.category ?? "culture"} aria-hidden="true" />
                      {localize(e.title, language)}
                    </li>
                  ))
                ) : (
                  <li className="season-empty">—</li>
                )}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function seasonFromDate(iso: string): string {
  const m = parseDate(iso).getMonth() + 1;
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "autumn";
  return "winter";
}

// ── Photo memories (masonry + lightbox) ──────────────────────
function PhotoMemories({
  ui,
  items,
  onOpen,
}: {
  ui: ReturnType<typeof getUi>;
  items: { src: string; alt: string; title: string }[];
  onOpen: (images: { src: string; alt: string }[], index: number) => void;
}) {
  if (items.length === 0) return null;
  const images = items.map((i) => ({ src: i.src, alt: i.alt }));
  return (
    <section className="events-memories section-shell" aria-labelledby="memories-heading">
      <header className="events-section-head is-center">
        <p className="eyebrow">{ui.memoriesEyebrow}</p>
        <h2 id="memories-heading">{ui.memoriesTitle}</h2>
      </header>
      <div className="memories-masonry">
        {items.map((item, i) => (
          <button key={item.src + i} type="button" className="memory-tile" onClick={() => onOpen(images, i)} aria-label={item.title}>
            <img {...imageProps(item.src || fallbackImage, { variant: "card", sizes: "(max-width: 700px) 46vw, 300px" })} alt={item.alt} loading="lazy" decoding="async" onError={handleImageError} />
            <span className="memory-tile-title">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Event details dialog (contest rules, programme, …) ───────
function DetailSectionBlock({
  section,
  language,
  level,
}: {
  section: EventDetailSection;
  language: LanguageCode;
  level: 1 | 2;
}) {
  const Heading = level === 1 ? "h3" : "h4";
  return (
    <section className={`event-details-section is-level-${level}`}>
      <Heading>{localize(section.title, language)}</Heading>
      {section.body && <p>{localize(section.body, language)}</p>}
      {section.items && (
        <ul>
          {section.items.map((item, i) => (
            <li key={i}>{localize(item, language)}</li>
          ))}
        </ul>
      )}
      {section.note && <p className="event-details-note">{localize(section.note, language)}</p>}
      {section.sections?.map((sub, i) => (
        <DetailSectionBlock key={i} section={sub} language={language} level={2} />
      ))}
    </section>
  );
}

function EventDetailsDialog({
  ui,
  event,
  language,
  copy,
  onClose,
}: {
  ui: ReturnType<typeof getUi>;
  event: EventItem;
  language: LanguageCode;
  copy: { closeAria: string; dateLabel: string; locationLabel: string };
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const details = event.details;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!details) return null;

  return (
    <div className="event-details-modal" onClick={onClose}>
      <article
        className="event-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-details-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal-close" aria-label={copy.closeAria} onClick={onClose}>
          ×
        </button>
        <header className="event-details-head">
          <p className="eyebrow">{ui.viewDetails}</p>
          <h2 id="event-details-title">{localize(event.title, language)}</h2>
          <p className="event-details-facts">
            <span>
              <span aria-hidden="true">🗓</span> {copy.dateLabel}: {event.dateLabel}
            </span>
            <span>
              <span aria-hidden="true">📍</span> {copy.locationLabel}: {event.location}
            </span>
          </p>
        </header>

        <div className="event-details-body">
          {details.intro?.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "event-details-lead" : undefined}>
              {localize(paragraph, language)}
            </p>
          ))}
          {details.sections.map((section, i) => (
            <DetailSectionBlock key={i} section={section} language={language} level={1} />
          ))}
          {details.outro?.map((paragraph, i) => (
            <p key={i} className="event-details-outro">
              {localize(paragraph, language)}
            </p>
          ))}
        </div>

        {event.ctaUrl && (
          <a className="button primary event-details-cta" href={event.ctaUrl} target="_blank" rel="noopener noreferrer">
            {event.ctaLabel ? localize(event.ctaLabel, language) : ui.viewEvent}
          </a>
        )}
      </article>
    </div>
  );
}

// ── Lightbox ─────────────────────────────────────────────────
function Lightbox({
  ui,
  state,
  onClose,
  onNavigate,
}: {
  ui: ReturnType<typeof getUi>;
  state: { images: { src: string; alt: string }[]; index: number };
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { images, index } = state;
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      else if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onNavigate]);

  const current = images[index];
  return (
    <div className="events-lightbox" role="dialog" aria-modal="true" aria-label={ui.memoriesTitle} onClick={onClose}>
      <button ref={closeRef} type="button" className="lightbox-close" aria-label={ui.lightboxClose} onClick={onClose}>
        ×
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            aria-label={ui.prevMonth}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            aria-label={ui.nextMonth}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
          >
            ›
          </button>
        </>
      )}
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img {...imageProps(current.src || fallbackImage)} alt={current.alt} decoding="async" onError={handleImageError} />
      </figure>
    </div>
  );
}

// ── Empty state ──────────────────────────────────────────────
function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <section className="events-view events-empty-state" aria-labelledby="empty-heading">
      <div className="events-empty-card">
        <span className="events-empty-icon" aria-hidden="true">
          🗓
        </span>
        <h2 id="empty-heading">{title}</h2>
        <p>{message}</p>
      </div>
    </section>
  );
}

// group events by month, ordered ascending
function groupByMonth(events: EventItem[], language: LanguageCode): { key: string; label: string; events: EventItem[] }[] {
  const fmt = new Intl.DateTimeFormat(language, { month: "long", year: "numeric" });
  const map = new Map<string, { label: string; events: EventItem[] }>();
  for (const e of events) {
    const d = parseDate(e.startDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map.has(key)) map.set(key, { label: fmt.format(d), events: [] });
    map.get(key)!.events.push(e);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([key, v]) => ({ key, ...v }));
}
