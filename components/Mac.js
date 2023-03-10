/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/mac_miler.glb --transform --simplify
Author: ralez (https://sketchfab.com/ralez)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/mac-miler-feb5c4ca64934773bd6b58bf408852da
Title: Mac Miler
*/

import TitleAndImage from "./TitleAndImage";

import { forwardRef, useRef } from "react";

import { Vector3 } from "three";
import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCamStore } from "../store/useCamStore";

export const Mac = forwardRef(function Mac(props, ref) {
	const { followModel, setFollowModel, setFollowModelT } = useCamStore();

	const imgGroup = useRef();

	const kidImage = useRef();
	const youngText = useRef();
	const group = useRef();

	const Mac2010 = useRef();
	const Mac2010Text = useRef();
	const group2010 = useRef();

	const kidsAlbum = useRef();
	const kidsAlbumGroup = useRef();
	const kidsAlbumText = useRef();

	const smilingMac = useRef();
	const smilingMacGroup = useRef();
	const smilingMacText = useRef();

	const glassesMac = useRef();
	const glassesMacGroup = useRef();
	const glassesMacText = useRef();

	const { nodes, materials } = useGLTF("/mac_miler-transformed.glb");

	const imageElements = [
		<TitleAndImage
			key={0}
			ref={group}
			youngText={youngText}
			kidImage={kidImage}
			url="/Mac/kidmac.png"
			text="Young Mac"
			position={[-0.05, 0, -0.6]}
			opacity={1}
		/>,
		<TitleAndImage
			key={1}
			ref={group2010}
			youngText={Mac2010Text}
			kidImage={Mac2010}
			url="/Mac/2010.webp"
			text="2010"
			position={[-0.1, 0, -0.6]}
			opacity={0}
		/>,
		<TitleAndImage
			key={2}
			ref={kidsAlbumGroup}
			youngText={kidsAlbumText}
			kidImage={kidsAlbum}
			url="/Mac/kids.jpg"
			text="KIDS"
			position={[-0.15, 0, -1.2]}
			opacity={0}
		/>,
		<TitleAndImage
			key={3}
			ref={smilingMacGroup}
			youngText={smilingMacText}
			kidImage={smilingMac}
			url="/Mac/mac-miller.jpg"
			text="SMILE"
			position={[-0.2, 0, -1.8]}
			opacity={0}
		/>,
		<TitleAndImage
			key={4}
			ref={glassesMacGroup}
			youngText={glassesMacText}
			kidImage={glassesMac}
			url="/Mac/Glasses.jpg"
			text="RIP"
			position={[-0.25, 0, -2.4]}
			opacity={0}
		/>,
	];

	useFrame(({ clock, camera }, delta) => {
		// ref.current.position.x = Math.sin(clock.elapsedTime * 0.15) * 2;
		// ref.current.position.y = 1 + Math.sin(clock.elapsedTime * 0.25) * 0.25;

		ref.current.children[0].rotation.z =
			Math.sin(clock.elapsedTime * 0.1) * 2;

		camera.position.lerp(
			new Vector3(
				Math.sin(clock.elapsedTime * 0.4) + ref.current.position.x,
				ref.current.position.y * 2,
				2 + Math.cos(clock.elapsedTime * 0.4) + ref.current.position.z,
			),
			0.025,
		);

		camera.position.z < -5 ? setFollowModel() : setFollowModelT();

		if (imgGroup.current && followModel === true) {
			imgGroup.current.rotation.y += delta / 2;
			imgGroup.current.position.y =
				1 + Math.sin(clock.elapsedTime * 0.25) * 2;
		}
	});

	return (
		<group ref={ref} {...props} dispose={null}>
			<group ref={imgGroup}>
				{imageElements.map((imgEl, index) => {
					return (
						<TitleAndImage
							key={index}
							ref={imgEl.ref}
							youngText={imgEl.props.youngText}
							kidImage={imgEl.props.kidImage}
							text={imgEl.props.text}
							position={[
								Math.sin(index) * 4,
								1,
								Math.cos(index) * 4,
							]}
							meshPosition={imgEl.props.meshPosition}
							url={imgEl.props.url}
							opacity={0.7 + index * 0.75}
						/>
					);
				})}
			</group>
			<group rotation={[-Math.PI / 2, 0, 0]} scale={0.16}>
				<mesh
					geometry={nodes.Object_2.geometry}
					material={materials.cadarco}
				/>
				<mesh
					geometry={nodes.Object_3.geometry}
					material={materials.calca}
				/>
				<mesh
					geometry={nodes.Object_4.geometry}
					material={materials["Material.002"]}
				/>
				<mesh
					geometry={nodes.Object_5.geometry}
					material={materials.bone}
				/>
				<mesh
					geometry={nodes.Object_6.geometry}
					material={materials.vans}
				/>
				<mesh
					geometry={nodes.Object_7.geometry}
					material={materials.cigarro}
				/>
				<mesh
					geometry={nodes.Object_8.geometry}
					material={materials.brincos}
				/>
				<mesh
					geometry={nodes.Object_9.geometry}
					material={materials.camisa}
				/>
				<mesh
					geometry={nodes.Object_10.geometry}
					material={materials.olhos}
				/>
				<mesh
					geometry={nodes.Object_11.geometry}
					material={materials.corpo}
				/>
				<mesh
					geometry={nodes.Object_12.geometry}
					material={materials.Default_OBJ}
				/>
				<Float>
					<mesh
						geometry={nodes.Object_13.geometry}
						material={materials.nuvem}
					/>
					<mesh
						geometry={nodes.Object_19.geometry}
						material={materials.nuvem}
					/>

					<mesh
						geometry={nodes.Object_14.geometry}
						material={materials.nuvem}
					/>
					<mesh
						geometry={nodes.Object_15.geometry}
						material={materials.nuvem}
					/>
					<mesh
						geometry={nodes.Object_16.geometry}
						material={materials.nuvem}
					/>
					<mesh
						geometry={nodes.Object_17.geometry}
						material={materials.nuvem}
					/>
					<mesh
						geometry={nodes.Object_18.geometry}
						material={materials.nuvem}
					/>
					<mesh
						geometry={nodes.Object_20.geometry}
						material={materials.nuvem}
					/>
				</Float>
			</group>
		</group>
	);
});

useGLTF.preload("/mac_miler-transformed.glb");

export const Clouds = forwardRef((props, ref) => {
	const { nodes, materials } = useGLTF("/mac_miler-transformed.glb");
	return (
		<group ref={ref} {...props} scale={0}>
			{}
			<Float>
				<mesh
					geometry={nodes.Object_13.geometry}
					material={materials.nuvem}
				/>
				<mesh
					geometry={nodes.Object_14.geometry}
					material={materials.nuvem}
				/>
				<mesh
					geometry={nodes.Object_15.geometry}
					material={materials.nuvem}
				/>
				<mesh
					geometry={nodes.Object_16.geometry}
					material={materials.nuvem}
				/>
				<mesh
					geometry={nodes.Object_17.geometry}
					material={materials.nuvem}
				/>
				<mesh
					geometry={nodes.Object_18.geometry}
					material={materials.nuvem}
				/>
				<mesh
					geometry={nodes.Object_19.geometry}
					material={materials.nuvem}
				/>
				<mesh
					geometry={nodes.Object_20.geometry}
					material={materials.nuvem}
				/>
			</Float>
		</group>
	);
});

Mac.displayName = "Mac";
Clouds.displayName = "Clouds";
export default Mac;
