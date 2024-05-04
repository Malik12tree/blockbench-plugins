import "./tools/index.js";
import "./operators/index.js";
import "./generators/index.js";
import { ACTIONS, qualifyName } from "./actions.js";
import { createTextMesh, vertexNormal } from "./utils/utils.js";
<<<<<<< HEAD
import { PLUGIN_ID } from "./globals.js";
=======
>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80

const deletables = [];
/**
 * @type {Array<THREE.Object3D>}
 */
const meshToolTips = [];
<<<<<<< HEAD
BBPlugin.register(PLUGIN_ID, {
  new_repository_format: true,
  title: "MTools",
  author: "Malik12tree",
  icon: "icon.png",
  description: "Adds powerful mesh modeling tools, operators and generators!",
  version: "2.0.1",
  min_version: "4.9.4",
  variant: "both",
  tags: ["Format: Generic Model", "Mesh", "Tool"],
=======
BBPlugin.register("mesh_tools", {
  "new_repository_format": true,
  "title": "MTools",
  "author": "Malik12tree",
  "icon": "icon.png",
  "description": "Adds powerful mesh modeling tools, operators and generators!",
  "version": "2.0.0",
  "min_version": "4.9.4",
  "variant": "both",
  "tags": ["Format: Generic Model", "Mesh", "Tool"],
>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80
  onload() {
    function debug(element) {
      for (const object of meshToolTips) {
        scene.remove(object);
      }

      for (const faceKey in element.faces) {
        const face = element.faces[faceKey];
        const center = face.getCenter().V3_toThree();
        element.mesh.localToWorld(center);

        const normal = face.getNormal(true).V3_toThree();

        const mesh = createTextMesh(faceKey, {
          fillStyle: "blue",
          fontSize: 25,
        });
        meshToolTips.push(mesh);

        mesh.position.copy(center);
        if (normal) {
<<<<<<< HEAD
=======

>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80
          mesh.position.add(normal.multiplyScalar(0.5));
        }

        scene.add(mesh);
      }
      for (const vertexKey in element.vertices) {
        const vertex = element.vertices[vertexKey].V3_toThree();
        element.mesh.localToWorld(vertex);

        const normal =
          vertexNormal(element, vertexKey) ?? new THREE.Vector3(0, 1, 0);

        const mesh = createTextMesh(vertexKey, {
          fillStyle: "red",
          fontSize: 25,
        });
        meshToolTips.push(mesh);

        mesh.position.copy(vertex);

        if (normal) {
          mesh.position.add(normal.multiplyScalar(0.25));
        }

        scene.add(mesh);
      }
    }

    // TODO move to separate plugin
<<<<<<< HEAD
    const isDebug = false && this.source == "file";
=======
    const isDebug =false && this.source == "file";
>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80
    if (isDebug) {
      deletables.push(
        Mesh.prototype.preview_controller.on("update_geometry", ({ element }) =>
          debug(element)
        )
      );
      for (const mesh of Mesh.all) {
        debug(mesh);
      }
    }

<<<<<<< HEAD
    Mesh.prototype.menu.structure.unshift(qualifyName("tools"));
    Mesh.prototype.menu.structure.unshift(qualifyName("operators"));
    MenuBar.addAction(qualifyName("generators"), "filter");
=======
    Mesh.prototype.menu.structure.unshift("@meshtools/tools");
    Mesh.prototype.menu.structure.unshift("@meshtools/operators");
    MenuBar.addAction("@meshtools/generators", "filter");
>>>>>>> f564e299cde39a3efce91b4549bc6b9db34cba80
  },
  onunload() {
    for (const deletable of deletables) {
      deletable.delete();
    }
    for (const object of meshToolTips) {
      scene.remove(object);
    }

    for (const actionId in ACTIONS) {
      const id = qualifyName(actionId);
      BarItems[id]?.delete();
    }
  },
});
