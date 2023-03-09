import { Vector3, Matrix4, Quaternion, Color, TorusGeometry } from "three";
import { useRef, useLayoutEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import ImageShader from "./ImageShader";
const torusGeometry = new TorusGeometry(8);
export const InstancedShapes = forwardRef(function InstancedShapes(
	{ material, position, rotation },
	ref,
) {
	const texture = useTexture("./Mac/Albums.png");

	const instancedRef = useRef([]);

	const ballsCount = 250;
	const matrix = new Matrix4();
	let colors = new Color();

	// useLayoutEffect(() => {
	// 	for (let i = 0; i < ballsCount; i++) {
	// 		const scale = Math.sin(1.2) * i * 0.1;
	// 		matrix.compose(
	// 			// new Vector3(Math.sin(i + 6) * 50, Math.cos(i + 4) * 50, i * 5),
	// 			new Vector3(0, i * 4, 0),
	// 			// new Vector3(
	// 			// 	Math.sqrt(Math.abs(Math.sin(i * 3) * 20)) * 20,
	// 			// 	Math.sin(i * 3) * 50,
	// 			// 	0,
	// 			new Quaternion(),
	// 			new Vector3(scale, scale, scale),
	// 		);
	// 		instancedRef.current.setMatrixAt(i, matrix);
	// 		instancedRef.current.setColorAt(
	// 			i,
	// 			colors.setHex(Math.random() * 20 * 0xffffff),
	// 		);
	// 		instancedRef.current.i = i;
	// 		instancedRef.current.instanceColor.needsUpdate = true;
	// 		instancedRef.current.instanceMatrix.needsUpdate = true;
	// 	}

	// 	instancedRef.current.material.toneMapped = false;
	// 	instancedRef.current.material.emissiveIntensity = 2;
	// 	instancedRef.current.material.emissive = colors.setRGB(
	// 		Math.random() * 1.5,
	// 		Math.random() * 1.5,
	// 		Math.random() * 1.5,
	// 	);

	// 	instancedRef.current.material.color.r = 5;
	// 	instancedRef.current.material.color.g = 2.5;
	// 	instancedRef.current.material.color.b = 10;
	// }, []);

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
		<group ref={ref} scale={0}>
			{[...Array(100)].map((value, i) => (
				<mesh
					ref={(element) => {
						instancedRef.current[i] = element;
					}}
					key={i}
					geometry={torusGeometry}
					material={material}
					position={[0, 1.5, -i * 1.2]}
					scale={1}
					onClick={() => {
						console.log(instancedRef.current[i].position);
					}}
				/>
			))}
		</group>
	);
});

export default InstancedShapes;
