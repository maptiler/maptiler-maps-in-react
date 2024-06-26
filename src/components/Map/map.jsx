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
  const geodata = configData.MAPTILER_DATSET_ID;
  const center = { lng: -157.9253, lat: 21.4732 };
  const [zoom] = useState(9.79); //9.79/21.4732/-157.9253
  maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
      hash: true,
      terrain: true,
    });

    //Read more about MapTiler Point Helper: https://docs.maptiler.com/sdk-js/api/helpers/#point
    map.current.on("load", async () => {
      await maptilersdk.helpers.addPoint(map.current, {
        data: geodata,
        pointColor: maptilersdk.ColorRampCollection.COOL.scale(0, 30),
        property: "minimum_nights",
        pointOpacity: 0.5,
        showLabel: true,
        labelColor: "black",
        // pointRadius: 10,
        cluster: true,
      });
    });

    // new maptilersdk.Marker({ color: "#FF0000" })
    //   .setLngLat([139.7525, 35.6846])
    //   .addTo(map.current);
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
