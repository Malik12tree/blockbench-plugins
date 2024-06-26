import { action } from "../actions.js";
<<<<<<< HEAD
import Neighborhood from "../utils/mesh/neighborhood.js";
=======
import { computeVertexNeighborhood } from "../utils/utils.js";
>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80

function runEdit(amend = false, influence = 1, iterations = 1) {
  Undo.initEdit({ elements: Mesh.selected, selection: true }, amend);

  Mesh.selected.forEach((mesh) => {
    if (!influence || !iterations) return; //

    const { vertices } = mesh;
<<<<<<< HEAD
    const neighborMap = Neighborhood.VertexVertices(mesh);
=======
    const neighborMap = computeVertexNeighborhood(mesh);
>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80

    const selectedVertices = mesh.getSelectedVertices();

    const originalVertexPositions = {};
    for (let i = 0; i < iterations; i++) {
      for (let vertexKey of selectedVertices) {
        originalVertexPositions[vertexKey] = mesh.vertices[vertexKey].slice();
      }

      for (let vertexKey of selectedVertices) {
        const neighbors = neighborMap[vertexKey];

        const vertexSmoothed = [0, 0, 0];
        for (const neigbor of neighbors) {
          const neigborPosition = originalVertexPositions[neigbor];
          vertexSmoothed.V3_add(neigborPosition);
        }
        vertexSmoothed.V3_divide(neighbors.length);

        vertices[vertexKey] = vertices[vertexKey].map((e, i) =>
          Math.lerp(e, vertexSmoothed[i], influence)
        );
      }
    }
  });
  Undo.finishEdit("MTools: Laplacian Smooth selected vertices");
  Canvas.updateView({
    elements: Mesh.selected,
    element_aspects: { geometry: true, uv: true, faces: true },
    selection: true,
  });
}

export default action("laplacian_smooth", () => {
  runEdit();
  Undo.amendEdit(
    {
      influence: {
        type: "number",
        value: 100,
        label: "Influence",
        min: 0,
        max: 100,
      },
      iterations: {
        type: "number",
        value: 1,
        label: "Iterations",
        min: 0,
        max: 10,
      },
    },
    (form) => runEdit(true, form.influence / 100, form.iterations)
  );
});
