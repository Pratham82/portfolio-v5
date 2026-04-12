import dynamic from "next/dynamic";

import { useEffect, useRef, useState } from "react";

// ForceGraph2D must be loaded client-side only (no SSR)
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface Node {
  id: string;
  val?: number;
}

interface Link {
  source: string;
  target: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const data: GraphData = {
  nodes: [
    { id: "Index" },
    { id: "Experience" },
    { id: "Projects" },
    { id: "Blogs" },
    { id: "Links" },
    { id: "About" },
    { id: "Uses" },
  ],
  links: [
    { source: "Index", target: "Experience" },
    { source: "Index", target: "Projects" },
    { source: "Index", target: "Blogs" },
    { source: "Index", target: "Links" },
    { source: "Index", target: "About" },
    { source: "Index", target: "Uses" },
  ],
};

const KnowledgeGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = (node: any) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
    // Add your custom click logic here, e.g. router.push(`/${node.id}`)
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
    <div
      ref={containerRef}
      className="relative h-[250px] my-4 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0f0f13]"
    >
      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {selectedNode && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-[2] rounded-lg border border-white/[0.15] bg-white/[0.07] px-3 py-1.5 font-mono text-xs text-white/85">
          {selectedNode.id}
        </div>
      )}
      {/**/}
      {/* <ForceGraph2D */}
      {/*   graphData={data} */}
      {/*   width={dimensions.width} */}
      {/*   height={dimensions.height} */}
      {/*   backgroundColor="#0f0f13" */}
      {/*   nodeLabel="id" */}
      {/*   nodeAutoColorBy="id" */}
      {/*   nodeVal={8} */}
      {/*   nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => { */}
      {/*     if (node.x == null || node.y == null) return; */}
      {/*     const label = node.id as string; */}
      {/*     const isIndex = label === "Index"; */}
      {/*     const isSelected = selectedNode?.id === node.id; */}
      {/*     const radius = isIndex ? 4 : 3; */}
      {/**/}
      {/*     // Glow effect */}
      {/*     const gradient = ctx.createRadialGradient( */}
      {/*       node.x, */}
      {/*       node.y, */}
      {/*       0, */}
      {/*       node.x, */}
      {/*       node.y, */}
      {/*       radius * 3, */}
      {/*     ); */}
      {/*     gradient.addColorStop(0, `${node.color}55`); */}
      {/*     gradient.addColorStop(1, `${node.color}00`); */}
      {/*     ctx.beginPath(); */}
      {/*     ctx.arc(node.x, node.y, radius * 3, 0, 2 * Math.PI); */}
      {/*     ctx.fillStyle = gradient; */}
      {/*     ctx.fill(); */}
      {/**/}
      {/*     // Node circle */}
      {/*     ctx.beginPath(); */}
      {/*     ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI); */}
      {/*     ctx.fillStyle = node.color; */}
      {/*     ctx.shadowColor = node.color; */}
      {/*     ctx.shadowBlur = isSelected ? 20 : 12; */}
      {/*     ctx.fill(); */}
      {/*     ctx.shadowBlur = 0; */}
      {/**/}
      {/*     // Selected ring */}
      {/*     if (isSelected) { */}
      {/*       ctx.beginPath(); */}
      {/*       ctx.arc(node.x, node.y, radius + 3, 0, 2 * Math.PI); */}
      {/*       ctx.strokeStyle = "#ffffff"; */}
      {/*       ctx.lineWidth = 1.5; */}
      {/*       ctx.stroke(); */}
      {/*     } */}
      {/**/}
      {/*     // Label */}
      {/*     const fontSize = isIndex ? 8 : 6; */}
      {/*     ctx.font = `${isIndex ? "600" : "400"} ${fontSize}px 'DM Mono', 'Fira Code', monospace`; */}
      {/*     ctx.textAlign = "center"; */}
      {/*     ctx.textBaseline = "middle"; */}
      {/**/}
      {/*     const textY = node.y + radius + 14; */}
      {/*     const padding = 6; */}
      {/*     const textWidth = ctx.measureText(label).width; */}
      {/**/}
      {/*     ctx.fillStyle = "rgba(15, 15, 19, 0.75)"; */}
      {/*     ctx.beginPath(); */}
      {/*     ctx.roundRect( */}
      {/*       node.x - textWidth / 2 - padding, */}
      {/*       textY - fontSize / 2 - 3, */}
      {/*       textWidth + padding * 2, */}
      {/*       fontSize + 6, */}
      {/*       4, */}
      {/*     ); */}
      {/*     ctx.fill(); */}
      {/**/}
      {/*     ctx.fillStyle = isIndex ? "#ffffff" : "rgba(255,255,255,0.75)"; */}
      {/*     ctx.fillText(label, node.x, textY); */}
      {/*   }} */}
      {/*   nodePointerAreaPaint={( */}
      {/*     node: any, */}
      {/*     color: string, */}
      {/*     ctx: CanvasRenderingContext2D, */}
      {/*   ) => { */}
      {/*     ctx.beginPath(); */}
      {/*     ctx.arc(node.x, node.y, 14, 0, 2 * Math.PI); */}
      {/*     ctx.fillStyle = color; */}
      {/*     ctx.fill(); */}
      {/*   }} */}
      {/*   linkColor={() => "rgba(255,255,255,0.12)"} */}
      {/*   linkWidth={1.5} */}
      {/*   linkDirectionalParticles={2} */}
      {/*   linkDirectionalParticleSpeed={0.005} */}
      {/*   linkDirectionalParticleWidth={2.5} */}
      {/*   linkDirectionalParticleColor={() => "rgba(160,200,255,0.8)"} */}
      {/*   onNodeClick={handleNodeClick} */}
      {/*   cooldownTicks={100} */}
      {/*   d3AlphaDecay={0.02} */}
      {/*   d3VelocityDecay={0.3} */}
      {/* /> */}

      <ForceGraph2D
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#ffffff"
        nodeLabel="id"
        nodeAutoColorBy={undefined}
        nodeVal={8}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
          if (node.x == null || node.y == null) return;
          const label = node.id as string;
          const isIndex = label === "Index";
          const isSelected = selectedNode?.id === node.id;
          const radius = isIndex ? 4 : 3;

          // Node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = isIndex ? "#000000" : "#444444";
          ctx.fill();

          // Selected ring
          if (isSelected) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + 3, 0, 2 * Math.PI);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Label
          const fontSize = isIndex ? 8 : 6;
          ctx.font = `${isIndex ? "600" : "400"} ${fontSize}px 'DM Mono', 'Fira Code', monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const textY = node.y + radius + 10;
          ctx.fillStyle = isIndex ? "#000000" : "#555555";
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
        linkColor={() => "rgba(0,0,0,0.15)"}
        linkWidth={1}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleColor={() => "rgba(0,0,0,0.4)"}
        onNodeClick={handleNodeClick}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />
    </div>
  );
};

export default KnowledgeGraph;
