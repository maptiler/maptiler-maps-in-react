import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Box from "@mui/material/Box";
import React, { useEffect, useRef } from "react";
import configData from "../../config";
import Navbar from "../Navbar/navbar";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geodata = configData.MAPTILER_DATASET_ID;
  const center = { lng: -157.9253, lat: 21.4732 };
  const zoom = 9.79; // 9.79/21.4732/-157.9253
  maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    //map options: https://docs.maptiler.com/sdk-js/api/map/
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.DATAVIZ.LIGHT, //more about map styles: https://docs.maptiler.com/sdk-js/api/map-styles/
      center: [center.lng, center.lat],
      zoom: zoom,
      hash: true,
    });

    //Read more about MapTiler Point Helper: https://docs.maptiler.com/sdk-js/api/helpers/#point
    map.current.on("load", () => {
      maptilersdk.helpers.addPoint(map.current, {
        data: geodata,
        pointColor: maptilersdk.ColorRampCollection.COOL.scale(0, 30),
        property: "minimum_nights",
        pointOpacity: 0.5,
        showLabel: true,
        labelColor: "black",
        // pointRadius: 10,
        // cluster: true,
      });
    });
  }, [center.lng, center.lat, zoom]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Why is Sidebar and navbar in the Map? Watch E3 for explanation */}
      <Navbar />
      <div className="container">
        <div ref={mapContainer} id="map" className="map" />
      </div>
    </Box>
  );
}
