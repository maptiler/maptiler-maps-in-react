import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import configData from "../../config";
import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import "./map.css";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${250}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

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
  const [selectedMapLayer, setSelectedMapLayer] = useState("heatmap"); // 'point' or 'heatmap'
  const [mapLoaded, setMapLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState();

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.DATAVIZ.LIGHT,
      center: [center.lng, center.lat],
      zoom: zoom,
      hash: true,
      terrain: true,
      terrainControl: true,
    });

    // Find the index of the last symbol layer in the map style
    function getLastLabelId() {
      let layers = map.current.getStyle().layers;
      let LastLabelId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol") {
          LastLabelId = layers[i].id;
          break;
        }
      }
      return LastLabelId;
    }

    map.current.on("terrain", function () {
      if (map.current.hasTerrain()) {
        map.current.easeTo({ pitch: 60, duration: 2000 });
      } else {
        map.current.easeTo({ pitch: 0, duration: 2000 });
      }
    });

    //MapTiler Geocoding API: https://docs.maptiler.com/cloud/api/geocoding/
    const gc = new GeocodingControl({
      limit: 10, // limit resoult number
      country: "us", // limit resoults to united states
      proximity: [{ type: "map-center" }], // resoults closer to map center will be shown first
      types: ["address"],
    });
    map.current.addControl(gc); //here you can also specify position of geocoding conterol .addControl(gc,"top-right")

    //Read more about MapTiler Heatmap Helper: https://docs.maptiler.com/sdk-js/api/helpers/#heatmap
    map.current.on("load", () => {
      const labels = getLastLabelId();
      const { heatmapLayerId } = maptilersdk.helpers.addHeatmap(map.current, {
        beforeId: labels,
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
        colorRamp: maptilersdk.ColorRampCollection.COOL,
      });
      setHeatmapLayer(heatmapLayerId);
      setMapLoaded(true);
    });

    //Read more about MapTiler Point Helper: https://docs.maptiler.com/sdk-js/api/helpers/#point
    map.current.on("load", () => {
      const labels = getLastLabelId();
      const { pointLayerId, labelLayerId } = maptilersdk.helpers.addPoint(
        map.current,
        {
          data: geodata,
          beforeId: labels,
          pointColor: maptilersdk.ColorRampCollection.COOL.scale(0, 30),
          property: "minimum_nights",
          pointOpacity: 0.5,
          showLabel: true,
          labelColor: "black",
          beforeId: labels,
          // pointRadius: 10,
          // cluster: true,
        },
      );

      setPointLabels(labelLayerId);
      setPointLayer(pointLayerId);
      setMapLoaded(true);
    });
  }, [center.lng, center.lat, zoom]);

  useEffect(() => {
    if (mapLoaded) {
      map.current.on("click", pointLayer, (e) => {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let description = e.features[0].properties.name;

        new maptilersdk.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current);

        setClickedItem(e.features[0].properties);
        setOpen(true);
      });
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (heatmapLayer && mapLoaded) {
      map.current.setLayoutProperty(
        heatmapLayer,
        "visibility",
        selectedMapLayer === "heatmap" ? "visible" : "none",
      );
    }
  }, [heatmapLayer, selectedMapLayer, mapLoaded]);

  useEffect(() => {
    if (pointLayer && mapLoaded) {
      map.current.setLayoutProperty(
        pointLayer,
        "visibility",
        selectedMapLayer === "point" ? "visible" : "none",
      );
      map.current.setLayoutProperty(
        pointLabels,
        "visibility",
        selectedMapLayer === "point" ? "visible" : "none",
      );
    }
  }, [pointLayer, selectedMapLayer, mapLoaded]);

  // const handlePointClick = (e) => {
  //   const coordinates = e.feaures[0].geometry.coordinates.slice();
  //   const description = "my first popup";

  //   const newPopup = new maptilersdk.Popup()
  //     .setLngLat(coordinates)
  //     .setHTML(description);
  // };

  const handleVizualizationChnge = () => {
    setSelectedMapLayer((prev) => (prev === "point" ? "heatmap" : "point"));
  };

  //sidevbar handlers

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Sidebar
        handleDrawerClose={handleDrawerClose}
        open={open}
        item={clickedItem}
      />
      <Main open={open}>
        <Button
          variant="contained"
          className="btn"
          sx={{ top: 84, left: 10, zIndex: 10 }}
          onClick={handleVizualizationChnge}
        >
          Change to {selectedMapLayer === "point" ? "heatmap" : "point"}
        </Button>
      </Main>
      <div className="container">
        <div ref={mapContainer} id="map" className="map" />
      </div>
    </Box>
  );
}
