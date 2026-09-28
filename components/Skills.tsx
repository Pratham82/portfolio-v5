import { skillsMindMapData } from "@/src/data/skils-data";

import Chips from "./Chips";

const Skills = () => {
  return (
    <section className="my-4">
      <Chips skills={skillsMindMapData.children || []} />
    </section>
  );
};

export default Skills;
