import { Lightformer } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function EnvLights() {
	const orangeEnv = useRef();
	const redEnv = useRef();

	useFrame(({ clock }) => {
		orangeEnv.current.position.x = Math.sin(clock.elapsedTime * 0.25) * 2;
		orangeEnv.current.position.z = Math.cos(clock.elapsedTime * 0.25) * 2;

		redEnv.current.position.x = Math.cos(clock.elapsedTime * 0.25) * 2;
		redEnv.current.position.y = Math.sin(clock.elapsedTime * 0.25) * 2;

		orangeEnv.current.intensity =
			60 + Math.abs(Math.sin(clock.elapsedTime * 0.25) * 100);
	});

	return (
		<group>
			<Lightformer
				ref={redEnv}
				position={[0, 1, 6]}
				color="red"
				scale={1.5}
				intensity={20}
			/>
			<Lightformer
				ref={orangeEnv}
				position={[0, 2, 1]}
				color="orange"
				intensity={60}
			/>
			<Lightformer
				color="blue"
				position={[5, 2, -5]}
				intensity={100}
				scale={2.75}
				form="circle"
			/>
			<Lightformer
				position={[-3, -2.5, 1]}
				color="orange"
				form="ring"
				scale={2}
				intensity={23.5}
				// position={[lightPosition.x, lightPosition.y, lightPosition.z]}
				// scale={lightScale}
				// intensity={lightIntensity}
			/>
		</group>
	);
}
