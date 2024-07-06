import React, { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Network.module.scss';
import { Network } from '@/exports/neural';

interface NeuralNetworkProps {
  neuronCount?: number;
  mouseSensitivity?: number;
  neuronSpacing?: number;
  neuronSize?: number;
  initialCameraPosition?: THREE.Vector3;
  renderConnections?: boolean;
  lineColor?: string;
  sphereColor?: string;
}

const NeuralNetwork: FC<NeuralNetworkProps> = ({
  neuronCount = 100,
  mouseSensitivity = 0.000042,
  neuronSpacing = 10,
  neuronSize = 0.3,
  initialCameraPosition = new THREE.Vector3(0, 0, 15),
  renderConnections = true,
  lineColor = '#ffffff',
  sphereColor = '#ffffff',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); // Initialize as null

  const neuronsMeshesRef = useRef<THREE.Mesh[]>([]);
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    const scene = sceneRef.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    if (containerRef.current && containerRef.current.children.length === 0) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const network = new Network();
    network.generateNeuronsAndConnections(neuronCount, neuronSpacing);

    network.neurons.forEach((neuron) => {
      const geometry = new THREE.SphereGeometry(neuronSize, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(sphereColor) });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(neuron.position);
      scene.add(sphere);
      neuronsMeshesRef.current.push(sphere);
    });

    if (renderConnections) {
      network.connections.forEach((connection) => {
        const from = connection.from.position;
        const to = connection.to.position;

        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(from.x, from.y, from.z),
          new THREE.Vector3(to.x, to.y, to.z)
        ]);

        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(lineColor),
          transparent: true,
          opacity: 0.1
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      });
    }

    const handleResize = () => {
      if (cameraRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      mouseX = (event.clientX - clientWidth / 2) * mouseSensitivity;
      mouseY = (event.clientY - clientHeight / 2) * mouseSensitivity;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.x += (mouseY - scene.rotation.x) * 0.1;
      scene.rotation.y += (mouseX - scene.rotation.y) * 0.1;
      if (cameraRef.current) {
        renderer.render(scene, cameraRef.current);
      }
    };

    animate();

    if (typeof window !== 'undefined') {
      cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      cameraRef.current.position.copy(initialCameraPosition);
      window.addEventListener('resize', handleResize);
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        renderer.dispose();
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [neuronCount, mouseSensitivity, neuronSpacing, neuronSize, initialCameraPosition, renderConnections, lineColor, sphereColor]);

  return <div className={styles.networkContainer} ref={containerRef}></div>;
};

export default NeuralNetwork;
