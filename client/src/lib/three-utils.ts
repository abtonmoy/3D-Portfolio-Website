import * as THREE from 'three';

export interface GeometryConfig {
  type: 'box' | 'sphere' | 'cone' | 'octahedron' | 'tetrahedron';
  size?: number;
  segments?: number;
}

export interface MaterialConfig {
  color: number;
  opacity?: number;
  transparent?: boolean;
  wireframe?: boolean;
}

export interface MeshConfig {
  geometry: GeometryConfig;
  material: MaterialConfig;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  scale?: number;
}

export const createGeometry = (config: GeometryConfig): THREE.BufferGeometry => {
  const { type, size = 0.5, segments = 8 } = config;
  
  switch (type) {
    case 'box':
      return new THREE.BoxGeometry(size, size, size);
    case 'sphere':
      return new THREE.SphereGeometry(size * 0.6, segments, segments);
    case 'cone':
      return new THREE.ConeGeometry(size * 0.6, size * 1.2, segments);
    case 'octahedron':
      return new THREE.OctahedronGeometry(size * 0.8);
    case 'tetrahedron':
      return new THREE.TetrahedronGeometry(size * 0.8);
    default:
      return new THREE.BoxGeometry(size, size, size);
  }
};

export const createMaterial = (config: MaterialConfig): THREE.Material => {
  const { color, opacity = 0.3, transparent = true, wireframe = false } = config;
  
  return new THREE.MeshBasicMaterial({
    color,
    opacity,
    transparent,
    wireframe
  });
};

export const createMesh = (config: MeshConfig): THREE.Mesh => {
  const geometry = createGeometry(config.geometry);
  const material = createMaterial(config.material);
  const mesh = new THREE.Mesh(geometry, material);
  
  mesh.position.copy(config.position);
  mesh.rotation.setFromVector3(config.rotation);
  
  if (config.scale) {
    mesh.scale.setScalar(config.scale);
  }
  
  return mesh;
};

export const portfolioColors = {
  brunswick: 0x00524e,
  beaver: 0xa97c73,
  pakistan: 0x0f3607,
  olivine: 0xb2c794,
  chocolate: 0x4b1b21
};

export const createFloatingMeshes = (count: number = 20): THREE.Mesh[] => {
  const meshes: THREE.Mesh[] = [];
  const geometryTypes: GeometryConfig['type'][] = ['box', 'sphere', 'cone', 'octahedron', 'tetrahedron'];
  const colors = Object.values(portfolioColors);
  
  for (let i = 0; i < count; i++) {
    const meshConfig: MeshConfig = {
      geometry: {
        type: geometryTypes[Math.floor(Math.random() * geometryTypes.length)],
        size: 0.3 + Math.random() * 0.4
      },
      material: {
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.2 + Math.random() * 0.3,
        wireframe: Math.random() > 0.5
      },
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ),
      rotation: new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: 0.5 + Math.random() * 1.5
    };
    
    meshes.push(createMesh(meshConfig));
  }
  
  return meshes;
};

export const animateMeshes = (meshes: THREE.Mesh[], time: number): void => {
  meshes.forEach((mesh, index) => {
    mesh.rotation.x += 0.003 + index * 0.0001;
    mesh.rotation.y += 0.005 + index * 0.0001;
    mesh.rotation.z += 0.002 + index * 0.0001;
    
    // Floating motion
    mesh.position.y += Math.sin(time * 2 + index) * 0.002;
    mesh.position.x += Math.cos(time * 1.5 + index) * 0.001;
  });
};

export const createCamera = (aspect: number): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.set(0, 2, 10);
  return camera;
};

export const createRenderer = (canvas?: HTMLCanvasElement): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    canvas 
  });
  
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  return renderer;
};
