type SkillKind = "technical" | "content" | "analytics" | "workflow";

export function SkillDiagram({ kind }: { kind: SkillKind }) {
  return (
    <svg className={`skill-diagram skill-diagram-${kind}`} viewBox="0 0 600 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {kind === "technical" && <>
        <path className="diagram-guide" d="M22 110H578M22 40H578" />
        <path className="diagram-trace" pathLength="1" d="M75 75H190L245 35H355L410 75H525" />
        <path className="diagram-alert" d="M190 75L245 115H355" />
        {[75, 190, 245, 355, 410, 525].map((x, i) => <circle className={i === 2 ? "diagram-node diagram-node-focus" : "diagram-node"} key={x} cx={x} cy={i === 2 || i === 3 ? 35 : 75} r={i === 2 ? 10 : 6} />)}
        <rect className="diagram-frame" x="30" y="56" width="90" height="38" rx="5" />
        <rect className="diagram-frame" x="480" y="56" width="90" height="38" rx="5" />
      </>}
      {kind === "content" && <>
        <path className="diagram-guide" d="M22 120H578" />
        {[34, 65, 96].map((y, i) => <g key={y}><circle className="diagram-node" cx="60" cy={y} r="5" /><path className="diagram-hairline" d={`M76 ${y}H${155 + i * 20}`} /></g>)}
        <path className="diagram-trace" pathLength="1" d="M170 34C230 34 225 75 288 75H355C410 75 410 32 465 32M170 96C230 96 225 75 288 75M355 75C410 75 410 106 465 106" />
        <circle className="diagram-node diagram-node-focus" cx="310" cy="75" r="17" />
        <rect className="diagram-frame" x="465" y="16" width="100" height="33" rx="5" />
        <rect className="diagram-frame" x="465" y="90" width="100" height="33" rx="5" />
        <path className="diagram-hairline" d="M482 33h64M482 106h64" />
      </>}
      {kind === "analytics" && <>
        {[0, 1, 2, 3].map((col) => [0, 1, 2].map((row) => <rect className={col === 2 && row === 1 ? "diagram-cell diagram-cell-focus" : "diagram-cell"} key={`${col}-${row}`} x={83 + col * 108} y={20 + row * 37} width="86" height="27" rx="4" />))}
        <path className="diagram-trace" pathLength="1" d="M68 124H510M126 105L234 68L342 68L450 31" />
        <circle className="diagram-node diagram-node-focus" cx="342" cy="68" r="8" />
        <path className="diagram-hairline" d="M525 26v92M515 36h20M515 108h20" />
      </>}
      {kind === "workflow" && <>
        {[0, 1, 2].map((row) => <g key={row}><path className="diagram-hairline" d={`M35 ${31 + row * 42}H205`} /><circle className="diagram-node" cx="35" cy={31 + row * 42} r="5" /></g>)}
        <path className="diagram-trace" pathLength="1" d="M215 31C274 31 267 75 315 75M215 73H315M215 115C274 115 267 75 315 75H395" />
        <circle className="diagram-node diagram-node-focus" cx="315" cy="75" r="16" />
        {[0, 1, 2].map((row) => <g key={row}><rect className="diagram-frame" x="410" y={17 + row * 42} width="155" height="28" rx="4" /><path className="diagram-hairline" d={`M443 ${31 + row * 42}H543`} /><path className="diagram-check" d={`M419 ${31 + row * 42}l5 5 9-11`} /></g>)}
      </>}
    </svg>
  );
}
