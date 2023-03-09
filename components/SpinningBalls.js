import { Vector3, Matrix4, Quaternion, Color } from "three";
import { useRef, useLayoutEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
export const SpinningBalls = forwardRef(function SpinningBalls(
	{ material, position, rotation },
	ref,
) {
	const instancedRef = useRef();

	const ballsCount = 250;
	const matrix = new Matrix4();
	let colors = new Color();

	useLayoutEffect(() => {
		for (let i = 0; i < ballsCount; i++) {
			const scale = Math.sin(1.2) * i * 0.1;
			matrix.compose(
				// new Vector3(Math.sin(i + 6) * 50, Math.cos(i + 4) * 50, i * 5),
				new Vector3(0, i * 4, 0),
				// new Vector3(
				// 	Math.sqrt(Math.abs(Math.sin(i * 3) * 20)) * 20,
				// 	Math.sin(i * 3) * 50,
				// 	0,
				new Quaternion(),
				new Vector3(scale, scale, scale),
			);
			instancedRef.current.setMatrixAt(i, matrix);
			instancedRef.current.setColorAt(
				i,
				colors.setHex(Math.random() * 20 * 0xffffff),
			);

			instancedRef.current.instanceColor.needsUpdate = true;
			instancedRef.current.instanceMatrix.needsUpdate = true;
		}

		instancedRef.current.material.toneMapped = false;
		instancedRef.current.material.emissiveIntensity = 2;
		instancedRef.current.material.emissive = colors.setRGB(
			Math.random() * 1.5,
			Math.random() * 1.5,
			Math.random() * 1.5,
		);

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
				scale={0.4}
				position={position}
				rotation={rotation}
				ref={instancedRef}
				args={[null, null, ballsCount]}
				material={material}
			>
				<sphereGeometry args={[0.5, 16]} />
			</instancedMesh>
		</group>
	);
});

export default SpinningBalls;
