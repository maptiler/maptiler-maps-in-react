import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import configData from "../../config";
import Navbar from "../Navbar/navbar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geodata = configData.MAPTILER_DATSET_ID;
  const center = { lng: -157.9253, lat: 21.4732 };
  const [zoom] = useState(9.79); //9.79/21.4732/-157.9253
  maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;
  const [buttonText, setButtonText] = useState("Change to heatmap");
  const [heatmapLayer, setHeatmapLayer] = useState("");
  const [pointLayer, setPointLayer] = useState("");
  const [pointLabels, setPointLabels] = useState("");
  const [pointVisibility, setPointVisibility] = useState("visible");
  const [heatmapVisibility, seHeatmapVisibility] = useState("none");
  const [mapLoaded, setMapLoaded] = useState(false);

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

    //Read more about MapTiler Heatmap Helper: https://docs.maptiler.com/sdk-js/api/helpers/#heatmap
    map.current.on("load", async () => {
      const { heatmapLayerId } = await maptilersdk.helpers.addHeatmap(
        map.current,
        {
          data: geodata,
          property: "minimum_nights",
          weight: [
            { propertyValue: 1, value: 1 },
            { propertyValue: 30, value: 0 },
          ],
          radius: [
            { propertyValue: 1, value: 60 },
            { propertyValue: 30, value: 0 },
          ],
        }
      );
      setHeatmapLayer(heatmapLayerId);
    });

    //Read more about MapTiler Point Helper: https://docs.maptiler.com/sdk-js/api/helpers/#point
    map.current.on("load", async () => {
      const { pointLayerId, labelLayerId } = await maptilersdk.helpers.addPoint(
        map.current,
        {
          data: geodata,
          pointColor: maptilersdk.ColorRampCollection.COOL.scale(0, 30),
          property: "minimum_nights",
          pointOpacity: 0.5,
          showLabel: true,
          labelColor: "black",
          // pointRadius: 10,
          // cluster: true,
        }
      );
      setPointLabels(labelLayerId);
      setPointLayer(pointLayerId);
      setMapLoaded(true);
    });

    // Add marker read more about markers https://docs.maptiler.com/sdk-js/api/markers/#marker
    // new maptilersdk.Marker({ color: "#FF0000" })
    //   .setLngLat([139.7525, 35.6846])
    //   .addTo(map.current);
  }, [center.lng, center.lat, zoom]);

  useEffect(() => {
    if (heatmapLayer && mapLoaded) {
      map.current.setLayoutProperty(
        heatmapLayer,
        "visibility",
        heatmapVisibility
      );
    }
  }, [heatmapLayer, heatmapVisibility, mapLoaded]);

  useEffect(() => {
    if (pointLayer && mapLoaded) {
      map.current.setLayoutProperty(pointLayer, "visibility", pointVisibility);
      map.current.setLayoutProperty(pointLabels, "visibility", pointVisibility);
    }
  }, [pointLayer, pointVisibility, mapLoaded]);

  const handleVizualizationChnge = () => {
    if (buttonText == "Change to heatmap") {
      setButtonText("Change to points");
      setPointVisibility("none");
      seHeatmapVisibility("visible");
    } else {
      setButtonText("Change to heatmap");
      setPointVisibility("visible");
      seHeatmapVisibility("none");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <div className="container">
        <div ref={mapContainer} id="map" className="map" />
        <Button
          variant="contained"
          className="btn"
          sx={{ top: 20, left: 10 }}
          onClick={handleVizualizationChnge}
        >
          {buttonText}
        </Button>
      </div>
    </Box>
  );
}
