import { Vector3, Matrix4, Quaternion, Color } from "three";
import { useRef, useLayoutEffect, forwardRef } from "react";
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
				new Vector3(0, i * 4, 0),
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
