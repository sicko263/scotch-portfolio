"use client"
import dynamic from "next/dynamic"
const SpatialGrid = dynamic(() => import("./SpatialGrid"), { ssr: false })
export default function SpatialGridWrapper() {
  return <SpatialGrid />
}
