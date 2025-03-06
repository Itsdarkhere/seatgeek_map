"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ geojson }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize Mapbox GL JS
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Replace with your token
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#ffffff" }, // White background
          },
        ],
      },
      center: [0, 0],
      zoom: 0,
      interactive: true,
      attributionControl: false, // Remove attribution
      dragRotate: false, // Disable 3D rotation
      touchZoomRotate: false, // Disable touch rotation
      pitchWithRotate: false, // Disable pitch with rotate
      renderWorldCopies: false,
      //   maxZoom: 6,
      coordinates: [
        [-85, 57.375], // Top-left
        [85, 57.375], // Top-right
        [85, -57.375], // Bottom-right
        [-85, -57.375], // Bottom-left
      ],
    });

    map.current.on("load", () => {
      // Add GeoJSON source with raw SVG coordinates
      map.current.addSource("seatmap", {
        type: "geojson",
        data: geojson,
      });

      // Add layer for sections (polygons)
      map.current.addLayer({
        id: "sections",
        type: "fill",
        source: "seatmap",
        filter: ["==", "$type", "Polygon"],
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "fill"], "none"], // If fill is "none"
            "transparent", // Make it transparent
            ["get", "fill"], // Otherwise, use the fill color
          ],
          "fill-opacity": 1,
        },
      });

      // Fit map to SVG bounds after layers are added
      // Fit the map to the bounds of the transformed data
      const bounds = [
        [-180, -90],
        [180, 90],
      ];
      map.current.fitBounds(bounds, { padding: 20 });
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [geojson]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

// Dynamic import to disable SSR
import dynamic from "next/dynamic";
export default dynamic(() => Promise.resolve(Map), { ssr: false });
