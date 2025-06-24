import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    mountRef.current.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 8, 6),
      new THREE.ConeGeometry(0.3, 0.6, 8),
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.4)
    ];
    
    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0x00524e, 
        transparent: true, 
        opacity: 0.3,
        wireframe: Math.random() > 0.5
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xa97c73, 
        transparent: true, 
        opacity: 0.3,
        wireframe: Math.random() > 0.5
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xb2c794, 
        transparent: true, 
        opacity: 0.3,
        wireframe: Math.random() > 0.5
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x0f3607, 
        transparent: true, 
        opacity: 0.2,
        wireframe: Math.random() > 0.5
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x4b1b21, 
        transparent: true, 
        opacity: 0.25,
        wireframe: Math.random() > 0.5
      })
    ];
    
    const meshes: THREE.Mesh[] = [];
    
    // Create multiple floating objects
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 30;
      mesh.position.y = (Math.random() - 0.5) * 30;
      mesh.position.z = (Math.random() - 0.5) * 30;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      // Add random scale variation
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);
      
      scene.add(mesh);
      meshes.push(mesh);
    }
    
    camera.position.z = 10;
    camera.position.y = 2;

    // Add subtle ambient movement to camera
    let time = 0;
    
    // Animation loop
    function animate() {
      time += 0.005;
      
      // Animate meshes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.003 + index * 0.0001;
        mesh.rotation.y += 0.005 + index * 0.0001;
        mesh.rotation.z += 0.002 + index * 0.0001;
        
        // Floating motion
        mesh.position.y += Math.sin(time * 2 + index) * 0.002;
        mesh.position.x += Math.cos(time * 1.5 + index) * 0.001;
      });
      
      // Subtle camera movement
      camera.position.x = Math.sin(time * 0.5) * 2;
      camera.position.y = 2 + Math.cos(time * 0.3) * 1;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      meshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(material => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} id="threejs-bg" />;
}
