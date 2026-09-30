"use client";

import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/uses/ProductCard";
import ToolTile from "@/components/uses/ToolTile";
import UsesSectionGrid from "@/components/uses/UsesSectionGrid";
import { IHardwareItem, IUsesSection } from "@/interface/uses.interface";
import { uses } from "@/src/data/uses";

enum UsesTab {
  SOFTWARE = "Software",
  HARDWARE = "Hardware",
  AUDIO = "Audio",
  SNEAKERS = "Sneakers",
}

const ProductSections = ({
  sections,
}: {
  sections: IUsesSection<IHardwareItem>[];
}) => (
  <div className="flex flex-col gap-10">
    {sections.map((section) => (
      <UsesSectionGrid
        key={section.id}
        section={section}
        className="grid-cols-2 sm:grid-cols-3"
        renderItem={(item) => (
          <ProductCard item={item} fallbackEmoji={section.emoji} />
        )}
      />
    ))}
  </div>
);

const SoftwareSection = () => (
  <div className="flex flex-col gap-10">
    {uses.software.map((section) => (
      <UsesSectionGrid
        key={section.id}
        section={section}
        className="grid-cols-2 sm:grid-cols-3"
        renderItem={(item) => <ToolTile item={item} />}
      />
    ))}
  </div>
);

const UsesPage = () => (
  <PageAnimationContainer>
    <PageTitle className="mb-2">Uses</PageTitle>
    <p className="mb-6 text-sm text-muted-foreground">
      A comprehensive list of all the tech products I use daily, from computers
      and audio gear to development tools and sneakers.
    </p>

    <Tabs defaultValue={UsesTab.SOFTWARE}>
      <TabsList className="mb-6">
        <TabsTrigger value={UsesTab.SOFTWARE}>Software</TabsTrigger>
        <TabsTrigger value={UsesTab.HARDWARE}>Hardware</TabsTrigger>
        <TabsTrigger value={UsesTab.AUDIO}>Audio</TabsTrigger>
        <TabsTrigger value={UsesTab.SNEAKERS}>Sneakers</TabsTrigger>
      </TabsList>
      <TabsContent value={UsesTab.SOFTWARE}>
        <SoftwareSection />
      </TabsContent>
      <TabsContent value={UsesTab.HARDWARE}>
        <ProductSections sections={uses.hardware} />
      </TabsContent>
      <TabsContent value={UsesTab.AUDIO}>
        <ProductSections sections={uses.audio} />
      </TabsContent>
      <TabsContent value={UsesTab.SNEAKERS}>
        <ProductSections sections={uses.sneakers} />
      </TabsContent>
    </Tabs>
  </PageAnimationContainer>
);

export default UsesPage;
