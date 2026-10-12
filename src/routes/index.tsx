import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import floral from "@/assets/floral-corner.webp";
import rose from "@/assets/white-rose.webp";

const EVENT_START = new Date("2026-10-19T19:00:00+03:00");
const EVENT_END = new Date("2026-10-19T21:00:00+03:00");
const VENUE = "دارة الحاج أحمد مسلم الأعرج";
// Search by name until the exact Google Maps share link is available.
const VENUE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`;
const TITLE = "دعوة جاهة كريمة — بلال & روان";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      {
        name: "description",
        content:
          "يتشرف آل البرغوثي وآل أبو ليلى بدعوتكم لحضور جاهة بلال وروان، الاثنين 19/10/2026.",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: `الاثنين 19/10/2026 — ${VENUE}` },
    ],
  }),
  component: Invitation,
});

function Star({ size, className = "" }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`text-gold ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    </svg>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="gold-line w-14" />
      <Star size={22} />
      <span className="gold-line w-14" />
    </div>
  );
}

function Door({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`door-${side} bg-door absolute top-0 h-full w-1/2 ${isLeft ? "left-0" : "right-0"}`}
      style={{
        transformOrigin: isLeft ? "left center" : "right center",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="absolute inset-4 rounded-t-[999px] border border-gold/50" />
      <div className="absolute inset-7 rounded-t-[999px] border border-gold/30" />
      <img
        src={floral}
        alt=""
        width={900}
        height={900}
        className="absolute bottom-0 w-[85%] opacity-95"
        style={{
          [isLeft ? "left" : "right"]: 0,
          transform: `scaleY(-1) ${isLeft ? "" : "scaleX(-1)"}`,
        }}
      />
      <img
        src={floral}
        alt=""
        width={900}
        height={900}
        className="absolute top-0 w-[60%] opacity-90"
        style={{ [isLeft ? "left" : "right"]: 0, transform: isLeft ? "" : "scaleX(-1)" }}
      />
      <div
        className={`absolute top-1/2 h-16 w-2 -translate-y-1/2 rounded-full bg-gold ${isLeft ? "right-4" : "left-4"}`}
      />
    </div>
  );
}

function Sparkles({ count = 14 }: { count?: number }) {
  const dots = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: `${(i * 37 + 13) % 100}%`,
      top: `${(i * 53 + 7) % 100}%`,
      size: 4 + ((i * 7) % 6),
      delay: `${(i * 0.4) % 3}s`,
    })),
  ).current;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

function Petals({ count = 8 }: { count?: number }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: `${(i * 29 + 5) % 95}%`,
      size: 10 + ((i * 5) % 10),
      delay: `${i * 1.6}s`,
      duration: `${10 + (i % 4) * 2}s`,
    })),
  ).current;
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {items.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            top: "-5vh",
            width: p.size,
            height: p.size * 0.8,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

// `cycle` is the value at which a ring is drawn full; days use one week.
const COUNTDOWN_UNITS = [
  { label: "يوم", ms: 86_400_000, cycle: 7 },
  { label: "ساعة", ms: 3_600_000, cycle: 24 },
  { label: "دقيقة", ms: 60_000, cycle: 60 },
  { label: "ثانية", ms: 1_000, cycle: 60 },
] as const;

const RING_RADIUS = 44;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const RING_GRADIENT_ID = "countdown-ring-gold";

function CountdownRing({
  value,
  cycle,
  label,
}: {
  value: number | null;
  cycle: number;
  label: string;
}) {
  const progress = value === null ? 1 : Math.min(value / cycle, 1);
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[4.5rem]">
        <div className="countdown-face absolute inset-[9%] rounded-full" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gold/25"
          />
          <circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke={`url(#${RING_GRADIENT_ID})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <span
          key={text}
          className="animate-tick absolute inset-0 flex items-center justify-center font-latin text-[1.7rem] leading-none text-gold tabular-nums lining-nums"
        >
          {text}
        </span>
      </div>
      <span className="mt-2 text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function Countdown() {
  // Starts as null so the server render and the first client render match.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  let content: ReactNode;
  if (now !== null && now >= EVENT_END.getTime()) {
    content = <p className="py-4 text-lg text-olive">تمّت الجاهة بحمد الله، شكراً لحضوركم</p>;
  } else if (now !== null && now >= EVENT_START.getTime()) {
    content = <p className="py-4 text-lg text-olive">الجاهة قائمة الآن، بانتظاركم</p>;
  } else {
    let remaining = now === null ? null : EVENT_START.getTime() - now;
    content = (
      <div className="grid grid-cols-4 gap-2" dir="ltr" role="timer" aria-live="off">
        {COUNTDOWN_UNITS.map(({ label, ms, cycle }) => {
          let value: number | null = null;
          if (remaining !== null) {
            value = Math.floor(remaining / ms);
            remaining -= value * ms;
          }
          return <CountdownRing key={label} value={value} cycle={cycle} label={label} />;
        })}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-ivory/60 px-3 pb-5 pt-6 shadow-sm">
      <div className="pointer-events-none absolute inset-1.5 rounded-[1.7rem] border border-gold/20" />
      <div className="pointer-events-none absolute inset-x-10 -top-8 h-20 rounded-b-full bg-glow opacity-70" />
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id={RING_GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="oklch(0.62 0.08 70)" />
            <stop offset="0.5" stopColor="oklch(0.86 0.07 88)" />
            <stop offset="1" stopColor="oklch(0.66 0.09 72)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative mb-5 flex items-center justify-center gap-2 sm:gap-3">
        <span className="gold-line hidden w-8 sm:block" />
        <Star size={12} className="shrink-0" />
        <p className="whitespace-nowrap font-display text-lg text-olive sm:text-xl">
          العدّ التنازلي لفرحتنا
        </p>
        <Star size={12} className="shrink-0" />
        <span className="gold-line hidden w-8 sm:block" />
      </div>
      <div className="relative">{content}</div>
    </div>
  );
}

function Invitation() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      // The effect may have been cleaned up (e.g. React StrictMode) while the imports were loading.
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Scene 1: doors
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".scene-doors",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          })
          .to(".door-intro", { opacity: 0, y: -30, duration: 0.25 }, 0)
          .to(".door-left", { rotateY: -105, duration: 1, ease: "power2.inOut" }, 0.1)
          .to(".door-right", { rotateY: 105, duration: 1, ease: "power2.inOut" }, 0.1)
          .fromTo(
            ".door-glow",
            { opacity: 0.2, scale: 0.6 },
            { opacity: 1, scale: 1.3, duration: 1 },
            0.1,
          )
          .fromTo(
            ".door-reveal",
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
            0.45,
          )
          .to(".door-curtain", { scaleX: 0.15, opacity: 0, duration: 0.6 }, 0.7);

        // Scene 2: card reveal
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            filter: "blur(6px)",
            duration: 1.1,
            ease: "power2.out",
            clearProps: "filter",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
        gsap.fromTo(
          ".bloom",
          { scale: 0.2, rotate: -60, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 0.55,
            ease: "power1.out",
            scrollTrigger: { trigger: ".names", start: "top 90%", end: "center 50%", scrub: 1 },
          },
        );
      }, root);

      // Web fonts change text heights after load, which shifts every trigger position.
      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <main ref={root} className="overflow-x-clip bg-background font-body text-foreground">
      <Petals />
      {/* Scene 1 */}
      <section className="scene-doors relative h-[220svh]">
        <div className="sticky top-0 h-svh overflow-hidden" style={{ perspective: "1600px" }}>
          <div className="bg-silk door-curtain absolute inset-0 origin-center" />
          <div className="door-glow bg-glow absolute inset-0" />
          <Sparkles />
          <div className="door-reveal absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
            <p className="font-display text-xl text-olive">بكل الحب نزفّ إليكم</p>
            <p className="mt-4 font-display text-gold-gradient text-7xl leading-tight drop-shadow-sm">
              بلال
            </p>
            <span className="my-1 font-latin text-3xl italic text-gold">&amp;</span>
            <p className="font-display text-gold-gradient text-7xl leading-tight drop-shadow-sm">
              روان
            </p>
            <Ornament className="mt-6" />
          </div>
          <Door side="left" />
          <Door side="right" />
          <div className="door-intro pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-pearl/85 px-10 py-10 shadow-card backdrop-blur-sm">
              <p className="font-latin text-gold-gradient text-6xl italic leading-none">
                B &amp; R
              </p>
              <Ornament className="my-4" />
              <h1 className="font-display text-2xl text-foreground">دعوة جاهة كريمة</h1>
            </div>
            <p className="mt-10 animate-pulse text-sm text-muted-foreground">
              اسحب للأسفل لفتح الدعوة
            </p>
            <span className="mt-2 text-gold" aria-hidden="true">
              ↓
            </span>
          </div>
        </div>
      </section>

      {/* Scene 2 */}
      <section className="relative px-5 pb-10">
        <div className="relative mx-auto max-w-md overflow-hidden rounded-t-[999px] border border-gold/50 bg-pearl px-6 pb-16 pt-28 text-center shadow-card">
          {/* layered arch frames */}
          <div className="pointer-events-none absolute inset-2 rounded-t-[999px] border border-gold/40" />
          <div className="pointer-events-none absolute inset-4 rounded-t-[999px] border border-gold/20" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-40 rounded-b-full bg-glow opacity-70" />
          {/* crown ornament at arch apex */}
          <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2">
            <Star size={46} />
          </div>
          <img
            src={floral}
            alt=""
            width={900}
            height={900}
            loading="lazy"
            className="animate-sway absolute -right-8 -top-4 w-52 opacity-95"
            // `scale` instead of `transform`, which the sway animation overrides.
            style={{ scale: "-1 1" }}
          />
          <img
            src={floral}
            alt=""
            width={900}
            height={900}
            loading="lazy"
            className="animate-sway absolute -left-8 -top-4 w-52 opacity-95"
            style={{ animationDelay: "1.2s" }}
          />
          <img
            src={floral}
            alt=""
            width={900}
            height={900}
            loading="lazy"
            className="absolute -bottom-10 -right-10 w-48 opacity-60"
            style={{ transform: "scaleY(-1) scaleX(-1)" }}
          />
          <img
            src={floral}
            alt=""
            width={900}
            height={900}
            loading="lazy"
            className="absolute -bottom-10 -left-10 w-48 opacity-60"
            style={{ transform: "scaleY(-1)" }}
          />

          <p className="reveal font-display text-gold-gradient text-4xl leading-snug">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <div className="reveal mx-auto mt-6 max-w-[19rem] rounded-2xl border border-gold/30 bg-ivory/70 px-5 py-4 shadow-sm">
            <p className="text-lg leading-loose text-olive">
              ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا
              إِلَيْهَا ﴾
            </p>
          </div>
          <Ornament className="reveal my-8" />
          <p className="reveal text-lg leading-loose">
            بكل الحب والسرور، وقلوب يملؤها الفرح، يتشرف
          </p>
          <p className="reveal mt-4 font-display text-3xl">السيد إبراهيم البرغوثي</p>
          <p className="reveal my-1 font-latin text-2xl italic text-gold">&amp;</p>
          <p className="reveal font-display text-3xl">السيد سليمان أبو ليلى</p>
          <p className="reveal mt-5 text-lg">بدعوتكم لحضور خطوبة</p>

          <div className="names relative my-12 py-8">
            <Sparkles count={12} />
            <img
              src={rose}
              alt=""
              width={640}
              height={640}
              loading="lazy"
              className="bloom absolute left-1/2 top-1/2 -ml-40 -mt-40 h-80 w-80"
            />
            <div className="relative">
              <p className="reveal text-sm tracking-wide text-muted-foreground">ابنه</p>
              <p className="reveal font-display text-gold-gradient text-8xl leading-tight drop-shadow-sm">
                بلال
              </p>
              <div className="reveal my-3 flex items-center justify-center gap-3">
                <span className="gold-line w-10" />
                <span className="font-latin text-3xl italic text-gold">&amp;</span>
                <span className="gold-line w-10" />
              </div>
              <p className="reveal text-sm tracking-wide text-muted-foreground">ابنته</p>
              <p className="reveal font-display text-gold-gradient text-8xl leading-tight drop-shadow-sm">
                روان
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 3 */}
      <section className="relative flex min-h-svh flex-col items-center justify-center px-5 pb-16 text-center">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[3rem] border border-gold/50 bg-pearl px-6 py-14 shadow-card">
          <div className="pointer-events-none absolute inset-2 rounded-[2.6rem] border border-gold/40" />
          <div className="pointer-events-none absolute inset-4 rounded-[2.2rem] border border-gold/20" />
          <div className="pointer-events-none absolute inset-x-16 -top-10 h-32 rounded-b-full bg-glow opacity-80" />
          <img
            src={floral}
            alt=""
            width={900}
            height={900}
            loading="lazy"
            className="absolute -left-8 -top-8 w-40 opacity-70"
          />
          <img
            src={floral}
            alt=""
            width={900}
            height={900}
            loading="lazy"
            className="absolute -bottom-8 -right-8 w-40 opacity-70"
            style={{ transform: "scale(-1)" }}
          />

          <Ornament className="reveal mb-8" />
          <p className="reveal font-display text-2xl text-olive">الاثنين</p>
          <div
            className="reveal mx-auto mt-4 flex items-center justify-center gap-4"
            dir="ltr"
            aria-label="19/10/2026"
          >
            <span className="font-latin text-6xl text-gold-gradient">19</span>
            <span className="h-10 w-px bg-gold/50" />
            <span className="font-latin text-6xl text-gold-gradient">10</span>
            <span className="h-10 w-px bg-gold/50" />
            <span className="font-latin text-6xl text-gold-gradient">2026</span>
          </div>
          <p className="reveal mt-5 text-lg">من الساعة 7:00 مساءً حتى 9:00 مساءً</p>
          <div className="reveal my-7 flex items-center justify-center gap-3">
            <span className="gold-line w-16" />
            <Star size={16} />
            <span className="gold-line w-16" />
          </div>
          <div className="reveal flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <p className="font-display text-3xl">{VENUE}</p>
            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="موقع الدارة على خرائط جوجل"
              title="الموقع على الخريطة"
              className="map-pin inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-pearl text-gold shadow-card transition hover:bg-gold hover:text-primary-foreground"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
            </a>
          </div>

          <div className="reveal mt-9">
            <Countdown />
          </div>

          <p className="reveal mt-9 font-display text-gold-gradient text-4xl leading-snug">
            بحضوركم تكتمل فرحتنا
          </p>

          <div className="reveal mt-10 flex flex-col gap-3">
            <button
              type="button"
              onClick={share}
              className="rounded-full bg-gold px-6 py-3.5 font-bold text-primary-foreground shadow-card transition hover:opacity-90"
            >
              مشاركة الدعوة عبر واتساب
            </button>
            <button
              type="button"
              onClick={saveCalendar}
              className="rounded-full border-2 border-gold px-6 py-3.5 text-gold transition hover:bg-gold/10"
            >
              حفظ الموعد في التقويم
            </button>
          </div>
        </div>
        <div className="reveal mt-12">
          <Ornament />
          <p className="mt-3 font-display text-gold-gradient text-5xl">بلال &amp; روان</p>
        </div>
      </section>
    </main>
  );
}

function share() {
  const url = window.location.origin + window.location.pathname;
  const text = `${TITLE}\nالاثنين 19/10/2026 الساعة 7:00 مساءً\n${VENUE}\nالموقع: ${VENUE_MAP_URL}\n\nالدعوة: ${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

function toIcsDate(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function saveCalendar() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jaha//AR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:jaha-bilal-rawan-20261019@jaha",
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(EVENT_START)}`,
    `DTEND:${toIcsDate(EVENT_END)}`,
    "SUMMARY:جاهة بلال وروان",
    `LOCATION:${VENUE}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:جاهة بلال وروان",
    "TRIGGER:-PT3H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "jaha-bilal-rawan.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoking synchronously cancels the download in some browsers (notably Safari).
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
