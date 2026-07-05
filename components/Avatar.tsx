const PALETTES = [
  { g1: "#ec8a5e", g2: "#c85a37", ear: "cat", eye: "#3a1c10" },
  { g1: "#5fbfb4", g2: "#2f8f8a", ear: "bear", eye: "#123a37" },
  { g1: "#e6b64e", g2: "#c98a28", ear: "cat", eye: "#3a2708" },
  { g1: "#b6a0ec", g2: "#8a6ed8", ear: "bunny", eye: "#2a1e4a" },
  { g1: "#93d073", g2: "#57a648", ear: "none", eye: "#173a12" },
  { g1: "#72a0e6", g2: "#4a6ed6", ear: "none", eye: "#12234a" },
] as const;

export const AVATAR_VARIANT_COUNT = PALETTES.length;

function Ears({
  ear,
  size,
  g1,
  g2,
}: {
  ear: (typeof PALETTES)[number]["ear"];
  size: number;
  g1: string;
  g2: string;
}) {
  const gradient = `linear-gradient(150deg, ${g1}, ${g2})`;

  if (ear === "cat") {
    const e = size * 0.3;
    const base: React.CSSProperties = {
      position: "absolute",
      zIndex: 0,
      width: e,
      height: e,
      top: -e * 0.42,
      borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
      background: gradient,
    };
    return (
      <>
        <div style={{ ...base, left: size * 0.06, transform: "rotate(-16deg)" }} />
        <div style={{ ...base, right: size * 0.06, transform: "rotate(16deg)" }} />
      </>
    );
  }

  if (ear === "bear") {
    const e = size * 0.34;
    const base: React.CSSProperties = {
      position: "absolute",
      zIndex: 0,
      width: e,
      height: e,
      top: -e * 0.36,
      borderRadius: "50%",
      background: gradient,
    };
    return (
      <>
        <div style={{ ...base, left: size * 0.02 }} />
        <div style={{ ...base, right: size * 0.02 }} />
      </>
    );
  }

  if (ear === "bunny") {
    const w = size * 0.17;
    const h = size * 0.46;
    const base: React.CSSProperties = {
      position: "absolute",
      zIndex: 0,
      width: w,
      height: h,
      top: -h * 0.66,
      borderRadius: w,
      background: gradient,
    };
    return (
      <>
        <div style={{ ...base, left: size * 0.24, transform: "rotate(-11deg)" }} />
        <div style={{ ...base, right: size * 0.24, transform: "rotate(11deg)" }} />
      </>
    );
  }

  return null;
}

export default function Avatar({
  variant,
  size = 72,
  className,
  animate = true,
}: {
  variant: number;
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  const v = ((variant % PALETTES.length) + PALETTES.length) % PALETTES.length;
  const p = PALETTES[v];
  const delay = v * 0.25;

  const eyeSize = size * 0.115;
  const eyeY = size * 0.4;
  const eyeBase: React.CSSProperties = {
    position: "absolute",
    width: eyeSize,
    height: eyeSize,
    top: eyeY,
    borderRadius: "50%",
    background: p.eye,
  };

  const mouthW = size * 0.24;
  const mouthH = size * 0.12;

  const cheek = size * 0.13;
  const cheekBase: React.CSSProperties = {
    position: "absolute",
    width: cheek,
    height: cheek * 0.72,
    top: size * 0.52,
    borderRadius: "50%",
    background: "rgba(255,255,255,.28)",
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
        animation: animate
          ? `av-bob 3.2s ease-in-out ${delay}s infinite`
          : undefined,
      }}
    >
      <Ears ear={p.ear} size={size} g1={p.g1} g2={p.g2} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: "50%",
          background: `linear-gradient(150deg, ${p.g1}, ${p.g2})`,
          boxShadow: `inset 0 ${-size * 0.14}px ${size * 0.2}px rgba(0,0,0,.12), inset 0 ${
            size * 0.08
          }px ${size * 0.14}px rgba(255,255,255,.28)`,
        }}
      >
        <div style={{ ...cheekBase, left: size * 0.16 }} />
        <div style={{ ...cheekBase, right: size * 0.16 }} />
        <div style={{ ...eyeBase, left: size * 0.28 }} />
        <div style={{ ...eyeBase, right: size * 0.28 }} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: size * 0.55,
            width: mouthW,
            height: mouthH,
            borderBottom: `${size * 0.035}px solid ${p.eye}`,
            borderRadius: `0 0 ${mouthW}px ${mouthW}px`,
          }}
        />
      </div>
    </div>
  );
}
