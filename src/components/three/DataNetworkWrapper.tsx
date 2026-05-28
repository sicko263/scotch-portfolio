"use client"
import dynamic from "next/dynamic"
const DataNetwork = dynamic(() => import("./DataNetwork"), { ssr: false })
export default function DataNetworkWrapper() {
  return <DataNetwork />
}
