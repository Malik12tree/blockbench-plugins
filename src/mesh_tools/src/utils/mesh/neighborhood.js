import { getEdgeKey } from "../utils.js";

export function computeEdgeFacesNeighborhood(mesh) {}

export default class Neighborhood {
  /**
   *
   * @param {Mesh} mesh
   * @returns
   */
  static VertexFaces(mesh) {
    const map = {};

    for (const key in mesh.faces) {
      const face = mesh.faces[key];

      face.vertices.forEach((vkey) => {
        if (!(vkey in map)) {
          map[vkey] = [];
        }

        face.vertices.forEach((neighborkey) => {
          if (neighborkey == vkey) return;

          map[vkey].safePush(neighborkey);
        });
      });
    }

    return map;
  }

  /**
   *
   * @param {Mesh} mesh
   * @returns {{[edgeKey: string]: MeshFace[]}}
   */
  static EdgeFaces(mesh) {
    const neighborhood = {};
    for (const key in mesh.faces) {
      const face = mesh.faces[key];
      const vertices = face.getSortedVertices();

      for (let i = 0; i < vertices.length; i++) {
        const vertexCurr = vertices[i];
        const vertexNext = vertices[(i + 1) % vertices.length];
        const edgeKey = getEdgeKey(vertexCurr, vertexNext);
        neighborhood[edgeKey] ??= [];
        neighborhood[edgeKey].safePush(face);
      }
    }
    return neighborhood;
  }
  static VertexEdges() {}
}
