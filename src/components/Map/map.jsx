import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import configData from "../../config";
import Navbar from "../Navbar/navbar";
import Box from "@mui/material/Box";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 139.753, lat: 35.6844 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current);
  }, [center.lng, center.lat, zoom]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <div className="container">
        <div ref={mapContainer} id="map" className="map" />
      </div>
    </Box>
  );
}
