import { createFileRoute } from "@tanstack/react-router";
import type { gsap as GsapInstance } from "gsap";
import { useEffect, useRef, useState, type ReactNode } from "react";
import bride from "@/assets/bride.webp";
import floral from "@/assets/floral-corner.webp";
import groom from "@/assets/groom.webp";
import rose from "@/assets/white-rose.webp";

const EVENT_START = new Date("2026-10-19T19:00:00+03:00");
const EVENT_END = new Date("2026-10-19T21:00:00+03:00");
const VENUE = "دارة الحاج أحمد مسلم الأعرج";
const VENUE_COORDS = "32.01993179321289,36.067955017089844";
const VENUE_MAP_URL = `https://www.google.com/maps?q=${VENUE_COORDS}&z=17&hl=ar`;
const VENUE_MAP_EMBED_URL = `https://maps.google.com/maps?q=${VENUE_COORDS}&hl=ar&z=16&output=embed`;
const TITLE = "دعوة جاهة كريمة — بلال & روان";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      {
        name: "description",
        content: "يتشرف آل البريجي وآل أبو ليل بدعوتكم لحضور جاهة بلال وروان، الاثنين 19/10/2026.",
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
    <div className={`ornament flex items-center justify-center gap-3 ${className}`}>
      <span className="gold-line w-14" />
      <Star size={22} />
      <span className="gold-line w-14" />
    </div>
  );
}

function LineIcon({ size = 20, children }: { size?: number | undefined; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PinIcon = ({ size }: { size?: number }) => (
  <LineIcon size={size}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </LineIcon>
);

const ChatIcon = ({ size }: { size?: number }) => (
  <LineIcon size={size}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20z" />
    <path d="M9 10.5h6M9 13.5h4" />
  </LineIcon>
);

const CalendarIcon = ({ size }: { size?: number }) => (
  <LineIcon size={size}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M12 13.5l.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z" />
  </LineIcon>
);

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
      <div className="absolute inset-4 rounded-t-[999px] border border-gold/50 lg:inset-8" />
      <div className="absolute inset-7 rounded-t-[999px] border border-gold/30 lg:inset-12" />
      {/* Sized by height on wide screens so the flowers stay corner pieces. */}
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        className="absolute bottom-0 w-[85%] max-w-none opacity-95 lg:h-[58%] lg:w-auto"
        style={{
          [isLeft ? "left" : "right"]: 0,
          transform: `scaleY(-1) ${isLeft ? "" : "scaleX(-1)"}`,
        }}
      />
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        className="absolute top-0 w-[60%] max-w-none opacity-90 lg:h-[40%] lg:w-auto"
        style={{ [isLeft ? "left" : "right"]: 0, transform: isLeft ? "" : "scaleX(-1)" }}
      />
      <div
        className={`absolute top-1/2 h-16 w-2 -translate-y-1/2 rounded-full bg-gold lg:h-28 lg:w-2.5 ${isLeft ? "right-4 lg:right-8" : "left-4 lg:left-8"}`}
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
    <div
      className="sparkles pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
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

function WeddingRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="wedding-ring-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.62 0.08 70)" />
          <stop offset="0.5" stopColor="oklch(0.9 0.07 88)" />
          <stop offset="1" stopColor="oklch(0.66 0.09 72)" />
        </linearGradient>
      </defs>
      <circle cx="46" cy="54" r="24" fill="none" stroke="url(#wedding-ring-gold)" strokeWidth="5" />
      <circle cx="74" cy="54" r="24" fill="none" stroke="url(#wedding-ring-gold)" strokeWidth="5" />
      <path
        d="M74 30 L65 19 L69 13 H79 L83 19 Z"
        fill="var(--pearl)"
        stroke="url(#wedding-ring-gold)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The CSS default is the final pose (couple together, everything shown), so
// reduced-motion users and the pre-hydration render both see the finished scene.
function CoupleScene() {
  return (
    <section className="scene-couple relative h-[320svh]" aria-label="بلال وروان">
      <div className="bg-silk sticky top-0 h-svh overflow-hidden">
        <div className="couple-glow bg-glow absolute inset-0" />
        <div className="couple-rays pointer-events-none absolute left-1/2 top-[48%] h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2" />
        <div className="couple-sparkles absolute inset-0">
          <Sparkles count={14} />
        </div>

        <svg
          viewBox="0 0 200 300"
          preserveAspectRatio="none"
          className="couple-arch pointer-events-none absolute bottom-[10svh] left-1/2 h-[64svh] w-[min(92vw,56svh)] -translate-x-1/2 lg:bottom-[3svh] lg:h-[86svh] lg:w-[64svh]"
          aria-hidden="true"
        >
          <path d="M6 300 V96 A94 94 0 0 1 194 96 V300" className="couple-arch-line" />
          <path
            d="M18 300 V100 A82 82 0 0 1 182 100 V300"
            className="couple-arch-line opacity-50"
          />
        </svg>

        <div className="couple-intro absolute inset-x-0 top-[38svh] px-6 text-center motion-reduce:hidden">
          <p className="font-display text-3xl text-olive lg:text-5xl">وتبدأ الحكاية…</p>
          <p className="mt-3 animate-pulse text-sm text-muted-foreground lg:text-base">
            تابع النزول
          </p>
        </div>

        <div className="couple-title absolute inset-x-0 top-[7svh] px-6 text-center lg:top-[5svh]">
          <p className="font-display text-gold-gradient text-5xl leading-snug lg:text-7xl">
            وتلاقت القلوب
          </p>
          <p className="mt-1 font-display text-lg text-olive lg:text-2xl">على بركة الله</p>
          <p className="mt-2 font-display text-2xl text-gold lg:hidden">بلال &amp; روان</p>
        </div>

        <p className="couple-name-bride font-display text-gold-gradient absolute left-[6%] top-1/2 hidden text-8xl xl:left-[10%] lg:block">
          روان
        </p>
        <p className="couple-name-groom font-display text-gold-gradient absolute right-[6%] top-1/2 hidden text-8xl xl:right-[10%] lg:block">
          بلال
        </p>

        {/* Kept above the phone's bottom action bar. */}
        <div className="couple-floor absolute bottom-[9svh] left-1/2 h-10 w-[min(88vw,34rem)] -translate-x-1/2 rounded-[50%] lg:bottom-[2svh] lg:h-14 lg:w-[44rem]" />

        <div
          className="couple-stage absolute inset-x-0 bottom-[11svh] flex h-[48svh] origin-bottom items-end justify-center lg:bottom-[4svh] lg:h-[68svh]"
          dir="ltr"
        >
          <div className="couple-bride relative h-[95%]">
            <img
              src={bride}
              decoding="async"
              alt="العروس روان"
              width={555}
              height={1014}
              loading="lazy"
              className="couple-step h-full w-auto max-w-none"
            />
          </div>
          <div className="couple-groom relative -ml-[3svh] h-full">
            <img
              src={groom}
              decoding="async"
              alt="العريس بلال"
              width={381}
              height={1113}
              loading="lazy"
              className="couple-step h-full w-auto max-w-none"
            />
          </div>
          <div
            className="couple-burst pointer-events-none absolute left-1/2 top-0"
            aria-hidden="true"
          />
          <WeddingRings className="couple-rings absolute left-1/2 top-0 w-20 -translate-x-1/2 -translate-y-[85%] drop-shadow-md lg:w-24" />
        </div>
      </div>
    </section>
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
    <div className="countdown-unit flex flex-col items-center">
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

function ArchFrames({ desktopArch = true }: { desktopArch?: boolean }) {
  const outer = desktopArch
    ? "rounded-t-[999px] rounded-b-none lg:rounded-b-[2.6rem]"
    : "rounded-[2.6rem] lg:rounded-t-[999px]";
  const inner = desktopArch
    ? "rounded-t-[999px] rounded-b-none lg:rounded-b-[2.2rem]"
    : "rounded-[2.2rem] lg:rounded-t-[999px]";
  return (
    <>
      <div className={`pointer-events-none absolute inset-2 border border-gold/40 ${outer}`} />
      <div className={`pointer-events-none absolute inset-4 border border-gold/20 ${inner}`} />
    </>
  );
}

function InvitationPage() {
  return (
    <div className="relative h-full overflow-hidden rounded-t-[999px] border border-gold/50 bg-pearl px-6 pb-16 pt-28 text-center shadow-card lg:flex lg:flex-col lg:justify-center lg:rounded-b-[3rem] lg:px-12 lg:pt-36">
      <ArchFrames />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-40 rounded-b-full bg-glow opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 lg:top-10">
        <Star size={46} />
      </div>
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="animate-sway absolute -right-8 -top-4 w-52 opacity-95 lg:w-64"
        // `scale` instead of `transform`, which the sway animation overrides.
        style={{ scale: "-1 1" }}
      />
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="animate-sway absolute -left-8 -top-4 w-52 opacity-95 lg:w-64"
        style={{ animationDelay: "1.2s" }}
      />
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="absolute -bottom-10 -right-10 w-48 opacity-60 lg:w-56"
        style={{ transform: "scaleY(-1) scaleX(-1)" }}
      />
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="absolute -bottom-10 -left-10 w-48 opacity-60 lg:w-56"
        style={{ transform: "scaleY(-1)" }}
      />

      <div className="relative">
        <p className="reveal font-display text-gold-gradient text-4xl leading-snug lg:text-5xl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <div className="reveal mx-auto mt-6 max-w-[19rem] rounded-2xl border border-gold/30 bg-ivory/70 px-5 py-4 shadow-sm lg:max-w-sm">
          <p className="text-lg leading-loose text-olive">
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا
            ﴾
          </p>
        </div>
        <Ornament className="reveal my-8" />
        <p className="reveal text-lg leading-loose">بكل الحب والسرور، وقلوب يملؤها الفرح، يتشرف</p>
        <p className="reveal mt-4 font-display text-3xl">السيد إبراهيم البريجي</p>
        <p className="reveal my-1 font-latin text-2xl italic text-gold">&amp;</p>
        <p className="reveal font-display text-3xl">السيد سليمان أبو ليل</p>
        <p className="reveal mt-5 text-lg">بدعوتكم لحضور خطوبة</p>

        <div className="names relative my-12 py-8">
          <Sparkles count={12} />
          <img
            src={rose}
            decoding="async"
            alt=""
            width={640}
            height={640}
            loading="lazy"
            className="bloom absolute left-1/2 top-1/2 -ml-40 -mt-40 h-80 w-80"
          />
          <div className="relative">
            <p className="reveal font-display text-gold-gradient names-ink text-8xl leading-tight">
              بلال
            </p>
            <div className="reveal my-3 flex items-center justify-center gap-3">
              <span className="gold-line w-10" />
              <span className="font-latin text-4xl italic text-[oklch(0.55_0.09_68)]">&amp;</span>
              <span className="gold-line w-10" />
            </div>
            <p className="reveal font-display text-gold-gradient names-ink text-8xl leading-tight">
              روان
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// A non-interactive map preview; the whole card opens Google Maps so the
// embedded map never swallows scroll gestures on phones.
function VenueMap() {
  return (
    <a
      href={VENUE_MAP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="افتح موقع الدارة على خرائط جوجل"
      className="group relative block overflow-hidden rounded-[1.75rem] border border-gold/50 bg-ivory text-right shadow-card transition duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden lg:h-56">
        <iframe
          title="خريطة موقع الدارة"
          src={VENUE_MAP_EMBED_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          aria-hidden="true"
          // Oversized so Google's coordinates card sits outside the visible area, and
          // nudged down so the pin's head (drawn above the exact point) is centered.
          className="map-frame pointer-events-none absolute left-0 top-1/2 h-[calc(100%+14rem)] w-full -translate-y-[calc(50%-1rem)] border-0 transition duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_oklch(0.95_0.03_85/0.75)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-pearl to-transparent" />
        <span className="absolute right-3 top-3 rounded-full border border-gold/40 bg-pearl/95 px-3 py-1 text-xs text-gold shadow-sm">
          خرائط جوجل
        </span>
      </div>
      <div className="relative flex items-center gap-3 bg-pearl px-4 py-3">
        <span className="map-pin flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-card">
          <PinIcon />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight text-foreground">الموقع على الخريطة</p>
          <p className="mt-0.5 text-xs text-muted-foreground">اضغط لفتح الاتجاهات</p>
        </div>
        <span className="shrink-0 rounded-full border border-gold/60 px-3 py-1.5 text-sm text-gold transition group-hover:bg-gold group-hover:text-primary-foreground">
          افتح الخريطة
        </span>
      </div>
    </a>
  );
}

function DetailsPage() {
  return (
    <div className="relative h-full overflow-hidden rounded-[3rem] border border-gold/50 bg-pearl px-6 py-14 text-center shadow-card lg:flex lg:flex-col lg:justify-center lg:rounded-t-[999px] lg:px-12 lg:pt-36">
      <ArchFrames desktopArch={false} />
      <div className="pointer-events-none absolute inset-x-16 -top-10 h-32 rounded-b-full bg-glow opacity-80 lg:inset-x-10 lg:top-0 lg:h-40" />
      <div className="pointer-events-none absolute left-1/2 top-10 hidden -translate-x-1/2 lg:block">
        <Star size={46} />
      </div>
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="absolute -left-8 -top-8 w-40 opacity-70 lg:animate-sway lg:-top-4 lg:w-64 lg:opacity-95"
      />
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="absolute -right-8 -top-4 hidden w-64 opacity-95 lg:block lg:animate-sway"
        style={{ scale: "-1 1", animationDelay: "1.2s" }}
      />
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="absolute -bottom-8 -right-8 w-40 opacity-70 lg:-bottom-10 lg:-right-10 lg:w-56 lg:opacity-60"
        style={{ transform: "scale(-1)" }}
      />
      <img
        src={floral}
        decoding="async"
        alt=""
        width={900}
        height={900}
        loading="lazy"
        className="absolute -bottom-10 -left-10 hidden w-56 opacity-60 lg:block"
        style={{ transform: "scaleY(-1)" }}
      />

      <div className="relative">
        <Ornament className="reveal mb-8" />
        <p className="reveal font-display text-2xl text-olive">الاثنين</p>
        <div
          className="reveal mx-auto mt-4 flex items-center justify-center gap-4"
          dir="ltr"
          aria-label="19/10/2026"
        >
          <span className="count-up font-latin text-6xl text-gold-gradient tabular-nums">19</span>
          <span className="h-10 w-px bg-gold/50" />
          <span className="count-up font-latin text-6xl text-gold-gradient tabular-nums">10</span>
          <span className="h-10 w-px bg-gold/50" />
          <span className="count-up font-latin text-6xl text-gold-gradient tabular-nums">2026</span>
        </div>
        <p className="reveal mt-5 text-lg">من الساعة 7:00 مساءً حتى 9:00 مساءً</p>
        <div className="ornament reveal my-7 flex items-center justify-center gap-3">
          <span className="gold-line w-16" />
          <Star size={16} />
          <span className="gold-line w-16" />
        </div>
        <p className="reveal font-display text-3xl">{VENUE}</p>
        <div className="reveal mt-6">
          <VenueMap />
        </div>

        <div className="reveal mt-9">
          <Countdown />
        </div>

        <p className="reveal mt-9 font-display text-gold-gradient text-4xl leading-snug">
          بحضوركم تكتمل فرحتنا
        </p>

        <div className="details-actions reveal mt-10 flex flex-col gap-3">
          <button
            type="button"
            onClick={share}
            className="btn-shine relative overflow-hidden rounded-full bg-gold px-6 py-3.5 font-bold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
          >
            مشاركة الدعوة عبر واتساب
          </button>
          <button
            type="button"
            onClick={saveCalendar}
            className="rounded-full border-2 border-gold px-6 py-3.5 text-gold transition hover:-translate-y-0.5 hover:bg-gold/10"
          >
            حفظ الموعد في التقويم
          </button>
        </div>
      </div>
    </div>
  );
}

function BookSpine() {
  return (
    <div
      className="spine relative hidden w-24 shrink-0 items-center justify-center lg:flex"
      aria-hidden="true"
    >
      <div className="flex h-full flex-col items-center gap-4 py-12">
        <span className="w-px flex-1 bg-linear-to-b from-transparent to-gold" />
        <span className="font-latin text-3xl italic text-gold">B</span>
        <div className="rounded-full border border-gold/50 bg-pearl p-3 shadow-card">
          <Star size={26} />
        </div>
        <span className="font-latin text-3xl italic text-gold">R</span>
        <span className="w-px flex-1 bg-linear-to-t from-transparent to-gold" />
      </div>
    </div>
  );
}

// Pure CSS so it plays from the server-rendered HTML, before any script loads.
// It never takes pointer events, so it can't block the page if it lingers.
function Splash() {
  return (
    <div
      className="splash pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center bg-pearl motion-reduce:hidden"
      aria-hidden="true"
    >
      <div className="bg-glow absolute inset-0 opacity-60" />
      <div className="relative flex h-44 w-44 items-center justify-center lg:h-60 lg:w-60">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="47" className="splash-ring" />
          <circle cx="50" cy="50" r="43" className="splash-ring splash-ring-inner" />
        </svg>
        <p className="splash-mono font-latin text-gold-gradient text-5xl italic lg:text-7xl">
          B &amp; R
        </p>
      </div>
      <p className="splash-sub relative mt-8 font-display text-xl text-olive lg:text-2xl">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <span className="gold-line absolute inset-x-0 bottom-0" />
    </div>
  );
}

// Phones stack the two pages; this ties them together so the gap reads as one piece.
function CardSeam() {
  return (
    <div className="relative flex h-24 items-center justify-center lg:hidden" aria-hidden="true">
      {["left-12", "right-12"].map((side) => (
        <span key={side} className={`absolute inset-y-0 ${side} flex flex-col items-center`}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="w-px flex-1 bg-linear-to-b from-gold to-gold/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
      ))}
      <div className="reveal flex items-center gap-3">
        <span className="gold-line w-10" />
        <div
          className="flex items-center gap-2.5 rounded-full border border-gold/50 bg-pearl px-4 py-1.5 shadow-card"
          dir="ltr"
        >
          <span className="font-latin text-2xl italic text-gold">B</span>
          <Star size={18} />
          <span className="font-latin text-2xl italic text-gold">R</span>
        </div>
        <span className="gold-line w-10" />
      </div>
    </div>
  );
}

type ActionBarItemProps = { label: string; icon: ReactNode } & (
  { href: string } | { onClick: () => void }
);

function ActionBarItem(props: ActionBarItemProps) {
  const className =
    "flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 text-gold transition active:scale-90";
  const content = (
    <>
      {props.icon}
      <span className="text-[11px] text-foreground/80">{props.label}</span>
    </>
  );
  if ("href" in props) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={props.onClick} className={className}>
      {content}
    </button>
  );
}

// Phone-only floating shortcuts, shown between the doors and the main action buttons.
function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const doors = document.querySelector(".scene-doors");
    const actions = document.querySelector(".details-actions");
    let actionsInView = false;
    const update = () => {
      const pastDoors = doors
        ? doors.getBoundingClientRect().bottom < window.innerHeight * 0.5
        : true;
      setVisible(pastDoors && !actionsInView);
    };
    const observer = new IntersectionObserver(([entry]) => {
      actionsInView = entry?.isIntersecting ?? false;
      update();
    });
    if (actions) observer.observe(actions);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <nav
      aria-label="اختصارات الدعوة"
      inert={!visible}
      className={`fixed inset-x-4 z-30 transition-all duration-500 ease-out lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[160%] opacity-0"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-sm items-center rounded-full border border-gold/40 bg-pearl/95 px-3 py-1.5 shadow-card">
        <ActionBarItem label="مشاركة" icon={<ChatIcon />} onClick={share} />
        <span className="h-8 w-px bg-gold/25" />
        <ActionBarItem label="الموقع" icon={<PinIcon />} href={VENUE_MAP_URL} />
        <span className="h-8 w-px bg-gold/25" />
        <ActionBarItem label="التقويم" icon={<CalendarIcon />} onClick={saveCalendar} />
      </div>
    </nav>
  );
}

const CONFETTI_COLORS = [
  "oklch(0.74 0.12 82)",
  "oklch(0.6 0.1 70)",
  "oklch(0.82 0.11 90)",
  "oklch(0.72 0.08 40)",
];

function burstConfetti(gsap: typeof GsapInstance) {
  const host = document.querySelector(".couple-burst");
  if (!host) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length] ?? "";
    if (i % 3 === 0) piece.style.borderRadius = "999px";
    host.appendChild(piece);
    const angle = (i / count) * Math.PI * 2 + gsap.utils.random(-0.2, 0.2);
    const distance = gsap.utils.random(70, 180);
    gsap
      .timeline({ onComplete: () => piece.remove() })
      .fromTo(
        piece,
        { x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance * 0.7 - 30,
          scale: gsap.utils.random(0.7, 1.4),
          rotate: gsap.utils.random(-260, 260),
          duration: 0.7,
          ease: "power3.out",
        },
      )
      .to(piece, { y: "+=140", rotate: "+=140", opacity: 0, duration: 1.4, ease: "power1.in" });
  }
}

function Invitation() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let mm: { revert: () => void } | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      // The effect may have been cleaned up (e.g. React StrictMode) while the imports were loading.
      if (cancelled || !root.current) return;
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

        // Scene 2: text reveal
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 1.1,
            ease: "power2.out",
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
            opacity: 0.4,
            ease: "power1.out",
            scrollTrigger: { trigger: ".names", start: "top 90%", end: "center 50%", scrub: 1 },
          },
        );
      }, root);

      const desktop = gsap.matchMedia(root.current);
      mm = desktop;

      desktop.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".scroll-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          },
        );

        // Light leaking through the seam floods out as the doors part.
        gsap.to(".door-crack", {
          scaleX: 40,
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".scene-doors",
            start: "top top",
            end: "35% top",
            scrub: 1,
          },
        });

        // Ornaments: the star spins in, then the lines grow out of it.
        gsap.utils.toArray<HTMLElement>(".ornament").forEach((orn) => {
          const star = orn.querySelector("svg");
          if (!star) return;
          const starX = star.getBoundingClientRect().left;
          const lines = gsap.utils.toArray<HTMLElement>(orn.querySelectorAll(".gold-line"));
          lines.forEach((line) => {
            const fromStar = line.getBoundingClientRect().left >= starX ? "left" : "right";
            gsap.set(line, { transformOrigin: `${fromStar} center` });
          });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: orn,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            })
            .from(star, { scale: 0, rotate: -180, duration: 0.8, ease: "back.out(2)" })
            .from(lines, { scaleX: 0, duration: 0.9, ease: "power3.out" }, 0.2);
        });

        gsap.utils.toArray<HTMLElement>(".count-up").forEach((el) => {
          const target = Number(el.textContent);
          const counter = { v: target > 100 ? target - 26 : 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v)).padStart(2, "0");
            },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.from(".map-pin", {
          y: -40,
          opacity: 0,
          duration: 1.1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: ".map-pin",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        // The units vanish once the event starts, so only animate them if present.
        const units = gsap.utils.toArray<HTMLElement>(".countdown-unit");
        const firstUnit = units[0];
        if (firstUnit) {
          gsap.from(units, {
            scale: 0.4,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: firstUnit,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // The couple walks in from both sides and meets under the arch.
        const couple = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".scene-couple",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
        couple
          .to(".couple-intro", { opacity: 0, y: -24, duration: 0.12 }, 0.02)
          .from(".couple-stage", { scale: 0.86, duration: 0.7, ease: "power1.out" }, 0)
          .from(
            ".couple-bride",
            { x: "-62vw", opacity: 0, duration: 0.6, ease: "power2.out" },
            0.04,
          )
          .from(".couple-groom", { x: "62vw", opacity: 0, duration: 0.6, ease: "power2.out" }, 0.04)
          .to(
            ".couple-bride .couple-step",
            { keyframes: { y: [0, -4, 0, -4, 0, -4, 0] }, duration: 0.6 },
            0.04,
          )
          .to(
            ".couple-groom .couple-step",
            { keyframes: { y: [0, -7, 0, -7, 0, -7, 0] }, duration: 0.6 },
            0.04,
          )
          .from(".couple-floor", { opacity: 0, scaleX: 0.3, duration: 0.6 }, 0.04)
          .fromTo(
            ".couple-glow",
            { opacity: 0.2, scale: 0.6 },
            { opacity: 1, scale: 1.15, duration: 0.4 },
            0.45,
          )
          .fromTo(
            ".couple-arch",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "power1.inOut" },
            0.46,
          )
          .from(".couple-rays", { opacity: 0, rotate: -30, duration: 0.38 }, 0.62)
          .from(
            ".couple-rings",
            { scale: 0, rotate: -50, opacity: 0, duration: 0.16, ease: "back.out(2.2)" },
            0.62,
          )
          .call(
            () => {
              if (couple.scrollTrigger?.direction !== -1) burstConfetti(gsap);
            },
            [],
            0.64,
          )
          .from(".couple-title > *", { opacity: 0, y: 26, duration: 0.14, stagger: 0.05 }, 0.66)
          .from(".couple-name-bride", { opacity: 0, x: -60, duration: 0.18 }, 0.7)
          .from(".couple-name-groom", { opacity: 0, x: 60, duration: 0.18 }, 0.7)
          .from(".couple-sparkles", { opacity: 0, duration: 0.2 }, 0.7)
          .to(".couple-bride", { x: "1.2vw", duration: 0.18 }, 0.8)
          .to(".couple-groom", { x: "-1.2vw", duration: 0.18 }, 0.8);
      });

      // Desktop: the two pages open like a book.
      desktop.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: ".book", start: "top 70%" };
        gsap.from(".page-right", {
          xPercent: 14,
          rotationY: -16,
          transformPerspective: 1600,
          transformOrigin: "left center",
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: trigger,
        });
        gsap.from(".page-left", {
          xPercent: -14,
          rotationY: 16,
          transformPerspective: 1600,
          transformOrigin: "right center",
          opacity: 0,
          duration: 1.5,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: trigger,
        });
        gsap.from(".spine", {
          scaleY: 0,
          opacity: 0,
          duration: 1.2,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: trigger,
        });
      });

      // Desktop with a mouse: 3D tilt, cursor light and parallax flowers.
      desktop.add(
        "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const tilts = gsap.utils.toArray<HTMLElement>(".tilt").map((el) => {
            gsap.set(el, { transformPerspective: 1400 });
            return {
              rx: gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3" }),
              ry: gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3" }),
            };
          });
          const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => {
            const depth = Number(el.dataset["depth"]);
            return {
              depth,
              x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }),
              y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }),
            };
          });
          const glow = document.querySelector<HTMLElement>(".cursor-glow");
          gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 });
          const glowX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" });
          const glowY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });

          // Gold dust trailing the cursor; throttled and capped so it stays cheap.
          const trail = document.createElement("div");
          trail.className = "pointer-events-none fixed inset-0 z-20 overflow-hidden";
          trail.setAttribute("aria-hidden", "true");
          root.current?.appendChild(trail);
          let lastDust = 0;
          const dropDust = (x: number, y: number) => {
            const now = performance.now();
            if (now - lastDust < 45 || trail.childElementCount > 22) return;
            lastDust = now;
            const dust = document.createElement("span");
            dust.className = "trail-dust";
            dust.style.left = `${x}px`;
            dust.style.top = `${y}px`;
            trail.appendChild(dust);
            gsap.fromTo(
              dust,
              { scale: gsap.utils.random(0.6, 1.2), opacity: 0.95 },
              {
                x: gsap.utils.random(-18, 18),
                y: gsap.utils.random(14, 46),
                scale: 0,
                opacity: 0,
                duration: gsap.utils.random(0.7, 1.2),
                ease: "power1.out",
                onComplete: () => dust.remove(),
              },
            );
          };

          let glowShown = false;
          const onMove = (e: MouseEvent) => {
            dropDust(e.clientX, e.clientY);
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            tilts.forEach((t) => {
              t.ry(nx * 7);
              t.rx(-ny * 5);
            });
            layers.forEach((l) => {
              l.x(-nx * l.depth);
              l.y(-ny * l.depth);
            });
            glowX(e.clientX);
            glowY(e.clientY);
            if (!glowShown) {
              glowShown = true;
              gsap.to(glow, { opacity: 1, duration: 0.6, overwrite: "auto" });
            }
          };
          const onLeave = () => {
            glowShown = false;
            gsap.to(glow, { opacity: 0, duration: 0.6, overwrite: "auto" });
          };

          window.addEventListener("mousemove", onMove, { passive: true });
          document.documentElement.addEventListener("mouseleave", onLeave);
          return () => {
            window.removeEventListener("mousemove", onMove);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            trail.remove();
          };
        },
      );

      // Web fonts change text heights after load, which shifts every trigger position.
      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      mm?.revert();
      ctx?.revert();
    };
  }, []);

  // Looping CSS animations keep repainting even when scrolled out of view; pause them there.
  useEffect(() => {
    const targets = root.current?.querySelectorAll(".text-gold-gradient, .sparkles");
    if (!targets?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting));
      },
      { rootMargin: "100px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={root} className="overflow-x-clip bg-background font-body text-foreground">
      <Splash />
      <div
        className="scroll-progress gold-line pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px] origin-right motion-reduce:hidden"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="cursor-glow pointer-events-none fixed left-0 top-0 z-20 hidden h-[36rem] w-[36rem] rounded-full opacity-0 lg:block" />
      <Petals />

      {/* Scene 1: doors */}
      <section className="scene-doors relative h-[220svh]">
        <div className="sticky top-0 h-svh overflow-hidden" style={{ perspective: "1600px" }}>
          <div className="bg-silk door-curtain absolute inset-0 origin-center" />
          <div className="door-glow bg-glow absolute inset-0" />
          <Sparkles count={16} />
          <div className="door-reveal absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
            <p className="font-display text-xl text-olive lg:text-3xl">بكل الحب نزفّ إليكم</p>
            <div className="mt-4 flex flex-col items-center lg:mt-8 lg:flex-row lg:gap-12">
              <p className="font-display text-gold-gradient names-ink text-7xl leading-tight lg:text-[9rem]">
                بلال
              </p>
              <span className="my-1 font-latin text-4xl italic text-[oklch(0.55_0.09_68)] lg:text-7xl">
                &amp;
              </span>
              <p className="font-display text-gold-gradient names-ink text-7xl leading-tight lg:text-[9rem]">
                روان
              </p>
            </div>
            <Ornament className="mt-6 lg:mt-10" />
            <p
              className="mt-4 font-latin text-lg tracking-[0.3em] text-gold lining-nums lg:text-2xl"
              dir="ltr"
            >
              19 · 10 · 2026
            </p>
          </div>
          <Door side="left" />
          <Door side="right" />
          <div className="door-crack pointer-events-none absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 motion-reduce:hidden">
            <span className="door-crack-light absolute inset-0" />
          </div>
          <div className="door-intro pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-pearl/95 px-10 py-10 shadow-card lg:px-16 lg:py-14">
              <p className="font-latin text-gold-gradient text-6xl italic leading-none lg:text-8xl">
                B &amp; R
              </p>
              <Ornament className="my-4 lg:my-6" />
              <h1 className="font-display text-2xl text-foreground lg:text-3xl">دعوة جاهة كريمة</h1>
            </div>
            <p className="mt-10 animate-pulse text-sm text-muted-foreground lg:hidden">
              اسحب للأسفل لفتح الدعوة
            </p>
            <span className="mt-2 text-gold lg:hidden" aria-hidden="true">
              ↓
            </span>
            <div className="mt-12 hidden flex-col items-center gap-3 lg:flex">
              <span className="mouse-hint" aria-hidden="true" />
              <p className="text-base text-muted-foreground">مرّر عجلة الفأرة لفتح الدعوة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 2: the bride and groom walk toward each other */}
      <CoupleScene />

      {/* Scene 3: stacked cards on phones, an open book on desktop */}
      <section className="book relative px-5 pb-28 lg:px-10 lg:pb-28 lg:pt-10">
        <img
          src={floral}
          decoding="async"
          alt=""
          width={900}
          height={900}
          loading="lazy"
          data-depth="40"
          className="pointer-events-none absolute -right-16 top-0 hidden w-[24rem] opacity-40 lg:block"
          style={{ scale: "-1 1" }}
        />
        <img
          src={floral}
          decoding="async"
          alt=""
          width={900}
          height={900}
          loading="lazy"
          data-depth="28"
          className="pointer-events-none absolute -left-16 bottom-0 hidden w-[24rem] opacity-40 lg:block"
          style={{ scale: "1 -1" }}
        />

        <div className="relative mx-auto flex max-w-md flex-col lg:max-w-6xl lg:flex-row lg:items-stretch">
          <div className="page-right lg:flex-1">
            <div className="tilt h-full">
              <InvitationPage />
            </div>
          </div>
          <CardSeam />
          <BookSpine />
          <div className="page-left lg:flex-1">
            <div className="tilt h-full">
              <DetailsPage />
            </div>
          </div>
        </div>

        <div className="reveal relative mt-12 text-center lg:mt-20">
          <Ornament />
          <p className="mt-3 font-display text-gold-gradient text-5xl lg:text-7xl">
            بلال &amp; روان
          </p>
        </div>
      </section>

      <MobileActionBar />
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
