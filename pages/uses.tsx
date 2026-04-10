import { useState } from "react";

import PageAnimationContainer from "../components/PageAnimationContainer";
import PageTitle from "../components/PageTitle";

enum UsesTab {
  HARDWARE = "Hardware",
  SOFTWARE = "Software",
}

const HardwareSection = () => (
  <div className="flex flex-col gap-12">
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🖥️ Computers
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Mac Mini M4</li>
        <li>MacBook Air M4 (512 GB)</li>
        <li>MacBook Air M2 (Base Model)</li>
        <li>MacBook M4 Pro (Work Laptop)</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📱 Mobile & Tablets
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>iPhone 15 Pro</li>
        <li>Nothing Phone (2a)</li>
        <li>Nothing phone 3</li>
        <li>iPad Mini 6</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🎧 Audio Gear
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Apple AirPods Pro (1st Gen)</li>
        <li>Nothing Ear (a)</li>
        <li>Sony WH-1000XM4</li>
        <li>Sony WF-1000XM4</li>
        <li>Sony ULT Field Speaker</li>
        <li>SIMGOT EW300 IEMs</li>
        <li>Moondrop Chu 2 IEMs</li>
        <li>FiiO KA13 DAC</li>
        <li>HiBy R1 DAP</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🖥️ Display & Desk Setup
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>LG Ultrawide Ultragear 34″ Monitor 34Gp63A</li>
        <li>Monitor Arm</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        ⌨️ Accessories
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Keychron K3 Pro (RGB, Hot-swappable)</li>
        <li>Apple Magic Keyboard</li>
        <li>Apple Magic Trackpad</li>
        <li>Logitech MX Master 2 Mouse</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🎮 Gaming
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>PlayStation 5</li>
        <li>Nintendo Switch OLED</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📚 E-Readers
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Amazon Kindle</li>
        <li>Kobo Libra Colour</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        💾 Storage
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>SanDisk 2TB External SSD</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🔌 Charging & Cables
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Belkin 40W Dual-Port USB Charger</li>
        <li>Belkin USB-C Fast Charging Cable</li>
      </ul>
    </section>
  </div>
);

const SoftwareSection = () => (
  <div className="flex flex-col gap-12">
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🚀 Prathamesh&apos;s Dev Stack
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            🧠 Core Development Environment
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Visual Studio Code</li>
            <li>Cursor</li>
            <li>Neovim</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            🖥️ Terminal & CLI Workflow
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Ghostty</li>
            <li>tmux</li>
            <li>lazygit</li>
            <li>gh</li>
            <li>nvm</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            🌐 Frontend & JavaScript
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Node.js (npm, corepack)</li>
            <li>Deno</li>
            <li>nodemon</li>
            <li>React / Next.js</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            🤖 AI-Assisted Development
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>
              OpenCode <span className="text-yellow-500">⭐</span> (primary AI
              coding interface)
            </li>
            <li>GitHub Copilot CLI</li>
            <li>Claude Code</li>
            <li>OpenAI Codex CLI</li>
            <li>Ollama</li>
            <li>ChatGPT / Claude</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            📱 Mobile Development
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Android Studio</li>
            <li>Android Platform Tools</li>
            <li>scrcpy</li>
            <li>CocoaPods</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            🐳 Dev Environment & Infra
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>OrbStack</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            🗄️ API & Database Tools
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Postman</li>
            <li>DBeaver</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        ⚡ Productivity & Workflow
      </h2>
      <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
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

const UsesPage = () => {
  const [selectedTab, setSelectedTab] = useState<UsesTab>(UsesTab.HARDWARE);

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      <PageTitle className="mb-2">Uses</PageTitle>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        A comprehensive list of all the tech products I use daily, from
        computers and audio gear to development tools.
      </p>

      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setSelectedTab(UsesTab.HARDWARE)}
          className={`pb-2 text-sm font-medium transition ${
            selectedTab === UsesTab.HARDWARE
              ? "border-b-2 border-slate-900 dark:border-slate-100 dark:text-white text-black"
              : "dark:text-slate-400 text-gray-700"
          }`}
        >
          Hardware
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab(UsesTab.SOFTWARE)}
          className={`pb-2 text-sm font-medium transition ${
            selectedTab === UsesTab.SOFTWARE
              ? "border-b-2 border-slate-900 dark:border-slate-100 dark:text-white text-black"
              : "dark:text-slate-400 text-gray-700"
          }`}
        >
          Software
        </button>
      </div>

      {selectedTab === UsesTab.HARDWARE && <HardwareSection />}
      {selectedTab === UsesTab.SOFTWARE && <SoftwareSection />}
    </PageAnimationContainer>
  );
};

export default UsesPage;
