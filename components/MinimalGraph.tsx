import dynamic from "next/dynamic";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { GraphData } from "@/interface/graph.interface";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const themes = {
  dark: {
    bg: "#0f0f13",
    containerBg: "bg-[#0f0f13]",
    containerBorder: "border-white/[0.08]",
    nodeIndex: "#ffffff",
    nodeLeaf: "#bbbbbb",
    selectedRing: "#ffffff",
    labelText: "#ffffff",
    labelTextMuted: "rgba(255,255,255,0.7)",
    linkColor: "rgba(255,255,255,0.12)",
    particleColor: "rgba(255,255,255,0.5)",
    badgeBorder: "border-white/[0.15]",
    badgeBg: "bg-white/[0.07]",
    badgeText: "text-white/80",
    btnBg: "bg-white/10 hover:bg-white/20",
    btnText: "text-white/80",
    btnBorder: "border-white/20",
    icon: "☀️",
    label: "Light",
  },
  light: {
    bg: "#ffffff",
    containerBg: "bg-white",
    containerBorder: "border-black/10",
    nodeIndex: "#000000",
    nodeLeaf: "#444444",
    selectedRing: "#000000",
    labelText: "#000000",
    labelTextMuted: "rgba(0,0,0,0.6)",
    linkColor: "rgba(0,0,0,0.15)",
    particleColor: "rgba(0,0,0,0.4)",
    badgeBorder: "border-black/[0.15]",
    badgeBg: "bg-black/[0.05]",
    badgeText: "text-black/70",
    btnBg: "bg-black/5 hover:bg-black/10",
    btnText: "text-black/70",
    btnBorder: "border-black/15",
    icon: "🌙",
    label: "Dark",
  },
} as const;

type MinimalGraphType = { data?: GraphData };

const MinimalGraph = (props: MinimalGraphType) => {
  const { data: graphData } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { theme: activeTheme } = useTheme();

  const t = themes[activeTheme];

  const handleNodeClick = (node: any) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
    console.log("Clicked node:", node.id);
  };

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Graph */}
      <div
        ref={containerRef}
        className={`relative h-[250px] mb-4 w-full overflow-hidden rounded-xl border ${t.containerBg} ${t.containerBorder}`}
      >
        {selectedNode && (
          <div
            className={`pointer-events-none absolute bottom-4 left-4 z-[2] rounded-lg border px-3 py-1.5 font-mono text-xs ${t.badgeBorder} ${t.badgeBg} ${t.badgeText}`}
          >
            {selectedNode.id}
          </div>
        )}

        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor={t.bg}
          nodeLabel="id"
          nodeAutoColorBy={undefined}
          nodeVal={8}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
            if (node.x == null || node.y == null) return;
            const label = node.id as string;
            const isIndex = label === "Index";
            const isSelected = selectedNode?.id === node.id;
            const radius = isIndex ? 4 : 3;
            const nodeColor = isIndex ? t.nodeIndex : t.nodeLeaf;

            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = nodeColor;
            ctx.shadowColor = nodeColor;
            ctx.shadowBlur = isSelected ? 16 : 0;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Selected ring
            if (isSelected) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius + 3, 0, 2 * Math.PI);
              ctx.strokeStyle = t.selectedRing;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }

            // Label
            const fontSize = isIndex ? 7 : 5;
            ctx.font = `${isIndex ? "600" : "400"} ${fontSize}px 'DM Mono', 'Fira Code', monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const textY = node.y + radius + 10;
            ctx.fillStyle = isIndex ? t.labelText : t.labelTextMuted;
            ctx.fillText(label, node.x, textY);
          }}
          nodePointerAreaPaint={(
            node: any,
            color: string,
            ctx: CanvasRenderingContext2D,
          ) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 14, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
          }}
          linkColor={() => t.linkColor}
          linkWidth={1}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
          linkDirectionalParticleWidth={1.5}
          linkDirectionalParticleColor={() => t.particleColor}
          onNodeClick={handleNodeClick}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
        />
      </div>
    </div>
  );
};

export default MinimalGraph;
