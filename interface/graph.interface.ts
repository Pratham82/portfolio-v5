interface Node {
  id: string;
  val?: number;
}

interface Link {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
