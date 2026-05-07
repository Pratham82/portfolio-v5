"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionId =
  | "mental-model"
  | "primitives"
  | "instructions"
  | "skills"
  | "agents"
  | "orchestrators"
  | "tools"
  | "platforms"
  | "patterns";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "mental-model", label: "Mental Model" },
  { id: "primitives", label: "Primitives" },
  { id: "instructions", label: "Instructions" },
  { id: "skills", label: "Skills" },
  { id: "agents", label: "Agents" },
  { id: "orchestrators", label: "Orchestrators" },
  { id: "tools", label: "Tools" },
  { id: "platforms", label: "Platforms" },
  { id: "patterns", label: "Patterns" },
];

// ─── Shared Components ────────────────────────────────────────────────────────

const SectionTag = ({
  color,
  children,
}: {
  color: string;
  children: string;
}) => {
  return (
    <p
      className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-2 ${color}`}
    >
      {children}
    </p>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="font-bold text-3xl text-white mb-2 leading-tight">
      {children}
    </h2>
  );
};

const SectionDesc = ({ children }: { children: string }) => {
  return (
    <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
      {children}
    </p>
  );
};

const Callout = ({
  icon,
  borderColor,
  bgColor,
  children,
}: {
  icon: string;
  borderColor: string;
  bgColor: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex gap-3 p-4 rounded-lg border-l-4 my-5 text-sm leading-relaxed ${borderColor} ${bgColor}`}
    >
      <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
      <div className="text-zinc-300">{children}</div>
    </div>
  );
};

const ConceptCard = ({
  icon,
  label,
  labelColor,
  title,
  desc,
  code,
}: {
  icon?: string;
  label?: string;
  labelColor?: string;
  title: string;
  desc: string;
  code?: string;
}) => {
  return (
    <div className="bg-[#111118] border border-[#2a2a38] rounded-xl p-5 hover:border-[#35354a] hover:bg-[#18181f] transition-all cursor-default">
      {icon && (
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base mb-3 bg-[#1e1e28]">
          {icon}
        </div>
      )}
      {label && (
        <p
          className={`font-mono text-[10px] tracking-[0.15em] uppercase mb-1 ${labelColor || "text-zinc-400"}`}
        >
          {label}
        </p>
      )}
      <h3 className="text-white font-semibold text-base mb-1.5">{title}</h3>
      <p className="text-zinc-400 text-[13px] leading-relaxed">{desc}</p>
      {code && (
        <pre className="font-mono text-[11px] bg-[#0a0a0f] border border-[#2a2a38] rounded-md p-3 mt-3 text-teal-400 leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      )}
    </div>
  );
};

const FlowStep = ({
  dotColor,
  title,
  desc,
  last = false,
}: {
  dotColor: string;
  title: string;
  desc: string;
  last?: boolean;
}) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center gap-0 min-w-[24px]">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor} mt-1`} />
        {!last && <div className="w-0.5 h-9 bg-[#2a2a38] flex-shrink-0" />}
      </div>
      <div className={`flex-1 ${last ? "" : "pb-6"}`}>
        <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
        <p className="text-zinc-400 text-[13px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

const CodeBlock = ({ lang, code }: { lang: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="bg-[#0a0a0f] border border-[#2a2a38] rounded-xl overflow-hidden my-4">
      <div className="flex justify-between items-center px-4 py-2 border-b border-[#2a2a38] bg-[#111118]">
        <span className="font-mono text-[10px] text-[#5a5875] tracking-[0.1em]">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="text-[11px] text-[#5a5875] cursor-pointer px-2 py-0.5 rounded border border-[#2a2a38] bg-transparent hover:text-zinc-300 hover:border-[#35354a] transition-all"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
};

const CompareTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) => {
  return (
    <div className="w-full border border-[#2a2a38] rounded-xl overflow-hidden mb-7">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[#18181f]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-left font-mono text-[10px] tracking-[0.1em] uppercase text-zinc-400 font-normal border-b border-[#2a2a38]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[#2a2a38] last:border-b-0 hover:bg-[#111118] transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Badge = ({
  children,
  bg,
  text,
  border,
}: {
  children: React.ReactNode;
  bg: string;
  text: string;
  border: string;
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[10px] text-[11px] font-medium font-mono whitespace-nowrap ${bg} ${text} border ${border}`}
    >
      {children}
    </span>
  );
};

const LayerAccordion = ({
  num,
  name,
  nameColor,
  borderColor,
  bgColor,
  info,
  detail,
}: {
  num: string;
  name: string;
  nameColor: string;
  borderColor: string;
  bgColor: string;
  info: string;
  detail: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-2">
      <div
        onClick={() => setOpen(!open)}
        className={`rounded-xl border px-5 py-3.5 cursor-pointer transition-all flex items-center gap-3.5 ${borderColor} ${bgColor} hover:opacity-90`}
      >
        <span className="font-mono text-[11px] opacity-60 min-w-[18px]">
          {num}
        </span>
        <div className="flex-1">
          <div className={`font-semibold text-sm mb-0.5 ${nameColor}`}>
            {name}
          </div>
          <div className="text-xs opacity-70">{info}</div>
        </div>
        <span
          className={`text-base opacity-40 transition-all ${open ? "rotate-90 opacity-100" : ""}`}
        >
          ›
        </span>
      </div>
      {open && (
        <div className="bg-[#0a0a0f] border border-[#2a2a38] rounded-lg p-4 mt-2 text-[13px] text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
          {detail}
        </div>
      )}
    </div>
  );
};

// ─── Sections ─────────────────────────────────────────────────────────────────

const MentalModelSection = () => {
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-violet-400">01 · Foundation</SectionTag>
        <SectionTitle>The Mental Model</SectionTitle>
        <SectionDesc>
          Context engineering is the discipline of designing what information an
          AI model receives at every moment — shaping its &quot;working
          memory&quot; to produce reliable, useful outputs. It&apos;s the
          evolution beyond prompt engineering.
        </SectionDesc>
      </div>

      <Callout icon="💡" borderColor="border-violet-500" bgColor="bg-[#1e1340]">
        <strong className="text-white">Core insight:</strong> The model&apos;s
        output quality is entirely determined by the quality of its context.
        Everything else — instructions, skills, agents, tools — is
        infrastructure for delivering the right context at the right time.
      </Callout>

      <div className="h-5" />

      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        The Context Window is Everything
      </h3>
      <p className="text-zinc-400 text-[13px] mb-5">
        Every interaction is a composition of context layers. Understanding
        these layers is the foundation of all AI-native development.
      </p>

      <div className="mb-7">
        <LayerAccordion
          num="01"
          name="System Prompt / Instructions"
          nameColor="text-violet-400"
          borderColor="border-violet-500"
          bgColor="bg-[#1e1340]"
          info="Persistent personality, rules, constraints, capabilities"
          detail="The model's &quot;constitution&quot; — who it is, what it can do, how it should behave. In Cursor this is .cursorrules or the Rules panel. In Claude.ai it's the system prompt. In OpenCode it's AGENTS.md. This layer never changes mid-conversation."
        />
        <LayerAccordion
          num="02"
          name="Skills / Memory"
          nameColor="text-teal-400"
          borderColor="border-teal-500"
          bgColor="bg-[#0d1f1e]"
          info="Retrieved knowledge, docs, patterns injected on demand"
          detail="Dynamically fetched context — embeddings search, RAG, file reads, previous conversation summaries. These are loaded when relevant, not always present. Think of it as long-term memory being pulled into working memory."
        />
        <LayerAccordion
          num="03"
          name="Tool Results / Environment State"
          nameColor="text-blue-400"
          borderColor="border-blue-500"
          bgColor="bg-[#0d1a2e]"
          info="File contents, command outputs, search results, API responses"
          detail="The agent's sensory inputs — what it sees from the real world. Terminal output, file reads, web search results, test outputs. This is how agents ground themselves in current reality rather than hallucinating."
        />
        <LayerAccordion
          num="04"
          name="Conversation History"
          nameColor="text-amber-400"
          borderColor="border-amber-500"
          bgColor="bg-[#1f1500]"
          info="What has been said, tried, and decided so far"
          detail="The episodic memory of the current session — the sequence of messages, tool calls, and results that form the narrative of what's been done. For long-running agents, this needs compression strategies (summaries, scratchpads)."
        />
        <LayerAccordion
          num="05"
          name="Current User Turn"
          nameColor="text-orange-400"
          borderColor="border-orange-500"
          bgColor="bg-[#1f0e00]"
          info="The immediate task, question, or instruction"
          detail="The immediate input that triggered this inference cycle. Even a short user message benefits from all the surrounding context — a well-engineered context stack means even vague inputs produce excellent outputs."
        />
      </div>

      <Callout icon="🔑" borderColor="border-teal-500" bgColor="bg-[#0d1f1e]">
        <strong className="text-white">The discipline:</strong> Context
        engineering is knowing <em>what to put in</em>,{" "}
        <em>what to leave out</em>, and <em>when to fetch what</em> — so the
        model always has exactly what it needs, nothing more, nothing less.
      </Callout>
    </div>
  );
};

const PrimitivesSection = ({
  setSection,
}: {
  setSection: (id: SectionId) => void;
}) => {
  const concepts = [
    {
      icon: "📜",
      label: "Primitive 1",
      labelColor: "text-violet-400",
      bg: "bg-[#1e1340]",
      title: "Instructions",
      desc: 'Rules, personas, constraints, and behavioral guidelines that shape how the model acts. The "laws" of your AI system.',
    },
    {
      icon: "🔧",
      label: "Primitive 2",
      labelColor: "text-teal-400",
      bg: "bg-[#0d1f1e]",
      title: "Tools",
      desc: "Functions the model can call — file I/O, web search, code execution, API calls. Tools give the model hands to act on the world.",
    },
    {
      icon: "📚",
      label: "Primitive 3",
      labelColor: "text-amber-400",
      bg: "bg-[#1f1500]",
      title: "Memory / Skills",
      desc: "Retrieved context injected into the prompt — RAG, embeddings, cached docs, codebase summaries. External knowledge made accessible.",
    },
    {
      icon: "🤖",
      label: "Primitive 4",
      labelColor: "text-blue-400",
      bg: "bg-[#0d1a2e]",
      title: "Agents",
      desc: "A model in a loop — plan, act, observe, repeat. Agents use tools to accomplish multi-step tasks autonomously.",
    },
    {
      icon: "🎯",
      label: "Primitive 5",
      labelColor: "text-orange-400",
      bg: "bg-[#1f0e00]",
      title: "Orchestrators",
      desc: "Systems that coordinate multiple agents or models — routing tasks, managing state, synthesizing results from subagents.",
    },
    {
      icon: "💾",
      label: "Primitive 6",
      labelColor: "text-green-400",
      bg: "bg-[#0a1f0e]",
      title: "State / Context Store",
      desc: "Where information persists — files, databases, vector stores, conversation logs. The backbone of memory across agent runs.",
    },
  ];

  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-teal-400">02 · Core Concepts</SectionTag>
        <SectionTitle>The Primitives</SectionTitle>
        <SectionDesc>
          Five fundamental building blocks. Everything in AI-native development
          is a composition of these.
        </SectionDesc>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {concepts.map((c) => (
          <div
            key={c.title}
            className="bg-[#111118] border border-[#2a2a38] rounded-xl p-5 hover:border-[#35354a] hover:bg-[#18181f] transition-all cursor-default"
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-base mb-3 ${c.bg}`}
            >
              {c.icon}
            </div>
            <p
              className={`font-mono text-[10px] tracking-[0.15em] uppercase mb-1 ${c.labelColor}`}
            >
              {c.label}
            </p>
            <h3 className="text-white font-semibold text-base mb-1.5">
              {c.title}
            </h3>
            <p className="text-zinc-400 text-[13px] leading-relaxed">
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        How They Compose
      </h3>
      <div className="bg-[#111118] border border-[#2a2a38] rounded-2xl p-6 mb-7">
        <p className="font-mono text-[10px] text-[#5a5875] text-center mb-4 tracking-[0.1em]">
          ORCHESTRATION LAYER
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap mb-2">
          <button
            onClick={() => setSection("orchestrators")}
            className="text-center px-4 py-2.5 rounded-lg border border-orange-500 bg-[#1f0e00] text-orange-400 text-xs font-medium min-w-[100px] hover:-translate-y-0.5 transition-transform"
          >
            Orchestrator
          </button>
        </div>
        <div className="text-center text-[#5a5875] text-lg my-1">
          ↓ routes to
        </div>
        <p className="font-mono text-[10px] text-[#5a5875] text-center mb-4 tracking-[0.1em]">
          AGENT LAYER
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap mb-2">
          {["Agent A", "Agent B", "Agent C"].map((a) => (
            <button
              key={a}
              onClick={() => setSection("agents")}
              className="text-center px-4 py-2.5 rounded-lg border border-blue-500 bg-[#0d1a2e] text-blue-400 text-xs font-medium min-w-[100px] hover:-translate-y-0.5 transition-transform"
            >
              {a}
            </button>
          ))}
        </div>
        <div className="text-center text-[#5a5875] text-lg my-1">
          ↓ each uses
        </div>
        <p className="font-mono text-[10px] text-[#5a5875] text-center mb-4 tracking-[0.1em]">
          CAPABILITY LAYER
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap mb-2">
          {[
            {
              label: "Instructions",
              color: "text-violet-400",
              bg: "bg-[#1e1340]",
              border: "border-violet-500",
              id: "instructions" as SectionId,
            },
            {
              label: "Tools",
              color: "text-teal-400",
              bg: "bg-[#0d1f1e]",
              border: "border-teal-500",
              id: "tools" as SectionId,
            },
            {
              label: "Skills",
              color: "text-amber-400",
              bg: "bg-[#1f1500]",
              border: "border-amber-500",
              id: "skills" as SectionId,
            },
          ].map((n) => (
            <button
              key={n.label}
              onClick={() => setSection(n.id)}
              className={`text-center px-4 py-2.5 rounded-lg border ${n.border} ${n.bg} ${n.color} text-xs font-medium min-w-[100px] hover:-translate-y-0.5 transition-transform`}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="text-center text-[#5a5875] text-lg my-1">
          ↓ reads/writes
        </div>
        <p className="font-mono text-[10px] text-[#5a5875] text-center mb-4 tracking-[0.1em]">
          PERSISTENCE LAYER
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap">
          {["Files", "Vector DB", "Memory"].map((n) => (
            <div
              key={n}
              className="text-center px-4 py-2.5 rounded-lg border border-green-500 bg-[#0a1f0e] text-green-400 text-xs font-medium min-w-[100px]"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InstructionsSection = () => {
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-violet-400">
          03 · Primitive Deep Dive
        </SectionTag>
        <SectionTitle>Instructions</SectionTitle>
        <SectionDesc>
          The rulebook for your AI system. Instructions define identity,
          behavior, constraints, and capabilities. They live in the system
          prompt and persist across the entire interaction.
        </SectionDesc>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <ConceptCard
          label="Cursor"
          labelColor="text-violet-400"
          title=".cursorrules"
          desc="A file in your repo root. Cursor injects it into every AI request. Defines code style, architecture decisions, forbidden patterns."
          code={`You are a senior TypeScript engineer.
Always use strict mode.
Prefer functional patterns.
Never use \`any\` type.
Use Zod for validation.`}
        />
        <ConceptCard
          label="OpenCode"
          labelColor="text-teal-400"
          title="AGENTS.md"
          desc="Markdown file committed to the repo. Discovered and injected automatically. Also supports per-directory overrides for monorepos."
          code={`# Agent Instructions
## Environment
- Node 20, pnpm
- Run tests: pnpm test

## Conventions
- All components in /src/ui
- Use server components by default`}
        />
        <ConceptCard
          label="Claude / API"
          labelColor="text-amber-400"
          title="System Prompt"
          desc="Passed as the system parameter in every API call. Can be dynamic — built programmatically based on user, repo, or session context."
          code={`system: \`You are a coding assistant
for \${project.name}.
Stack: \${project.stack}
Rules: \${rules.join(', ')}\``}
        />
      </div>

      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        Anatomy of Good Instructions
      </h3>

      <div className="mb-6">
        <FlowStep
          dotColor="bg-violet-400"
          title="Identity & Role"
          desc='Who the model is. Sets the persona and capability frame. "You are a senior backend engineer specializing in distributed systems."'
        />
        <FlowStep
          dotColor="bg-teal-400"
          title="Context & Environment"
          desc="Project-specific facts: tech stack, file structure, coding conventions, team preferences. Dynamic injection from repo metadata."
        />
        <FlowStep
          dotColor="bg-amber-400"
          title="Behavioral Rules"
          desc='Dos and don&apos;ts. "Always write tests. Never use global state. Prefer composition over inheritance. Explain tradeoffs before implementing."'
        />
        <FlowStep
          dotColor="bg-blue-400"
          title="Output Format"
          desc='How to structure responses. "Use markdown code blocks. Include type annotations. Add a brief explanation before each code change."'
        />
        <FlowStep
          dotColor="bg-orange-400"
          title="Tool Usage Hints"
          desc='When to use which tools. "Run tests after each change. Read the file before editing. Check imports before adding new dependencies."'
          last
        />
      </div>

      <Callout icon="⚠️" borderColor="border-amber-500" bgColor="bg-[#1f1500]">
        <strong className="text-white">Anti-pattern:</strong> Generic
        instructions. &quot;Be helpful and accurate&quot; wastes tokens and
        provides no signal. Instructions should encode project-specific
        knowledge that the model couldn&apos;t otherwise know.
      </Callout>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-amber-400">04 · Memory Systems</SectionTag>
        <SectionTitle>Skills & Memory</SectionTitle>
        <SectionDesc>
          Skills are retrieved context — documentation, patterns, codebase
          knowledge, past decisions — dynamically injected when relevant. The
          bridge between static instructions and dynamic reality.
        </SectionDesc>
      </div>

      <Callout icon="💡" borderColor="border-amber-500" bgColor="bg-[#1f1500]">
        <strong className="text-white">Key distinction:</strong> Instructions
        are always present. Skills are fetched on demand. A skill for
        &quot;React patterns&quot; only enters context when React is relevant —
        preserving the context window budget.
      </Callout>

      <div className="h-5" />
      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        Four Types of Memory
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ConceptCard
          icon="⚡"
          label="In-Context"
          labelColor="text-violet-400"
          title="Working Memory"
          desc="Everything currently in the context window. Fast but ephemeral — gone when the conversation ends. Limited by the context window size."
        />
        <ConceptCard
          icon="💾"
          label="External"
          labelColor="text-teal-400"
          title="Long-Term Storage"
          desc="Files, databases, vector stores. The model reads from and writes to these via tools. Persists across sessions and agent runs."
        />
        <ConceptCard
          icon="🔍"
          label="Semantic"
          labelColor="text-amber-400"
          title="Vector / RAG"
          desc="Embeddings search over large knowledge bases. Relevant chunks retrieved by semantic similarity and injected into context. Powers codebase-aware chat."
        />
        <ConceptCard
          icon="📝"
          label="Episodic"
          labelColor="text-blue-400"
          title="Session History"
          desc='Compressed summaries of past interactions. Lets agents "remember" across sessions without blowing the context window with full history.'
        />
      </div>

      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        Skills in Cursor, Claude, OpenCode
      </h3>

      <CompareTable
        headers={["Platform", "Skill Mechanism", "How It Works"]}
        rows={[
          [
            <Badge
              key="cursor"
              bg="bg-[#0d1f1e]"
              text="text-teal-400"
              border="border-teal-500"
            >
              Cursor
            </Badge>,
            "@ mentions + Codebase Index",
            <span key="c1" className="text-zinc-400 text-[12px]">
              Embeds your entire codebase.{" "}
              <code className="text-zinc-300">@codebase</code> triggers semantic
              search. <code className="text-zinc-300">@file</code>,{" "}
              <code className="text-zinc-300">@folder</code> inject specific
              context. Notepads act as reusable skill snippets.
            </span>,
          ],
          [
            <Badge
              key="claude"
              bg="bg-[#1e1340]"
              text="text-violet-400"
              border="border-violet-500"
            >
              Claude
            </Badge>,
            "Projects + Documents",
            <span key="c2" className="text-zinc-400 text-[12px]">
              Project knowledge stored in a knowledge base. MCP servers extend
              memory. Claude.ai&apos;s memory feature compresses and retrieves
              past conversation insights.
            </span>,
          ],
          [
            <Badge
              key="opencode"
              bg="bg-[#1f1500]"
              text="text-amber-400"
              border="border-amber-500"
            >
              OpenCode
            </Badge>,
            "File reads + Custom RAG",
            <span key="c3" className="text-zinc-400 text-[12px]">
              Agent explicitly reads files via tools. Can be paired with custom
              embeddings pipelines. AGENTS.md encodes static skill-like
              documentation.
            </span>,
          ],
          [
            <Badge
              key="api"
              bg="bg-[#0d1a2e]"
              text="text-blue-400"
              border="border-blue-500"
            >
              API
            </Badge>,
            "Programmatic injection",
            <span key="c4" className="text-zinc-400 text-[12px]">
              You control what goes in. Retrieve from any vector store, format
              as context blocks, inject into system or user turns. Full control,
              full responsibility.
            </span>,
          ],
        ]}
      />

      <CodeBlock
        lang="SKILL STRUCTURE — AGENTS.md / .cursorrules"
        code={`# Skill: React Component Patterns
## When to use this skill
When creating or editing React components in /src/components

## Patterns to follow
- Server Components by default, Client Components only when needed
- Use shadcn/ui as the component library
- Co-locate styles with components using CSS Modules

## Anti-patterns to avoid
- No class components
- No prop drilling more than 2 levels
- No direct DOM manipulation`}
      />
    </div>
  );
};

const AgentsSection = () => {
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-blue-400">05 · Autonomous Systems</SectionTag>
        <SectionTitle>Agents</SectionTitle>
        <SectionDesc>
          An agent is a model in an action loop — it plans, acts with tools,
          observes results, and continues until the task is complete. The
          transition from &quot;assistant&quot; to &quot;agent&quot; is the
          loop.
        </SectionDesc>
      </div>

      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        The Agent Loop
      </h3>
      <div className="mb-6">
        <FlowStep
          dotColor="bg-blue-400"
          title="1. Perceive"
          desc="Receive the task. Gather context — read files, check environment state, retrieve relevant memory/skills into context."
        />
        <FlowStep
          dotColor="bg-violet-400"
          title="2. Think / Plan"
          desc='Reason about the task. Decompose into steps. Decide which tools to use and in what order. This is "chain-of-thought" happening inside a tool call.'
        />
        <FlowStep
          dotColor="bg-teal-400"
          title="3. Act"
          desc="Execute tool calls — write files, run commands, search the web, call APIs. Each action changes the state of the world."
        />
        <FlowStep
          dotColor="bg-amber-400"
          title="4. Observe"
          desc="Tool results return into context. Read terminal output, file contents, error messages. Ground the next step in current reality."
        />
        <FlowStep
          dotColor="bg-orange-400"
          title="5. Repeat or Conclude"
          desc="If done, surface the result to the user or orchestrator. If not, loop back to Think with updated context. Agents stop when the task is complete or they hit a decision point needing human input."
          last
        />
      </div>

      <Callout icon="🔑" borderColor="border-blue-500" bgColor="bg-[#0d1a2e]">
        <strong className="text-white">The key lever:</strong> What tools an
        agent has determines what it can accomplish. An agent with read-only
        tools is a reader. Add write tools and it becomes an editor. Add shell
        execution and it becomes a developer. Tools define agency.
      </Callout>

      <div className="h-5" />
      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        Agent Types in Practice
      </h3>

      <CompareTable
        headers={["Agent Type", "Tools", "Platforms", "Use Case"]}
        rows={[
          [
            <Badge
              key="coding"
              bg="bg-[#0d1f1e]"
              text="text-teal-400"
              border="border-teal-500"
            >
              Coding Agent
            </Badge>,
            <span key="t1" className="text-zinc-400 text-[12px]">
              read_file, write_file, run_shell, search_codebase
            </span>,
            <span key="p1" className="text-zinc-400">
              Cursor, Claude Code, OpenCode
            </span>,
            <span key="u1" className="text-zinc-400">
              Write features, fix bugs, refactor codebases
            </span>,
          ],
          [
            <Badge
              key="research"
              bg="bg-[#1e1340]"
              text="text-violet-400"
              border="border-violet-500"
            >
              Research Agent
            </Badge>,
            <span key="t2" className="text-zinc-400 text-[12px]">
              web_search, read_url, summarize, save_note
            </span>,
            <span key="p2" className="text-zinc-400">
              Claude, custom pipelines
            </span>,
            <span key="u2" className="text-zinc-400">
              Deep research, synthesis, fact-checking
            </span>,
          ],
          [
            <Badge
              key="workflow"
              bg="bg-[#1f1500]"
              text="text-amber-400"
              border="border-amber-500"
            >
              Workflow Agent
            </Badge>,
            <span key="t3" className="text-zinc-400 text-[12px]">
              email, calendar, database, API calls
            </span>,
            <span key="p3" className="text-zinc-400">
              Claude + MCP, n8n, Zapier AI
            </span>,
            <span key="u3" className="text-zinc-400">
              Automate business processes end-to-end
            </span>,
          ],
          [
            <Badge
              key="eval"
              bg="bg-[#1f0e00]"
              text="text-orange-400"
              border="border-orange-500"
            >
              Evaluator Agent
            </Badge>,
            <span key="t4" className="text-zinc-400 text-[12px]">
              run_tests, lint, read_pr, comment
            </span>,
            <span key="p4" className="text-zinc-400">
              CI/CD integrations, GitHub Actions
            </span>,
            <span key="u4" className="text-zinc-400">
              Code review, quality gates, test generation
            </span>,
          ],
        ]}
      />
    </div>
  );
};

const OrchestratorsSection = () => {
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-orange-400">
          06 · Multi-Agent Systems
        </SectionTag>
        <SectionTitle>Orchestrators</SectionTitle>
        <SectionDesc>
          An orchestrator coordinates multiple agents or models — routing
          subtasks, managing inter-agent communication, and synthesizing
          results. It&apos;s the conductor in a multi-agent orchestra.
        </SectionDesc>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <ConceptCard
          icon="🎯"
          label="Pattern 1"
          labelColor="text-orange-400"
          title="Router"
          desc="Classifies the incoming task and routes to the best-suited agent or model. Simple orchestration — one task, one agent."
        />
        <ConceptCard
          icon="🔀"
          label="Pattern 2"
          labelColor="text-violet-400"
          title="Parallelizer"
          desc="Fans out a task into parallel subtasks across multiple agents. Aggregates results. Faster than sequential, needs result synthesis logic."
        />
        <ConceptCard
          icon="🔗"
          label="Pattern 3"
          labelColor="text-teal-400"
          title="Pipeline"
          desc="Sequential chain — each agent processes the output of the previous. Good for multi-stage transformations (research → write → review → format)."
        />
        <ConceptCard
          icon="🌳"
          label="Pattern 4"
          labelColor="text-amber-400"
          title="Hierarchical"
          desc="Boss/worker structure. Orchestrator agent spawns subagents with specific instructions, collects results, makes decisions, spawns more agents. Recursive delegation."
        />
        <ConceptCard
          icon="✅"
          label="Pattern 5"
          labelColor="text-blue-400"
          title="Evaluator-Optimizer"
          desc="Generator agent produces output; evaluator agent scores it; optimizer agent improves based on feedback. Loops until quality threshold met."
        />
        <ConceptCard
          icon="👤"
          label="Pattern 6"
          labelColor="text-green-400"
          title="Human-in-the-Loop"
          desc="Orchestrator pauses at defined checkpoints and surfaces decisions to humans. Resumes with human approval. Critical for high-stakes workflows."
        />
      </div>

      <h3 className="text-white font-semibold text-[15px] mb-3.5">
        Claude Subagents in Practice
      </h3>
      <CodeBlock
        lang="ORCHESTRATOR PATTERN — Claude Tool Use"
        code={`// Orchestrator instructs Claude to spin up subagents
const orchestrator = {
  system: \`You coordinate a team of specialists.
  For any task, break it into subtasks and 
  delegate to the appropriate agent.
  Agents available: researcher, coder, reviewer\`,
  tools: [
    delegate_to_researcher,   // spawns researcher subagent
    delegate_to_coder,        // spawns coder subagent
    delegate_to_reviewer,     // spawns reviewer subagent
    synthesize_results        // combines outputs
  ]
}

// Each subagent has its own system prompt + tools
const researcher = {
  system: \`You are a research specialist.
  Search the web, read documentation,
  and return structured findings.\`,
  tools: [web_search, read_url, save_note]
}`}
      />

      <Callout icon="⚠️" borderColor="border-orange-500" bgColor="bg-[#1f0e00]">
        <strong className="text-white">Orchestration cost:</strong> Every agent
        call costs tokens and latency. Only orchestrate when the task genuinely
        benefits from specialization or parallelism. A single well-prompted
        agent often beats a complex multi-agent setup.
      </Callout>
    </div>
  );
};

const ToolsSection = () => {
  const cats = [
    {
      lc: "text-teal-400",
      l: "Read",
      t: "Observation Tools",
      d: "read_file, list_dir, run_command (readonly), web_search, get_url, query_database. These ground the model in reality.",
    },
    {
      lc: "text-amber-400",
      l: "Write",
      t: "Action Tools",
      d: "write_file, create_file, run_shell, send_email, post_api. These change the world — require careful guardrails.",
    },
    {
      lc: "text-blue-400",
      l: "Delegate",
      t: "Subagent Tools",
      d: "spawn_agent, call_model, use_specialist. These allow orchestrators to delegate work to other AI models or agents.",
    },
    {
      lc: "text-violet-400",
      l: "Persist",
      t: "Memory Tools",
      d: "save_memory, search_knowledge, update_state. These bridge the gap between context window (ephemeral) and long-term storage.",
    },
  ];
  const steps = [
    {
      dot: "bg-violet-400",
      t: "MCP Client (Cursor, Claude, OpenCode)",
      d: "The AI application that discovers available tools and makes calls. Sends tool call requests over JSON-RPC to MCP servers.",
    },
    {
      dot: "bg-teal-400",
      t: "MCP Server (your tool)",
      d: "Exposes tools, resources, and prompts. Can run locally (stdio) or remotely (HTTP+SSE). Handles the actual execution logic.",
    },
    {
      dot: "bg-amber-400",
      t: "External Service / Data",
      d: "GitHub, Postgres, Slack, your custom API — whatever the MCP server wraps. The AI never talks to these directly; MCP is the adapter.",
    },
  ];
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-teal-400">07 · Capabilities</SectionTag>
        <SectionTitle>Tools & MCP</SectionTitle>
        <SectionDesc>
          Tools are the hands of an AI agent. They define the boundary between
          what the model can think about and what it can actually do. MCP (Model
          Context Protocol) is the universal standard for connecting models to
          tools.
        </SectionDesc>
      </div>
      <h3 className="text-white font-semibold text-base mb-4">
        Tool Categories
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
        {cats.map((c) => (
          <div
            key={c.t}
            className="bg-[#111118] border border-[#2a2a38] rounded-xl p-5 hover:border-[#35354a] transition-all"
          >
            <p
              className={`font-mono text-[10px] tracking-widest uppercase mb-1 ${c.lc}`}
            >
              {c.l}
            </p>
            <h3 className="text-white font-semibold text-base mb-1.5">{c.t}</h3>
            <p className="text-zinc-400 text-[13px] leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
      <h3 className="text-white font-semibold text-base mb-2">
        MCP — Model Context Protocol
      </h3>
      <p className="text-zinc-400 text-sm mb-5">
        MCP is Anthropic&apos;s open standard for connecting AI models to
        external tools and data sources. It&apos;s a USB-C port for AI — write
        one MCP server, use it in any compatible client.
      </p>
      <div className="mb-6">
        {steps.map((s, i) => (
          <FlowStep
            key={i}
            dotColor={s.dot}
            title={s.t}
            desc={s.d}
            last={i === steps.length - 1}
          />
        ))}
      </div>
      <CodeBlock
        lang="MCP SERVER — Minimal Example"
        code={`import { McpServer } from "@modelcontextprotocol/sdk/server"

const server = new McpServer({ name: "my-tools", version: "1.0" })

server.tool("query_db", "Run a read-only SQL query", {
  sql: z.string().describe("The SQL query to run")
}, async ({ sql }) => {
  const result = await db.query(sql)
  return { content: [{ type: "text", text: JSON.stringify(result) }] }
})

// Register in .cursor/mcp.json or claude_desktop_config.json`}
      />
    </div>
  );
};

const PlatformsSection = () => {
  const tips = [
    {
      icon: "🖥️",
      t: "Use Cursor when...",
      d: "You're actively coding, need inline suggestions, want to refactor across many files interactively, or work in a GUI-heavy project.",
    },
    {
      icon: "🧠",
      t: "Use Claude API when...",
      d: "You're building AI-native products, need custom orchestration, want full control over prompts and context, or need multi-modal capabilities.",
    },
    {
      icon: "⚡",
      t: "Use OpenCode when...",
      d: "You want a headless coding agent, are automating tasks in CI/CD, prefer terminal workflows, or want to script complex multi-step coding tasks.",
    },
    {
      icon: "🔗",
      t: "Combine all three when...",
      d: "Use Claude API as orchestrator, OpenCode for automated coding tasks, Cursor for interactive review. The same AGENTS.md works across all three.",
    },
  ];
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-green-400">08 · Platform Guide</SectionTag>
        <SectionTitle>Cursor vs Claude vs OpenCode</SectionTitle>
        <SectionDesc>
          Same underlying concepts, different interfaces and ergonomics.
          Understanding what each platform optimizes for helps you choose the
          right tool and transfer knowledge across them.
        </SectionDesc>
      </div>
      <CompareTable
        headers={[
          "Dimension",
          "Cursor",
          "Claude (claude.ai / API)",
          "OpenCode",
        ]}
        rows={[
          [
            <span key="d1" className="font-medium text-white">
              Primary Interface
            </span>,
            <span key="c1" className="text-zinc-400">
              IDE (VS Code fork)
            </span>,
            <span key="cl1" className="text-zinc-400">
              Web chat / API
            </span>,
            <span key="o1" className="text-zinc-400">
              Terminal CLI
            </span>,
          ],
          [
            <span key="d2" className="font-medium text-white">
              Instructions File
            </span>,
            <span key="c2" className="text-zinc-400">
              <code className="text-zinc-300">.cursorrules</code> or Rules panel
            </span>,
            <span key="cl2" className="text-zinc-400">
              System prompt, Project knowledge
            </span>,
            <span key="o2" className="text-zinc-400">
              <code className="text-zinc-300">AGENTS.md</code>
            </span>,
          ],
          [
            <span key="d3" className="font-medium text-white">
              Context Mechanism
            </span>,
            <span key="c3" className="text-zinc-400">
              Codebase index + @ mentions
            </span>,
            <span key="cl3" className="text-zinc-400">
              Projects, Documents, MCP
            </span>,
            <span key="o3" className="text-zinc-400">
              Explicit file reads via tools
            </span>,
          ],
          [
            <span key="d4" className="font-medium text-white">
              Agent Mode
            </span>,
            <span key="c4" className="text-zinc-400">
              Composer Agent mode
            </span>,
            <span key="cl4" className="text-zinc-400">
              Claude Code, API tool use
            </span>,
            <span key="o4" className="text-zinc-400">
              Default operation mode
            </span>,
          ],
          [
            <span key="d5" className="font-medium text-white">
              Tool Integration
            </span>,
            <span key="c5" className="text-zinc-400">
              MCP + built-in IDE tools
            </span>,
            <span key="cl5" className="text-zinc-400">
              MCP (extensive ecosystem)
            </span>,
            <span key="o5" className="text-zinc-400">
              Shell execution + custom tools
            </span>,
          ],
          [
            <span key="d6" className="font-medium text-white">
              Best For
            </span>,
            <span key="c6" className="text-zinc-400">
              Interactive coding, inline edits, UI work
            </span>,
            <span key="cl6" className="text-zinc-400">
              Complex reasoning, multi-modal, research
            </span>,
            <span key="o6" className="text-zinc-400">
              Automated tasks, CI/CD, headless agents
            </span>,
          ],
          [
            <span key="d7" className="font-medium text-white">
              Context Window
            </span>,
            <span key="c7" className="text-zinc-400">
              200k (Claude), managed automatically
            </span>,
            <span key="cl7" className="text-zinc-400">
              200k (Sonnet/Opus), 1M (Gemini models)
            </span>,
            <span key="o7" className="text-zinc-400">
              Model-dependent, user-managed
            </span>,
          ],
          [
            <span key="d8" className="font-medium text-white">
              Orchestration
            </span>,
            <span key="c8" className="text-zinc-400">
              Single agent per session
            </span>,
            <span key="cl8" className="text-zinc-400">
              Multi-agent via tool use + MCP
            </span>,
            <span key="o8" className="text-zinc-400">
              Script-level orchestration
            </span>,
          ],
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((t) => (
          <div
            key={t.t}
            className="bg-[#111118] border border-[#2a2a38] rounded-xl p-4 hover:border-[#35354a] transition-all"
          >
            <div className="text-xl mb-2">{t.icon}</div>
            <h4 className="text-white font-semibold text-sm mb-1">{t.t}</h4>
            <p className="text-zinc-400 text-[13px] leading-relaxed">{t.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PatternsSection = () => {
  const dos = [
    {
      t: "Minimal Sufficient Context",
      d: "Put only what's needed in context. Extra context dilutes attention and wastes tokens. Every word in the prompt competes for the model's focus.",
    },
    {
      t: "Concrete over Abstract",
      d: 'Examples beat descriptions. "Use Zod for validation — see /src/schemas for examples" beats "use proper validation." Show, don\'t tell.',
    },
    {
      t: "Structured Output",
      d: "Request JSON or XML for machine-readable outputs. Prose is for humans; structured data is for pipelines. Define the schema explicitly.",
    },
    {
      t: "Observe Before Acting",
      d: "Agents should read files before editing them, check test output before committing, verify state before taking irreversible actions.",
    },
  ];
  const donts = [
    {
      t: 'The "Helpful AI" Trap',
      d: "Generic system prompts waste the instruction slot. Instructions should encode domain-specific knowledge the model couldn't otherwise have.",
    },
    {
      t: "Context Stuffing",
      d: "Dumping entire codebases into context. Use semantic retrieval to find only relevant files. Needle-in-a-haystack problems degrade quality.",
    },
    {
      t: "Premature Orchestration",
      d: "Building multi-agent systems before validating a single agent works. Start with one agent, measure, then add orchestration only where needed.",
    },
    {
      t: "Unbounded Loops",
      d: "Agents without max-step limits can loop indefinitely on failure. Always implement retry limits, timeout budgets, and escalation to humans.",
    },
  ];
  const steps = [
    {
      dot: "bg-violet-400",
      t: "Write AGENTS.md / .cursorrules first",
      d: "Before any AI coding session. Include stack, conventions, test commands, file structure. This is your most leveraged investment.",
    },
    {
      dot: "bg-teal-400",
      t: "Define tool boundaries clearly",
      d: "Document what each tool does, its input/output schema, and failure modes. Agents make better decisions when tools have precise descriptions.",
    },
    {
      dot: "bg-amber-400",
      t: "Build checkpoints for humans",
      d: "Any action that deletes data, sends messages, or makes external API calls should require explicit human confirmation before execution.",
    },
    {
      dot: "bg-blue-400",
      t: "Log everything",
      d: "Every tool call, every model response, every decision point. Debugging agents without logs is impossible. Structured logs enable offline evaluation.",
    },
    {
      dot: "bg-green-400",
      t: "Evaluate with real tasks",
      d: "Build an eval set of 10-20 representative tasks. Run them before and after instruction changes. Context engineering is software engineering — it needs tests.",
    },
  ];
  return (
    <div>
      <div className="mb-7">
        <SectionTag color="text-pink-400">09 · Best Practices</SectionTag>
        <SectionTitle>Patterns & Anti-Patterns</SectionTitle>
        <SectionDesc>
          Hard-won lessons from building production AI-native systems. What
          works, what breaks, and what to do instead.
        </SectionDesc>
      </div>
      <h3 className="text-white font-semibold text-base mb-4">
        Core Principles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
        {dos.map((d) => (
          <div
            key={d.t}
            className="bg-[#111118] border border-[#2a2a38] rounded-xl p-4 hover:border-[#35354a] transition-all"
          >
            <div className="text-green-400 text-lg mb-2">✅</div>
            <h4 className="text-white font-semibold text-sm mb-1">{d.t}</h4>
            <p className="text-zinc-400 text-[13px] leading-relaxed">{d.d}</p>
          </div>
        ))}
        {donts.map((d) => (
          <div
            key={d.t}
            className="bg-[#111118] border border-[#2a2a38] rounded-xl p-4 hover:border-[#35354a] transition-all"
          >
            <div className="text-red-400 text-lg mb-2">❌</div>
            <h4 className="text-white font-semibold text-sm mb-1">{d.t}</h4>
            <p className="text-zinc-400 text-[13px] leading-relaxed">{d.d}</p>
          </div>
        ))}
      </div>
      <h3 className="text-white font-semibold text-base mb-4">
        The Universal Checklist
      </h3>
      <div className="mb-6">
        {steps.map((s, i) => (
          <FlowStep
            key={i}
            dotColor={s.dot}
            title={s.t}
            desc={s.d}
            last={i === steps.length - 1}
          />
        ))}
      </div>
      <Callout icon="🚀" borderColor="border-pink-500" bgColor="bg-[#1f0a18]">
        <strong className="text-white">The meta-pattern:</strong> Context
        engineering is a product discipline, not a prompt trick. The best
        practitioners treat the system prompt like production code — version
        controlled, tested, iterated. Your instructions are as important as your
        application code.
      </Callout>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ContextEngineeringGuide = () => {
  const [section, setSection] = useState<SectionId>("mental-model");

  const renderSection = () => {
    switch (section) {
      case "mental-model":
        return <MentalModelSection />;
      case "primitives":
        return <PrimitivesSection setSection={setSection} />;
      case "instructions":
        return <InstructionsSection />;
      case "skills":
        return <SkillsSection />;
      case "agents":
        return <AgentsSection />;
      case "orchestrators":
        return <OrchestratorsSection />;
      case "tools":
        return <ToolsSection />;
      case "platforms":
        return <PlatformsSection />;
      case "patterns":
        return <PatternsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e6f0]">
      {/* Hero */}
      <div className="border-b border-[#2a2a38] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_#1a0f3a_0%,_transparent_70%)]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12 text-center">
          <p className="font-mono text-[11px] text-violet-400 tracking-[0.2em] uppercase mb-3">
            The Universal Reference
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3 bg-gradient-to-br from-white via-violet-300 to-teal-300 bg-clip-text text-transparent">
            Context Engineering
            <br />& AI-Native Coding
          </h1>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            A structured guide to instructions, skills, agents, orchestrators,
            and the full mental model behind building with Cursor, Claude, and
            OpenCode.
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#111118]/95 backdrop-blur border-b border-[#2a2a38]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2 flex-wrap">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`font-mono text-[11px] tracking-[0.05em] px-3 py-1.5 rounded-full border transition-all ${
                section === item.id
                  ? "bg-[#1e1340] border-violet-500 text-violet-300"
                  : "border-[#2a2a38] text-zinc-400 hover:border-[#35354a] hover:text-zinc-200 hover:bg-[#18181f]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
        <div
          key={section}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {renderSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a38] mt-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-mono text-[11px] text-[#5a5875] tracking-widest uppercase">
            Context Engineering Guide
          </p>
          <div className="flex gap-3">
            {NAV_ITEMS.slice(0, 4).map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className="font-mono text-[10px] text-[#5a5875] hover:text-zinc-400 transition-colors tracking-widest uppercase"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContextEngineeringGuide;
