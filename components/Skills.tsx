import { skillsMindMapData } from "@/src/data/skils-data";

import Chips from "./Chips";

const Skills = () => {
  return (
    <section className="my-4">
      <h3 className="mb-4">Skills</h3>
      <Chips skills={skillsMindMapData.children || []} />
    </section>
  );
};

export default Skills;
