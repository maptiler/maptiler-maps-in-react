# Maps in React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The main branch's code shows a basic example of a map with a marker and navbar using React and MapTiler SDK. (MapTiler SDK extends MapLibre GL JS with functions related to the MapTiler mapping platform. The basic concepts of this tutorial also show how to create a React map with MapLibre GL JS). You can find a step-by-step tutorial for it [here](https://docs.maptiler.com/react/sdk-js/get-started-material-ui/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react).

Repository branches show code changes corresponding to the [MapTiler React video series](https://youtube.com/playlist?list=PLGHe6Moaz52Mb9_0qH9mdktsTgkrow9oI&si=2RCT0UU_2ssLyGjN).

**Get your MAPTILER_CLOUD_API_KEY** to make this code work: https://cloud.maptiler.com/account/keys/ You can create it for free!

You can learn more about [MapTiler SDK.](https://docs.maptiler.com/sdk-js/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)  
Find out more about [MapTiler Cloud](https://www.maptiler.com/cloud/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react) - where you can get your basemaps and store your mapping data.

![React map app done with MapTiler SDK](https://github.com/maptiler/maps-in-react/blob/main/assets/final_app.png)

## Get started

1. Clone this repo

```sh
  git clone https://github.com/maptiler/maps-in-react.git my-react-map
```

2. Navigate to the newly created project folder **my-react-map**

```sh
  cd my-react-map
```

3. Install dependencies

```sh
  npm install
```

4. :warning: Open my-react-map/src/config.js and replace **YOUR_MAPTILER_API_KEY_HERE** with your actual [MapTiler API key](https://cloud.maptiler.com/account/keys/).
   If you don't have an API KEY, you can create it for **FREE** at https://www.maptiler.com/cloud/

5. Start your local environment

```sh
  npm run dev
```

6. You will find your app on the address http://localhost:5173/.
   Now, you should see the map in your browser.

## Episode specific instructions

Here is the step-by-step guide for creating a state in the main branch: https://docs.maptiler.com/react/sdk-js/get-started-material-ui/. 

#### E1 - Map in React js with geojson data, points, and clusters

[step-by-step tutorial](https://docs.maptiler.com/react/sdk-js/geojson-points/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)

add custom geojson data to a React map with SDK helpers
read more about **[MapTilerSDK point helper](https://docs.maptiler.com/sdk-js/api/helpers/#point?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react):**

You can find GeoJSON data used in tutorial videos in the assets folder.

#### E2 - Map in React js with heatmap and visualization switcher

[step-by-step tutorial](https://docs.maptiler.com/react/sdk-js/heatmap/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)

**[MapTiler SDK heatmap helper](https://docs.maptiler.com/sdk-js/api/helpers/#heatmap?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)** 
**[MapTiler SDK Color Ramp](https://docs.maptiler.com/sdk-js/api/color-ramp/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)**

#### E3 - Map in React js with popup and sidebar

[step-by-step tutorial](https://docs.maptiler.com/react/sdk-js/popup-sidebar/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)

**Material UI:** https://mui.com/core/
**MUI sidebar examples:** https://mui.com/material-ui/react-drawer/

#### E4 - Map in React js with geocoding control

[step-by-step tutorial](https://docs.maptiler.com/react/sdk-js/geocoding-control/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)

Download MapTiler geocoding control from npm: https://www.npmjs.com/package/@maptiler/geocoding-control

Open the terminal on the my-react-map folder.

- npm i @maptiler/geocoding-control
- npm install
- npm run dev //to start your map app
  [geocoding API reference](https://docs.maptiler.com/client-js/geocoding/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react) 

#### E5 - 3D Map in React js

[step-by-step tutorial](https://docs.maptiler.com/react/sdk-js/3d-map/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)

Enable/disable map terrain programmatically: [https://docs.maptiler.com/sdk-js/examples/map-terrain/](https://docs.maptiler.com/sdk-js/examples/map-terrain/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)

How to find the id of last text map layer?
![how to find layel id](https://github.com/maptiler/maps-in-react/blob/main/assets/layer_id.png)

1. Go to [MapTiler Cloud](https://cloud.maptiler.com/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)
2. Select a map that you want to use as a basemap
3. Customize
4. Go to layer - Verticality and find the last symbol layer
5. Click at the last symbol layer and open JSON editor ( {} )
6. Copy layer id, e.g., "Ocean labels".

How to create a custom map style on MapTiler Cloud: [https://documentation.maptiler.com/hc/en-us/articles/360020805917-How-to-make-custom-map-design-in-MapTiler-Cloud](https://documentation.maptiler.com/hc/en-us/articles/360020805917-how-to-make-custom-map-design-in-maptiler-cloud?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)

## Build with

[Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)  
[MapTiler SDK JS](https://docs.maptiler.com/sdk-js/?utm_medium=social&utm_source=github&utm_campaign=2024%20|%20react)  
[MUI](https://mui.com/material-ui/)
