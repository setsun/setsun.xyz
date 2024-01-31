import { MaterialNode, Object3DNode } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}
