# Maps in React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The main branch's code shows a basic example of a map with a marker and navbar using React and MapTiler SDK. (MapTiler SDK extends MapLibre GL JS with functions related to the MapTiler mapping platform.)
Repository branches show code changes corresponding to the [MapTiler react video series]().

**Get your MAPTILER_CLOUD_API_KEY** to make this code work: https://cloud.maptiler.com/account/keys/ You can create it for free!

You can learn more about [MapTiler SDK.](https://docs.maptiler.com/sdk-js/)   
Find out more about [MapTiler Cloud](https://www.maptiler.com/cloud/) - where you can get your basemaps and store your mapping data.

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

Here is the step-by-step guide for creating a state in the main branch: https://docs.maptiler.com/react/. The only difference is that this repo has the Material UI for the navbar component, which is part of the map component.

#### E1 - Map in react js with geojson data, points, and clusters

add custom geojson data to a react map with SDK helpers
read more about MapTilerSDK point helpers: https://docs.maptiler.com/sdk-js/api/helpers/#point

You can find geojson data used in tutorial videos in the assets folder

#### E2 - Map in React js with heatmap and visualization switcher

MapTiler SDK heatmap helpers: https://docs.maptiler.com/sdk-js/api/helpers/#heatmap

MapTiler SDK Color Ramp: https://docs.maptiler.com/sdk-js/api/color-ramp/

#### E3 - Map in React js with popup and sidebar

Material UI: https://mui.com/core/
MUI sidebar examples: https://mui.com/material-ui/react-drawer/

#### E4 - Map in React js with geocoding control

download MapTiler geocoding control from npm: https://www.npmjs.com/package/@maptiler/geocoding-control

Open the terminal on the my-react-map folder

- npm i @maptiler/geocoding-control
- npm install
- npm run dev //to start your map app
  geocoding API reference https://docs.maptiler.com/client-js/geocoding/

#### E5 - 3D Map in React js

Enable/disable map terrain programmatically: https://docs.maptiler.com/sdk-js/examples/map-terrain/

## Build with

[Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)  
[MapTiler SDK JS](https://docs.maptiler.com/sdk-js/)  
[MUI](https://mui.com/material-ui/)
