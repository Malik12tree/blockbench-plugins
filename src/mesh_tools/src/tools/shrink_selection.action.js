import { action } from "../actions.js";
<<<<<<< HEAD
import Neighborhood from "../utils/mesh/neighborhood.js";
import { selectFacesAndEdgesByVertices } from "../utils/utils.js";

export default action("shrink_selection", () => {
  Mesh.selected.forEach((mesh) => {
    const neighborMap = Neighborhood.VertexVertices(mesh);
=======
import { computeVertexNeighborhood, selectFacesAndEdgesByVertices } from "../utils/utils.js";

export default action("shrink_selection", () => {
  Mesh.selected.forEach((mesh) => {
    const neighborMap = computeVertexNeighborhood(mesh);
>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80

    const selectedVertices = mesh.getSelectedVertices();
    const selectedVertexSet = new Set(selectedVertices);
    for (const vertexKey of selectedVertices) {
      const neighbors = neighborMap[vertexKey];

      for (const neighbor of neighbors) {
        const isNotSelected = !selectedVertexSet.has(neighbor);

        if (isNotSelected) {
          selectedVertexSet.delete(vertexKey);
          break;
        }
      }
    }
    selectFacesAndEdgesByVertices(mesh, selectedVertexSet);
  });
  Canvas.updateView({ elements: Mesh.selected, selection: true });
});
