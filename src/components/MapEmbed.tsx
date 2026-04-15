"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

const PROJECTS = [
  {
    name: "CBZ GIS Mortgage System",
    desc: "National banking · Live in production",
    lat: -17.829,
    lng: 31.052,
    color: "#7C3AFF",
  },
  {
    name: "Zimbabwe eCadastre",
    desc: "National land records · zimcadastre.co.zw",
    lat: -17.86,
    lng: 31.02,
    color: "#7C3AFF",
  },
  {
    name: "Land Information System",
    desc: "Ministry of Agriculture · National scale",
    lat: -17.80,
    lng: 31.08,
    color: "#06D6F0",
  },
  {
    name: "POTRAZ Monitoring System",
    desc: "Regulatory authority · 3 systems",
    lat: -17.75,
    lng: 31.05,
    color: "#06D6F0",
  },
  {
    name: "Investor Hosting — Radar Holdings",
    desc: "Spatially-enabled investment intelligence",
    lat: -17.84,
    lng: 31.14,
    color: "#FF9F0A",
  },
  {
    name: "SADC Artisanal Mining Mapping",
    desc: "8 countries · Southern Africa",
    lat: -21.5,
    lng: 29.8,
    color: "#06D6F0",
  },
  {
    name: "ZRBF Spatial Data Warehouses",
    desc: "10+ Rural District Councils · Climate resilience",
    lat: -18.92,
    lng: 29.82,
    color: "#7C3AFF",
  },
  {
    name: "COVID-19 Response Dashboard",
    desc: "Ministry of Health and Child Care · National",
    lat: -17.82,
    lng: 31.045,
    color: "#FF9F0A",
  },
  {
    name: "LULC Change & River Turbidity",
    desc: "Remote sensing · Watershed analytics",
    lat: -18.2,
    lng: 31.6,
    color: "#06D6F0",
  },
  {
    name: "OpenStreetMap — Active Contributor",
    desc: "Zimbabwe · Humanitarian mapping",
    lat: -19.0154,
    lng: 29.1549,
    color: "#7C3AFF",
  },
]

function makeIcon(L: typeof import("leaflet"), color: string) {
  return L.divIcon({
    html: `<div style="
      width: 10px;
      height: 10px;
      background: ${color};
      border: 1.5px solid ${color === "#7C3AFF" ? "#A78BFA" : color === "#06D6F0" ? "#67E8F9" : "#FCD34D"};
      border-radius: 50%;
      box-shadow: 0 0 10px ${color}99, 0 0 20px ${color}55;
    "></div>`,
    className: "",
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -8],
  })
}

export default function MapEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import("leaflet").Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: [-19.5, 30.5],
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      })

      mapRef.current = map

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map)

      PROJECTS.forEach((p) => {
        L.marker([p.lat, p.lng], { icon: makeIcon(L, p.color) })
          .bindPopup(
            `<div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:180px;padding:4px 2px">
              <div style="font-weight:600;font-size:13px;color:#F0F0FA;margin-bottom:4px;font-family:'Space Grotesk',sans-serif">${p.name}</div>
              <div style="font-size:12px;color:#8B8FA8">${p.desc}</div>
            </div>`,
            { maxWidth: 220 }
          )
          .addTo(map)
      })
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-[440px] rounded-[20px] overflow-hidden border border-border"
      aria-label="Map of Zimbabwe showing project locations"
    />
  )
}
