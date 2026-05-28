"use client"
import dynamic from "next/dynamic"
const ContactGlobe = dynamic(() => import("./ContactGlobe"), { ssr: false })
export default function ContactGlobeWrapper() {
  return <ContactGlobe />
}
