import {
	Vector3,
	Matrix4,
	Quaternion,
	Color,
	TorusGeometry,
	MeshStandardMaterial,
} from "three";
import { useRef, useLayoutEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new TorusGeometry(8);
const material = new MeshStandardMaterial({
	transparent: true,
	toneMapped: false,
	emissiveIntensity: 2,
	emissive: new Color(2, 0, 0),
});
export const InstancedShapes = forwardRef(function InstancedShapes(
	{ position, rotation },
	ref,
) {
	const instancedRef = useRef();
	const matrix = new Matrix4();
	const colors = new Color();
	const ballsCount = 250;
	useLayoutEffect(() => {
		for (let i = 0; i < ballsCount; i++) {
			matrix.compose(
				// new Vector3(Math.sin(i + 6) * 50, Math.cos(i + 4) * 50, i * 5),
				new Vector3(0, 1.5, -i * 1.2),
				// new Vector3(
				// 	Math.sqrt(Math.abs(Math.sin(i * 3) * 20)) * 20,
				// 	Math.sin(i * 3) * 50,
				// 	0,
				new Quaternion(),
				new Vector3(1, 1, 1),
			);
			instancedRef.current.setMatrixAt(i, matrix);
			instancedRef.current.setColorAt(
				i,
				colors.setHex(Math.sin(3) * 400 * 0xffffff),
			);
			instancedRef.current.instanceColor.needsUpdate = true;
			instancedRef.current.instanceMatrix.needsUpdate = true;
		}

		instancedRef.current.material.color.r = 5;
		instancedRef.current.material.color.g = 2.5;
		instancedRef.current.material.color.b = 10;
	}, []);

	useFrame((state) => {
		// const offset = scroll.offset;
		// for (let i = 0; i < 200; i++) {
		// state.camera.position.x = Math.sqrt(
		// 	Math.abs(Math.sin(offset - 0.75 / 2 + i * 3) * 20),
		// );
		// state.camera.position.z =
		// 	Math.sqrt(Math.abs(Math.cos(offset - 0.75 / 2 + i * 3))) * 5;
		// 	state.camera.position.x = Math.sqrt(
		// 		Math.abs(Math.sin(offset + i * 3) * 40) * 20,
		// 	);
		// 	MathUtils
		// 	state.camera.position.z = Math.sin(offset + i * 3) * 20;
		// }
		// state.camera.lookAt(0, 0, 0);
	});

	return (
		<group ref={ref}>
			<instancedMesh
				position={position}
				rotation={rotation}
				scale={0}
				ref={instancedRef}
				args={[null, null, ballsCount]}
				geometry={torusGeometry}
				material={material}
			/>
		</group>
	);
});

export default InstancedShapes;
