import TitleAndImage from "./TitleAndImage";
import Floor from "./Floor";
import Effects from "./Effects";
import { Clouds, Mac } from "./Mac";

import gsap from "gsap";

import {
	Center,
	Environment,
	Stars,
	useScroll,
	useTexture,
} from "@react-three/drei";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import EnvLights from "./EnvLights";
import ImageShader from "./ImageShader";
import SpinningBalls from "./SpinningBalls";
import { Color, MeshStandardMaterial } from "three";
import InstancedShapes from "./InstancedShapes";

const material = new MeshStandardMaterial({ transparent: true });

export default function Experience() {
	const texture = useTexture("./Mac/Albums.png");
	const tl = useRef();
	const mac = useRef();
	const imageGroup = useRef();
	const album = useRef();
	const spinningBalls = useRef();
	const spinningBallsRight = useRef();
	const spinningBallsCenter = useRef();
	const spinningBallsTop = useRef();
	const clouds = useRef();
	const instancedShapes = useRef();

	const scroll = useScroll();
	const { camera } = useThree();

	useFrame(({ camera }) => {
		tl.current.seek(scroll.offset * tl.current.duration());

		spinningBalls.current.position.z = scroll.offset * 20;
		spinningBallsRight.current.position.z = scroll.offset * 10;
		material.emissiveIntensity = 0.25 - Math.abs(Math.sin(scroll.offset));
	});

	useLayoutEffect(() => {
		tl.current = gsap.timeline();

		tl.current.to(
			mac.current.position,
			{ x: 0, y: 1, z: -8, duration: 2.5, ease: "easeInOut" },
			0,
		);

		tl.current.to(
			album.current.scale,
			{ x: 1, y: 1, z: 1, duration: 1.5 },
			0.25,
		);

		tl.current.to(
			mac.current.rotation,
			{ y: -Math.PI / 2, duration: 2.5, ease: "easeOut" },
			0.25,
		);

		//2nd animation
		tl.current.to(
			album.current.scale,
			{ x: 0, y: 0, z: 0, duration: 1.5 },
			2.75,
		);

		tl.current.to(
			mac.current.position,
			{ z: -17.5, duration: 2.5, ease: "easeInOut" },
			3,
		);

		tl.current.to(
			clouds.current.scale,
			{ x: 0.25, y: 0.25, z: 0.25, duration: 1 },
			3,
		);

		tl.current.to(
			clouds.current.scale,
			{ x: 0, y: 0, z: 0, duration: 2, ease: "easeOut" },
			4,
		);
		tl.current.to(
			mac.current.position,
			{ z: -30, duration: 3, ease: "slowMo" },
			5.5,
		);
		tl.current.to(
			spinningBallsCenter.current.position,
			{ z: 100, duration: 5, ease: "power" },
			5.5,
		);

		//animation 3
		tl.current.to(
			spinningBallsCenter.current.position,
			{ z: 450, y: -20, duration: 5, ease: "easeIn" },
			10.5,
		);
		tl.current.to(
			spinningBallsTop.current.position,
			{ z: 450, y: 10, duration: 5, ease: "easeIn" },
			10.5,
		);

		tl.current.to(
			material,
			{ opacity: 0, duration: 2, ease: "easeIn" },
			15.5,
		);
		tl.current.to(
			instancedShapes.current.children[0].scale,
			{ x: 1, y: 1, z: 1, duration: 2, ease: "easeIn" },
			15.5,
		);

		tl.current.to(
			instancedShapes.current.children[0].position,
			{ z: 100, duration: 5, ease: "easeInOut" },
			17.5,
		);
	}, []);

	useFrame(({ clock }) => {
		instancedShapes.current.rotation.z = clock.elapsedTime;
	});

	return (
		<group>
			<Effects />
			<SpinningBalls
				ref={spinningBalls}
				material={material}
				position={[-4, 0, -3]}
				rotation={[-Math.PI / 2, 0, -0.01]}
			/>
			<SpinningBalls
				ref={spinningBallsRight}
				material={material}
				position={[4, 0, -3]}
				rotation={[-Math.PI / 2, 0, 0.01]}
			/>
			<SpinningBalls
				ref={spinningBallsTop}
				material={material}
				position={[0, 2.5, -20]}
				rotation={[-Math.PI / 2, 0, 0]}
			/>

			<SpinningBalls
				ref={spinningBallsCenter}
				material={material}
				position={[0, -2.5, -20]}
				rotation={[-Math.PI / 2, 0, 0]}
			/>
			<InstancedShapes
				ref={instancedShapes}
				position={[0, 0, -150]}
				rotation={[-Math.PI, 0, 0]}
			/>

			<Floor />
			<Mac
				ref={mac}
				position={[-1, 0.75, -3]}
				scale={0.6}
				rotation-y={-Math.PI / 3}
			/>
			<group ref={imageGroup}>
				<ImageShader
					ref={album}
					albumTexture={texture}
					uScalar={0.1}
					distortionScale={0.5}
					uTimeSpeed={0.25}
					position={[0, 2.5, -10]}
				/>
				<Clouds ref={clouds} position={[0, 2.5, -15]} />
			</group>
			<Environment preset="night" frames={Infinity}>
				<EnvLights />
			</Environment>
			<Stars />
		</group>
	);
}
