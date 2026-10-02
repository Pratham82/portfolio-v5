import PageTitle from "@/components/PageTitle";
import { skillsMindMapData } from "@/src/data/skils-data";

import Chips from "./Chips";

const Skills = () => {
  return (
    <section>
      <PageTitle className="mb-4">Skills</PageTitle>
      <Chips skills={skillsMindMapData.children || []} />
    </section>
  );
};

export default Skills;
