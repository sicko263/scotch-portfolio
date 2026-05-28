"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

function latLon(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

const SADC_CITIES = [
  [-17.83, 31.05], [-20.15, 28.58], [-25.74, 28.18],
  [-15.42, 28.28], [-13.96, 33.79], [-13.25, 34.30],
  [-8.90, 13.18], [-4.32, 15.32], [-11.70, 27.47],
  [-29.31, 27.49], [-26.31, 31.14], [-22.56, 17.07],
  [-18.92, 47.54], [6.37, 2.39], [-1.29, 36.82],
]

function Globe() {
  const groupRef = useRef<THREE.Group>(null!)
  const pulseRef = useRef<THREE.Mesh>(null!)
  const t = useRef(0)

  const gridGeo = useMemo(() => {
    const verts: number[] = []
    const r = 2
    // latitude circles
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lon = 0; lon < 360; lon += 2) {
        const a = latLon(lat, lon, r), b = latLon(lat, lon + 2, r)
        verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    // meridians
    for (let lon = 0; lon < 360; lon += 20) {
      for (let lat = -88; lat < 90; lat += 2) {
        const a = latLon(lat, lon, r), b = latLon(lat + 2, lon, r)
        verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])

  const equatorGeo = useMemo(() => {
    const verts: number[] = []
    const r = 2.01
    for (let lon = 0; lon < 360; lon += 1) {
      const a = latLon(0, lon, r), b = latLon(0, lon + 1, r)
      verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    // tropic of capricorn (passes through Zimbabwe)
    for (let lon = 0; lon < 360; lon += 1) {
      const a = latLon(-23.5, lon, r), b = latLon(-23.5, lon + 1, r)
      verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])

  const orbitGeo = useMemo(() => {
    const verts: number[] = []
    const r = 2.65
    for (let i = 0; i <= 360; i += 2) {
      const a = (i * Math.PI) / 180, b = ((i + 2) * Math.PI) / 180
      verts.push(r * Math.cos(a), r * 0.28, r * Math.sin(a))
      verts.push(r * Math.cos(b), r * 0.28, r * Math.sin(b))
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])

  const cityGeo = useMemo(() => {
    const pos: number[] = []
    SADC_CITIES.forEach(([lat, lon]) => {
      const v = latLon(lat, lon, 2.04)
      pos.push(v.x, v.y, v.z)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [])

  const zwPos = useMemo(() => latLon(-17.83, 31.05, 2.06), [])
  const zwPos2 = useMemo(() => latLon(-17.83, 31.05, 2.07), [])

  useFrame((_, delta) => {
    t.current += delta
    if (groupRef.current) groupRef.current.rotation.y += 0.0018
    if (pulseRef.current) {
      const s = 1 + Math.sin(t.current * 2.5) * 0.6
      pulseRef.current.scale.setScalar(s)
      ;(pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.55 - Math.sin(t.current * 2.5) * 0.25
    }
  })

  return (
    <group ref={groupRef} rotation={[0.15, -0.5, 0]}>
      {/* Dark core */}
      <mesh>
        <sphereGeometry args={[1.97, 64, 64]} />
        <meshBasicMaterial color="#05060C" />
      </mesh>

      {/* Lat/lon grid */}
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#7C3AFF" transparent opacity={0.2} />
      </lineSegments>

      {/* Equator + Tropic of Capricorn */}
      <lineSegments geometry={equatorGeo}>
        <lineBasicMaterial color="#06D6F0" transparent opacity={0.55} />
      </lineSegments>

      {/* SADC city dots */}
      <points geometry={cityGeo}>
        <pointsMaterial color="#06D6F0" size={0.055} transparent opacity={0.9} sizeAttenuation />
      </points>

      {/* Zimbabwe / Harare pin */}
      <mesh position={zwPos.toArray() as [number, number, number]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#FF9F0A" />
      </mesh>

      {/* Pulsing glow around pin */}
      <mesh ref={pulseRef} position={zwPos2.toArray() as [number, number, number]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color="#FF9F0A" transparent opacity={0.35} />
      </mesh>

      {/* Satellite orbital ring */}
      <lineSegments geometry={orbitGeo}>
        <lineBasicMaterial color="#06D6F0" transparent opacity={0.18} />
      </lineSegments>

      {/* Inner atmosphere */}
      <mesh>
        <sphereGeometry args={[2.07, 64, 64]} />
        <meshBasicMaterial color="#7C3AFF" transparent opacity={0.035} side={THREE.BackSide} />
      </mesh>
      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[2.28, 64, 64]} />
        <meshBasicMaterial color="#06D6F0" transparent opacity={0.012} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export default function HeroGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Stars radius={180} depth={60} count={4500} factor={4} saturation={0} fade speed={0.25} />
      <Globe />
    </Canvas>
  )
}
