import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
  x?: number;
  y?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  value: number;
}

export const TransparencyGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.offsetWidth,
          height: 500 // Fixed height
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const width = dimensions.width;
    const height = dimensions.height;

    // Simulation Data
    const nodes: Node[] = [
      { id: "Community", group: 1 },
      { id: "CoopOx System", group: 2 },
      { id: "Small Biz", group: 3 },
      { id: "Farming", group: 3 },
      { id: "Housing", group: 3 },
      { id: "Education", group: 3 },
    ];

    const links: Link[] = [
      { source: "Community", target: "CoopOx System", value: 10 },
      { source: "CoopOx System", target: "Small Biz", value: 5 },
      { source: "CoopOx System", target: "Farming", value: 3 },
      { source: "CoopOx System", target: "Housing", value: 4 },
      { source: "CoopOx System", target: "Education", value: 2 },
      { source: "Small Biz", target: "Community", value: 2 }, // Return
      { source: "Farming", target: "Community", value: 1 }, // Return
    ];

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(50));

    // Define gradients
    const defs = svg.append("defs");
    
    const gradient = defs.append("linearGradient")
      .attr("id", "thread-gradient")
      .attr("gradientUnits", "userSpaceOnUse");
      
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#2B543D"); // Forest
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#D4A500"); // Goldenrod

    // Draw Links (Threads)
    const link = svg.append("g")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", "url(#thread-gradient)")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value) * 2)
      .attr("fill", "none");

    // Draw Nodes (Knots)
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Outer circle for node
    node.append("circle")
      .attr("r", 20)
      .attr("fill", "#FDFBF6")
      .attr("stroke", "#2B543D")
      .attr("stroke-width", 2);

    // Inner circle
    node.append("circle")
      .attr("r", 8)
      .attr("fill", d => d.group === 2 ? "#D4A500" : "#425B77");

    // Labels
    node.append("text")
      .text(d => d.id)
      .attr("x", 0)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .attr("class", "font-sans text-xs font-semibold fill-forest pointer-events-none");

    simulation.on("tick", () => {
      // Curved paths for organic feel
      link.attr("d", (d: any) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Gentle pulse animation for the Hub
    setInterval(() => {
        simulation.alpha(0.1).restart();
    }, 4000);

  }, [dimensions]);

  return (
    <div ref={wrapperRef} className="w-full h-[500px] bg-linen/50 rounded-3xl border border-forest/10 overflow-hidden relative">
        <div className="absolute top-4 left-6 z-10 pointer-events-none">
            <h3 className="font-serif text-2xl text-forest">Live Money Flow</h3>
            <p className="font-sans text-sm text-indigo/80">See how your cooperative's money moves.</p>
        </div>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};