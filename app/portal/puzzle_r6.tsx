"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

/* ------------------------------------------------------------------ */
/* Assets                                                              */
/* ------------------------------------------------------------------ */

const BASE       = "/images/puzzles/Al%20Quds";
const IMG_OUTER  = `${BASE}/03_outer_rotating_ring.png`;
const IMG_INNER  = `${BASE}/02_inner_rotating_ring.png`;
const IMG_CENTER = `${BASE}/01_stationary_center_real_diamond.png`;
const IMG_VIEW   = `${BASE}/overlook.jpeg`;
const IMG_AXON   = `${BASE}/Monument%20Axon.JPG`;

/* ------------------------------------------------------------------ */
/* Puzzle config                                                        */
/* ------------------------------------------------------------------ */

const ROUND_KEY   = "r6" as const;
const OUTER_START = 72;    // deg off solved
const INNER_START = -44;   // deg off solved
const SNAP_DEG    = 5;     // snap to 0 when within ±5°

// Fraction of stage half-width defining drag zones.
// Tune these if the ring hit areas feel off after checking the PNGs.
const INNER_ZONE = 0.42;   // < this = inner ring drag zone
const OUTER_ZONE = 0.88;   // > this = outside stone, ignore

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Shortest angular distance from the nearest multiple of 360° */
function distFromZero(angle: number): number {
  const mod = ((angle % 360) + 360) % 360;
  return Math.min(mod, 360 - mod);
}

/** Snap angle to the nearest full rotation */
function snapNearest(angle: number): number {
  return Math.round(angle / 360) * 360;
}

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

const COPY = {
  en: {
    badge:    "Round 6 · Monument",
    title:    "Reassemble the iconic stone monument to unlock the next location.",
    subtitle: "Drag each ring to rotate it. Align both to restore the stone.",

    hintBtn1: "Need a hint?",
    hint1:    "Both rings need to move — don't get stuck on one.",
    hintBtn2: "Another hint?",
    hint2:    "Watch the stone texture at the ring boundary. When it matches across both sides, you are close.",
    hintBtn3: "One more?",
    hint3:    "Slow down once you feel close. The snap will catch you.",

    outerLabel: "Outer Ring",
    innerLabel: "Inner Ring",
    outerAria:  "Rotate outer stone ring",
    innerAria:  "Rotate inner stone ring",

    ring1Banner: "First ring locked — now align the second.",

    solvedEyebrow: "Restored",
    solvedHead:    "You put it back together.",
    solvedBody:    "Walk toward the First Circle in search of the real stone monument you just reassembled — a well-deserved moment of reflection overlooking downtown Amman.",
    solvedCTA:     "I found it",

    physHintBtn1: "Can't find it?",
    physHint1:    "It's right next to Falafel Al Quds — the iconic falafel place that has been a staple on Rainbow Street since 1966. Look for a freestanding piece of stone near the edge of the terrace.",
    physHintBtn2: "Still can't find it?",

    aboutEyebrow: "The overlook",
    aboutTitle:   "A room without walls",
    aboutBody:    "This little terrace is one of the quietest spots on the busiest street in Amman. No sign points to it. No reason to stop — unless you slow down enough to notice it.\n\nThe city spreads out below you — towers, hills, the dense texture of downtown. This is what Rainbow Street has been quietly opening toward all along.",
    outroLine:    "Take in the view and solve your next puzzle right here.",
  },
  ar: {
    badge:    "الجولة ٦ · المعلم",
    title:    "أعِد تجميع المعلم الحجري الشهير لفتح موقعك التالي.",
    subtitle: "اسحب كل حلقة لتدويرها. اضبط كلتيهما لاستعادة الحجر.",

    hintBtn1: "تحتاج إلى تلميح؟",
    hint1:    "كلتا الحلقتين تحتاجان إلى الحركة — لا تعلق في واحدة.",
    hintBtn2: "تلميح آخر؟",
    hint2:    "راقب ملمس الحجر عند حدود الحلقة. عندما يتطابق الجانبان فأنت قريب.",
    hintBtn3: "تلميح إضافي؟",
    hint3:    "تمهّل عندما تشعر بالاقتراب. سيلتقطك الإغلاق.",

    outerLabel: "الحلقة الخارجية",
    innerLabel: "الحلقة الداخلية",
    outerAria:  "تدوير الحلقة الخارجية",
    innerAria:  "تدوير الحلقة الداخلية",

    ring1Banner: "الحلقة الأولى ثُبِّتت — الآن اضبط الثانية.",

    solvedEyebrow: "تمّت الاستعادة",
    solvedHead:    "لقد أعدت تجميعه.",
    solvedBody:    "سِر نحو الدوار الأول بحثاً عن المعلم الحجري الحقيقي الذي أعدت تجميعه — لحظة تأمل تستحقها مطلّاً على وسط عمّان.",
    solvedCTA:     "وجدته",

    physHintBtn1: "لا تجده؟",
    physHint1:    "إنه بجانب فلافل القدس — المطعم الشهير الذي يُعدّ ركيزة في شارع الرينبو منذ عام ١٩٦٦. ابحث عن قطعة حجر مستقلة قرب حافة التراس.",
    physHintBtn2: "ما زلت لا تجده؟",

    aboutEyebrow: "الإطلالة",
    aboutTitle:   "غرفة بلا جدران",
    aboutBody:    "هذا التراس الصغير هو أحد أهدأ الأماكن في أكثر شوارع عمّان ازدحاماً. لا لافتة تشير إليه. لا سبب للتوقف — ما لم تتمهّل كفاية لتلاحظه.\n\nتنتشر المدينة أمامك — أبراج وتلال والنسيج الكثيف لوسط البلد. هذا ما كان شارع الرينبو يفتح نحوه بهدوء طوال الوقت.",
    outroLine:    "استمتع بالمنظر وحلّ لغزك التالي هنا.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Shared UI atoms                                                      */
/* ------------------------------------------------------------------ */

function HintBox({ text, isAr }: { text: string; isAr: boolean }) {
  return (
    <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
        {isAr ? "تلميح" : "Hint"}
      </p>
      <p className="text-sm leading-6 text-amber-900">{text}</p>
    </div>
  );
}

function HintToggle({
  open,
  onToggle,
  label,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onToggle}
      className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-z-orange"
    >
      <span aria-hidden="true">{open ? "↑" : "↓"}</span>
      <span>{label}</span>
    </button>
  );
}

function StepCTA({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-z-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.98]"
    >
      <span className="relative z-10">{label}</span>
      <span
        className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Stone stage                                                          */
/* ------------------------------------------------------------------ */

const LAYER: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  userSelect: "none",
  pointerEvents: "none",
  display: "block",
};

interface StageProps {
  outerAngle: number;
  innerAngle: number;
  outerLocked: boolean;
  innerLocked: boolean;
  solved: boolean;
  warmth: number;
  onDelta: (ring: "outer" | "inner", delta: number) => void;
}

function StoneStage({
  outerAngle,
  innerAngle,
  outerLocked,
  innerLocked,
  solved,
  warmth,
  onDelta,
}: StageProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const dragRef  = React.useRef<{ ring: "outer" | "inner"; lastAngle: number } | null>(null);
  const [dragging, setDragging] = React.useState(false);

  function ptrAngle(e: PointerEvent, r: DOMRect) {
    return (
      Math.atan2(
        e.clientY - (r.top  + r.height / 2),
        e.clientX - (r.left + r.width  / 2),
      ) * (180 / Math.PI)
    );
  }

  function ptrDist(e: PointerEvent, r: DOMRect) {
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (solved) return;
    const rect = stageRef.current!.getBoundingClientRect();
    const dist = ptrDist(e.nativeEvent, rect);
    const half = rect.width / 2;

    let ring: "outer" | "inner" | null = null;
    if (dist < half * INNER_ZONE && !innerLocked) {
      ring = "inner";
    } else if (dist < half * OUTER_ZONE && !outerLocked) {
      ring = "outer";
    }
    if (!ring) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    dragRef.current = { ring, lastAngle: ptrAngle(e.nativeEvent, rect) };
    setDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const rect = stageRef.current!.getBoundingClientRect();
    const newA = ptrAngle(e.nativeEvent, rect);
    let delta  = newA - dragRef.current.lastAngle;
    if (delta >  180) delta -= 360;
    if (delta < -180) delta += 360;
    dragRef.current.lastAngle = newA;
    onDelta(dragRef.current.ring, delta);
  }

  function handlePointerUp() {
    dragRef.current = null;
    setDragging(false);
  }

  // Warm amber glow — grows as rings approach alignment
  const glowPx  = Math.round(warmth * 24);
  const glowAlp = (warmth * 0.7).toFixed(2);
  const filter  =
    warmth > 0.07
      ? `drop-shadow(0 0 ${glowPx}px rgba(196,162,79,${glowAlp}))`
      : undefined;

  return (
    <div className="flex justify-center">
      <div
        ref={stageRef}
        className="relative select-none"
        style={{
          width: "min(78vw, 360px)",
          aspectRatio: "1 / 1",
          cursor: solved ? "default" : dragging ? "grabbing" : "grab",
          touchAction: "none",
          filter,
          transition: "filter 0.25s ease",
          // Settle bounce on solve
          animation: solved ? "r6Settle 650ms cubic-bezier(.22,1,.36,1) 280ms both" : undefined,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* ── Layer 1 (bottom): outer rotating ring ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_OUTER}
          alt=""
          draggable={false}
          style={{
            ...LAYER,
            transform: `rotate(${outerAngle}deg)`,
            transformOrigin: "50% 50%",
            transition:
              outerLocked || solved
                ? "transform 0.5s cubic-bezier(.22,1,.36,1)"
                : undefined,
          }}
        />

        {/* ── Layer 2 (middle): inner rotating ring ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_INNER}
          alt=""
          draggable={false}
          style={{
            ...LAYER,
            transform: `rotate(${innerAngle}deg)`,
            transformOrigin: "50% 50%",
            transition:
              innerLocked || solved
                ? "transform 0.5s cubic-bezier(.22,1,.36,1)"
                : undefined,
          }}
        />

        {/* ── Layer 3 (top): stationary center — never rotates ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_CENTER}
          alt="Stone monument"
          draggable={false}
          style={LAYER}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nudge buttons — accessibility / fine-tune fallback                  */
/* ------------------------------------------------------------------ */

function NudgeRow({
  label,
  aria,
  locked,
  solved,
  onNudge,
}: {
  label: string;
  aria: string;
  locked: boolean;
  solved: boolean;
  onNudge: (d: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-24 shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] ${
          locked ? "text-green-600" : "text-neutral-400"
        }`}
      >
        {locked ? "✓ " : ""}
        {label}
      </span>
      <div className="flex gap-1">
        {([-5, 5] as const).map(d => (
          <button
            key={d}
            type="button"
            disabled={locked || solved}
            onClick={() => onNudge(d)}
            aria-label={`${aria} ${d > 0 ? "+" : ""}${d}°`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-base text-neutral-600 hover:bg-neutral-50 disabled:opacity-30"
          >
            {d < 0 ? "‹" : "›"}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

export default function PuzzleR6({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t    = COPY[safeLocale];

  // Refs so effects / timeouts always see current values without re-subscribing
  const solvedRef      = React.useRef(false);
  const outerLockedRef = React.useRef(false);
  const innerLockedRef = React.useRef(false);
  const lastHapticRef  = React.useRef(0);
  const onSolvedRef    = React.useRef(onSolved);
  React.useLayoutEffect(() => { onSolvedRef.current = onSolved; }, [onSolved]);

  // Live angle refs — readable inside dwell timeouts without stale closure issues
  const outerAngleRef = React.useRef(OUTER_START);
  const innerAngleRef = React.useRef(INNER_START);

  // Dwell timers — ring must stay within tolerance for DWELL_MS before locking
  const DWELL_MS       = 600;
  const outerDwellRef  = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const innerDwellRef  = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up pending timers if the component unmounts mid-puzzle
  React.useEffect(() => () => {
    if (outerDwellRef.current) clearTimeout(outerDwellRef.current);
    if (innerDwellRef.current) clearTimeout(innerDwellRef.current);
  }, []);

  const successRef = React.useRef<HTMLDivElement>(null);
  const aboutRef   = React.useRef<HTMLDivElement>(null);

  const [outerAngle,  setOuterAngle]  = React.useState(OUTER_START);
  const [innerAngle,  setInnerAngle]  = React.useState(INNER_START);
  const [outerLocked, setOuterLocked] = React.useState(false);
  const [innerLocked, setInnerLocked] = React.useState(false);
  const [solved,      setSolved]      = React.useState(false);
  const [confirmed,   setConfirmed]   = React.useState(false);
  const [showBanner,  setShowBanner]  = React.useState(false);

  // Hint states
  const [showH1, setShowH1] = React.useState(false);
  const [showH2, setShowH2] = React.useState(false);
  const [showH3, setShowH3] = React.useState(false);
  const [showP1, setShowP1] = React.useState(false);
  const [showP2, setShowP2] = React.useState(false);

  // Proximity warmth for glow (0–1)
  const oDist   = outerLocked ? 0 : distFromZero(outerAngle);
  const iDist   = innerLocked ? 0 : distFromZero(innerAngle);
  const warmth  =
    Math.max(0, 1 - oDist / 30) * 0.5 +
    Math.max(0, 1 - iDist / 30) * 0.5;

  // Keep live angle refs in sync so dwell timeouts read fresh values
  React.useEffect(() => { outerAngleRef.current = outerAngle; }, [outerAngle]);
  React.useEffect(() => { innerAngleRef.current = innerAngle; }, [innerAngle]);

  // Called from inside a dwell timeout after the ring has held still long enough
  function commitFullSolve() {
    if (solvedRef.current) return;
    if (!outerLockedRef.current || !innerLockedRef.current) return;
    solvedRef.current = true;
    setShowBanner(false);
    setSolved(true);
    setRoundSolved(ROUND_KEY);
    serverSetRoundSolved(ROUND_KEY);
    onSolvedRef.current?.();
    setTimeout(() => {
      try { navigator.vibrate([30, 20, 60, 20, 110, 20, 220]); } catch { /* ignore */ }
    }, 200);
  }

  // ── Solve detection, sequential locking, proximity haptics ─────────
  React.useEffect(() => {
    if (solvedRef.current) return;

    const oD  = distFromZero(outerAngle);
    const iD  = distFromZero(innerAngle);
    const oOk = oD < SNAP_DEG;
    const iOk = iD < SNAP_DEG;

    // Outer ring: start dwell timer when in zone, cancel if it leaves
    if (!outerLockedRef.current) {
      if (oOk) {
        if (!outerDwellRef.current) {
          outerDwellRef.current = setTimeout(() => {
            outerDwellRef.current = null;
            if (outerLockedRef.current) return;
            if (distFromZero(outerAngleRef.current) >= SNAP_DEG) return;
            outerLockedRef.current = true;
            setOuterLocked(true);
            setOuterAngle(snapNearest(outerAngleRef.current));
            if (!innerLockedRef.current) setShowBanner(true);
            try { navigator.vibrate([30, 15, 75]); } catch { /* ignore */ }
            commitFullSolve();
          }, DWELL_MS);
        }
      } else {
        if (outerDwellRef.current) {
          clearTimeout(outerDwellRef.current);
          outerDwellRef.current = null;
        }
      }
    }

    // Inner ring: same pattern
    if (!innerLockedRef.current) {
      if (iOk) {
        if (!innerDwellRef.current) {
          innerDwellRef.current = setTimeout(() => {
            innerDwellRef.current = null;
            if (innerLockedRef.current) return;
            if (distFromZero(innerAngleRef.current) >= SNAP_DEG) return;
            innerLockedRef.current = true;
            setInnerLocked(true);
            setInnerAngle(snapNearest(innerAngleRef.current));
            if (!outerLockedRef.current) setShowBanner(true);
            try { navigator.vibrate([30, 15, 75]); } catch { /* ignore */ }
            commitFullSolve();
          }, DWELL_MS);
        }
      } else {
        if (innerDwellRef.current) {
          clearTimeout(innerDwellRef.current);
          innerDwellRef.current = null;
        }
      }
    }

    // Proximity haptics — pulse as user gets warm (throttled)
    const minDist = Math.min(
      outerLockedRef.current ? 999 : oD,
      innerLockedRef.current ? 999 : iD,
    );
    const now = Date.now();
    if (minDist < 9 && now - lastHapticRef.current > 320) {
      lastHapticRef.current = now;
      try { navigator.vibrate(8); } catch { /* ignore */ }
    } else if (minDist < 20 && now - lastHapticRef.current > 700) {
      lastHapticRef.current = now;
      try { navigator.vibrate(4); } catch { /* ignore */ }
    }
  }, [outerAngle, innerAngle]);

  // Scroll to success after settle animation (500 ms delay)
  React.useEffect(() => {
    if (!solved) return;
    const id = window.setTimeout(
      () => successRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      750,
    );
    return () => window.clearTimeout(id);
  }, [solved]);

  React.useEffect(() => {
    if (!confirmed) return;
    const id = window.setTimeout(
      () => aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      150,
    );
    return () => window.clearTimeout(id);
  }, [confirmed]);

  function handleDelta(ring: "outer" | "inner", delta: number) {
    if (ring === "outer" && !outerLockedRef.current) setOuterAngle(v => v + delta);
    if (ring === "inner" && !innerLockedRef.current) setInnerAngle(v => v + delta);
  }

  /* ---------------------------------------------------------------- */

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full space-y-4">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
          {t.badge}
        </div>
        <h2 className="text-xl font-semibold text-neutral-950">{t.title}</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{t.subtitle}</p>
      </div>

      {/* ── Puzzle card ────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-5">

        {/* Digital hints */}
        {!solved && (
          <>
            <HintToggle open={showH1} onToggle={() => setShowH1(v => !v)} label={t.hintBtn1} />
            {showH1 && (
              <>
                <HintBox text={t.hint1} isAr={isAr} />
                <HintToggle open={showH2} onToggle={() => setShowH2(v => !v)} label={t.hintBtn2} />
                {showH2 && (
                  <>
                    <HintBox text={t.hint2} isAr={isAr} />
                    <HintToggle open={showH3} onToggle={() => setShowH3(v => !v)} label={t.hintBtn3} />
                    {showH3 && <HintBox text={t.hint3} isAr={isAr} />}
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* "First ring locked" banner */}
        {showBanner && !solved && (
          <div
            className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-800"
            style={{ animation: "r6FadeUp 320ms cubic-bezier(.22,1,.36,1) both" }}
          >
            {t.ring1Banner}
          </div>
        )}

        {/* Stone */}
        <div className="mt-5">
          <StoneStage
            outerAngle={outerAngle}
            innerAngle={innerAngle}
            outerLocked={outerLocked}
            innerLocked={innerLocked}
            solved={solved}
            warmth={warmth}
            onDelta={handleDelta}
          />
        </div>

        {/* Nudge buttons — visible while unsolved */}
        {!solved && (
          <div className="mt-4 space-y-2.5" dir="ltr">
            <NudgeRow
              label={t.outerLabel}
              aria={t.outerAria}
              locked={outerLocked}
              solved={solved}
              onNudge={d => handleDelta("outer", d)}
            />
            <NudgeRow
              label={t.innerLabel}
              aria={t.innerAria}
              locked={innerLocked}
              solved={solved}
              onNudge={d => handleDelta("inner", d)}
            />
          </div>
        )}

        {/* Success reveal — delayed so settle animation shows first */}
        {solved && (
          <div
            ref={successRef}
            className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
            style={{ animation: "r6FadeUp 420ms cubic-bezier(.22,1,.36,1) 600ms both" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange">
              {t.solvedEyebrow}
            </p>
            <p className="mt-2 text-xl font-semibold text-neutral-950">{t.solvedHead}</p>
            <p className="mt-3 text-sm leading-6 text-neutral-700">{t.solvedBody}</p>

            {/* Contextual images */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_AXON}
                alt="The stone monument"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_VIEW}
                alt="The Rainbow Street overlook"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>

            {/* Physical monument hints — useful before they find it */}
            {!confirmed && (
              <>
                <HintToggle open={showP1} onToggle={() => setShowP1(v => !v)} label={t.physHintBtn1} />
                {showP1 && (
                  <>
                    <HintBox text={t.physHint1} isAr={isAr} />
                    <HintToggle open={showP2} onToggle={() => setShowP2(v => !v)} label={t.physHintBtn2} />
                    {showP2 && (
                      <a
                        href="https://maps.app.goo.gl/kya6xiydJ9amJMcX8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                      >
                        <span>📍</span>
                        <span>{isAr ? "خذني إلى المعلم" : "Take me to the monument"}</span>
                      </a>
                    )}
                  </>
                )}
              </>
            )}

            {!confirmed && (
              <StepCTA label={t.solvedCTA} onClick={() => setConfirmed(true)} />
            )}
          </div>
        )}
      </div>

      {/* ── Physical payoff ─────────────────────────────────────────── */}
      {confirmed && (
        <div
          ref={aboutRef}
          className="rounded-3xl border border-neutral-200 bg-white p-5"
          style={{ animation: "r6FadeUp 420ms cubic-bezier(.22,1,.36,1) both" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
            {t.aboutEyebrow}
          </p>
          <h4 className="mt-2 text-lg font-semibold text-neutral-950">{t.aboutTitle}</h4>

          <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-700">
            {t.aboutBody.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <p className="mt-5 text-sm font-semibold text-neutral-950">{t.outroLine}</p>
        </div>
      )}

      <style jsx>{`
        @keyframes r6FadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes r6Settle {
          0%   { transform: scale(1); }
          22%  { transform: scale(1.018); }
          50%  { transform: scale(0.991); }
          74%  { transform: scale(1.008); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
