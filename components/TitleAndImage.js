import gsap from "gsap";

import { Text, Image, Float, shaderMaterial } from "@react-three/drei";
import { forwardRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCamStore } from "../store/useCamStore";

const TitleAndImage = forwardRef(function TitleAndImage(props, ref) {
	const {
		text,
		youngText,
		kidImage,
		position,
		opacity,
		meshPosition,
		...otherProps
	} = props;

	const { followModel } = useCamStore();
	const [greyscale, setGreyscale] = useState(false);

	const animateOpacity = (ref, value) => {
		gsap.to(ref.current.material, {
			opacity: value,
			duration: 2,
			ease: "easeIn",
		});
	};

	useEffect(() => {
		if (greyscale === false) {
			gsap.to(kidImage.current.material, { zoom: 1, duration: 1 });
			gsap.to(kidImage.current.material, { grayscale: 0, duration: 2 });
		} else {
			gsap.to(kidImage.current.material, { zoom: 0.75, duration: 1 });
			gsap.to(kidImage.current.material, { grayscale: 1, duration: 2 });
		}

		if (followModel === false) {
			animateOpacity(kidImage, 0);
			animateOpacity(youngText, 0);
		} else {
			animateOpacity(kidImage, 1.3);
			animateOpacity(youngText, 1.3);
		}
	}, [greyscale, followModel]);

	useFrame(({ camera }) => {
		ref.current.lookAt(camera.position);
	});

	return (
		<Float>
			<mesh position={meshPosition}>
				<group position={position} ref={ref}>
					<mesh>
						<Image
							alt=""
							position-y={-0.15}
							{...otherProps}
							ref={kidImage}
							transparent
							onPointerOver={() => setGreyscale(true)}
							onPointerLeave={() => setGreyscale(false)}
							scale={1.75}
							opacity={opacity}
						/>
					</mesh>

					<mesh>
						<Text
							ref={youngText}
							fontSize={0.75}
							position={[0, -1.5, 0.01]}
							material-opacity={opacity}
						>
							{text}
						</Text>
					</mesh>
				</group>
			</mesh>
		</Float>
	);
});

export default TitleAndImage;
