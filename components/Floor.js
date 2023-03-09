import { Grid } from "@react-three/drei";
import { useRef } from "react";

export default function Floor() {
	const grid = useRef();

	return (
		<group>
			<Grid
				ref={grid}
				renderOrder={-1}
				position={[0, -2, 0]}
				infiniteGrid
				cellSize={0}
				cellThickness={0.5}
				cellColor={[10, 10, 10]}
				sectionSize={2}
				sectionThickness={1}
				sectionColor={[10, 10, 10]}
				fadeDistance={20}
				followCamera
			/>
			{/* <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[100, 100]} />
			</mesh> */}
		</group>
	);
}
