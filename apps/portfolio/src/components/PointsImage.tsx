import { Point, PointMaterial, Points } from "@react-three/drei";
import {
  createRef,
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AdditiveBlending, Mesh } from "three";

import { getCanvasImageData } from "@/utils/three";

interface Props {
  imageUrl: string;
}

export interface PointsImageRefData {
  pointVectors: [number, number][];
  pointRefs: RefObject<Mesh>[];
}

const PointsImage = forwardRef<PointsImageRefData, Props>(
  ({ imageUrl }: Props, ref) => {
    const [imageData, setImageData] = useState<ImageData>();

    const [{ pointRefs, pointVectors }, setPointsData] =
      useState<PointsImageRefData>({
        pointVectors: [],
        pointRefs: [],
      });

    useImperativeHandle(ref, () => ({
      get pointVectors() {
        return pointVectors;
      },
      get pointRefs() {
        return pointRefs;
      },
    }));

    useEffect(() => {
      // set the initial image data
      getCanvasImageData(imageUrl).then((imageData) => {
        setImageData(imageData);

        const pointVectors: [number, number][] = [];

        for (let y = 0, y2 = imageData.height; y < y2; y++) {
          for (let x = 0, x2 = imageData.width; x < x2; x++) {
            if (imageData.data[x * 4 + y * 4 * imageData.width + 3] > 128) {
              pointVectors.push([x / 45, y / 45]);
            }
          }
        }

        setPointsData({
          pointVectors,
          pointRefs: Array.from({ length: pointVectors.length }).map(() =>
            createRef<Mesh>(),
          ),
        });
      });
    }, [imageUrl]);

    return imageData ? (
      <mesh
        position={[
          -(imageData.width / 2) / 45,
          -(imageData.height / 2) / 45,
          0,
        ]}
      >
        {/** roughly center the pixel image */}

        <Points limit={imageData.width * imageData.height}>
          <PointMaterial
            size={2}
            sizeAttenuation={false}
            depthWrite={true}
            blending={AdditiveBlending}
            vertexColors
          />

          {pointVectors.map(([x, y], index) => (
            <Point
              key={index}
              ref={pointRefs[index]}
              color="white"
              position={[x, y, 0]}
            />
          ))}
        </Points>
      </mesh>
    ) : null;
  },
);

PointsImage.displayName = "PointsImage";

export default PointsImage;
