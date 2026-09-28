"use client";

import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum UsesTab {
  HARDWARE = "Hardware",
  SOFTWARE = "Software",
}

const HardwareSection = () => (
  <div className="flex flex-col gap-12">
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-medium text-foreground">
        🖥️ Computers
      </h2>
      <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
        <li>Mac Mini M4</li>
        <li>MacBook Air M4 </li>
        <li>MacBook M4 Pro (Work Laptop)</li>
      </ul>
    </section>

    <section>
      <h2 className="mb-3 flex items-center gap-2 font-medium text-foreground">
        🖥️ Display & Desk Setup
      </h2>
      <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
        <li>LG Ultrawide Ultragear 34″ Monitor 34Gp63A</li>
        <li>Monitor Arm</li>
      </ul>
    </section>

    <section>
      <h2 className="mb-3 flex items-center gap-2 font-medium text-foreground">
        ⌨️ Keyboards
      </h2>
      <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
        <li>Keychron K3 Pro (RGB, Hot-swappable)</li>
        <li>Royal Kludge 61</li>
        <li>Apple Magic Keyboard</li>
      </ul>
    </section>

    <section>
      <h2 className="mb-3 flex items-center gap-2 font-medium text-foreground">
        🎧 Audio Gear
      </h2>
      <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
        <li>Apple AirPods Pro (2nd Gen)</li>
        <li>Nothing Ear (a)</li>
        <li>Sony WH-1000XM4</li>
        <li>Sony WF-1000XM4</li>
        <li>
          IEMs
          <ul className="ml-10 mt-2 list-disc space-y-1">
            <li>SIMGOT EW300</li>
            <li>Moondrop Chu 2</li>
          </ul>
        </li>
        <li>
          DACs / DAPs
          <ul className="ml-10 mt-2 list-disc space-y-1">
            <li>FiiO KA13 DAC</li>
            <li>HiBy R1 DAP</li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
);

const SoftwareSection = () => (
  <div className="flex flex-col gap-12">
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-medium text-foreground">
        🚀 Prathamesh&apos;s Dev Stack
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            🧠 Core Development Environment
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>Visual Studio Code</li>
            <li>Cursor</li>
            <li>Neovim</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            🖥️ Terminal & CLI Workflow
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>Ghostty</li>
            <li>tmux</li>
            <li>lazygit</li>
            <li>gh</li>
            <li>nvm</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            🌐 Frontend & JavaScript
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>Node.js (npm, corepack)</li>
            <li>Deno</li>
            <li>nodemon</li>
            <li>React / Next.js</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            🤖 AI-Assisted Development
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>
              OpenCode <span>⭐</span> (primary AI coding interface)
            </li>
            <li>GitHub Copilot CLI</li>
            <li>Claude Code</li>
            <li>OpenAI Codex CLI</li>
            <li>Ollama</li>
            <li>ChatGPT / Claude</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            📱 Mobile Development
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>Android Studio</li>
            <li>Android Platform Tools</li>
            <li>scrcpy</li>
            <li>CocoaPods</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            🐳 Dev Environment & Infra
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>OrbStack</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            🗄️ API & Database Tools
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>Postman</li>
            <li>DBeaver</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h2 className="mb-3 flex items-center gap-2 font-medium text-foreground">
        ⚡ Productivity & Workflow
      </h2>
      <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/50">
        <li>Obsidian — knowledge base / second brain</li>
        <li>Syncthing — sync Obsidian vaults across devices</li>
        <li>Stretchly — prevents burnout</li>
        <li>Lunar — brightness via keyboard</li>
        <li>AeroSpace — keyboard-driven window management</li>
        <li>Hidden Bar — declutter menu bar</li>
        <li>AltTab — better Cmd+Tab</li>
        <li>Raycast — commands, scripts, search</li>
        <li>Maccy — clipboard management</li>
      </ul>
    </section>
  </div>
);

const UsesPage = () => (
  <PageAnimationContainer>
    <PageTitle className="mb-2">Uses</PageTitle>
    <p className="mb-6 text-sm text-muted-foreground">
      A comprehensive list of all the tech products I use daily, from computers
      and audio gear to development tools.
    </p>

    <Tabs defaultValue={UsesTab.HARDWARE}>
      <TabsList className="mb-6">
        <TabsTrigger value={UsesTab.HARDWARE}>Hardware</TabsTrigger>
        <TabsTrigger value={UsesTab.SOFTWARE}>Software</TabsTrigger>
      </TabsList>
      <TabsContent value={UsesTab.HARDWARE}>
        <HardwareSection />
      </TabsContent>
      <TabsContent value={UsesTab.SOFTWARE}>
        <SoftwareSection />
      </TabsContent>
    </Tabs>
  </PageAnimationContainer>
);

export default UsesPage;
