export default function ResultLoading() {
  return (
    <div className="flex animate-pulse items-start gap-[14px] border-b border-divider py-4 dt:items-center dt:gap-[22px] dt:py-5">
      <div
        className="shrink-0 rounded-[6px] bg-surface"
        style={{ width: "clamp(72px,20vw,96px)", height: "clamp(72px,20vw,96px)" }}
      />
      <div className="flex-grow">
        <div className="mb-2 h-4 w-40 rounded bg-surface" />
        <div className="mb-2 h-3.5 w-32 rounded bg-surface" />
        <div className="h-3 w-20 rounded bg-surface" />
      </div>
    </div>
  );
}
