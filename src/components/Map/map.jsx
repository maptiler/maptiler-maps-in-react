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
  const zoom = 9.79; //9.79/21.4732/-157.9253
  maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;
  const [heatmapLayer, setHeatmapLayer] = useState("");
  const [pointLayer, setPointLayer] = useState("");
  const [pointLabels, setPointLabels] = useState("");
  const [selectedMapLayer, setSelectedMapLayer] = useState('point') // 'point' or 'heatmap'
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
    map.current.on("load", () => {
      const { heatmapLayerId } = maptilersdk.helpers.addHeatmap(
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
      setMapLoaded(true);
    });

    //Read more about MapTiler Point Helper: https://docs.maptiler.com/sdk-js/api/helpers/#point
    map.current.on("load", () => {
      const { pointLayerId, labelLayerId } = maptilersdk.helpers.addPoint(
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

  }, [center.lng, center.lat, zoom]);

  useEffect(() => {
    if (heatmapLayer && mapLoaded) {
      map.current.setLayoutProperty(
        heatmapLayer,
        "visibility",
        selectedMapLayer === 'heatmap' ? 'visible' : 'none'
      );
    }
  }, [heatmapLayer, selectedMapLayer, mapLoaded]);

  useEffect(() => {
    if (pointLayer && mapLoaded) {
      map.current.setLayoutProperty(pointLayer, "visibility", selectedMapLayer === 'point' ? 'visible' : 'none');
      map.current.setLayoutProperty(pointLabels, "visibility", selectedMapLayer === 'point' ? 'visible' : 'none');
    }
  }, [pointLayer, selectedMapLayer, mapLoaded]);

  const handleVizualizationChnge = () => {
    setSelectedMapLayer(prev => prev === 'point' ? 'heatmap' : 'point')
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
          Change to {selectedMapLayer === 'point' ? 'heatmap' : 'point'}
        </Button>
      </div>
    </Box>
  );
}
