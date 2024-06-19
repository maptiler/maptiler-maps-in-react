# Maps in React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The main branch's code shows a basic example of a map with a marker and navbar using React and MapTiler SDK. This is described step-by-step at https://docs.maptiler.com/react/. The only difference is that this repo has the Material UI for the navbar component, which is part of the map component. This repository's branches show code changes that correspond to the [MapTiler react video series]().

**Get your MAPTILER_CLOUD_API_KEY** to make this code work: https://cloud.maptiler.com/account/keys/ You can create it for free!

Learn more about [MapTiler SDK](https://docs.maptiler.com/sdk-js/) and [MapTiler Cloud](https://www.maptiler.com/cloud/), where you can get your basemap and store your data.

## get started

1. clone this repo

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
   If you don't have an API KEY you can create it for **FREE** at https://www.maptiler.com/cloud/

5. Start your local environment

```sh
  npm run dev
```

6. You will find your app on the address http://localhost:5173/. Now, you should see the map in your browser.

## Episode specific

#### E1 - Map in react js with geojson data

add custom geojson data to a react map with SDK helpers
read more about MapTilerSDK point helpers: https://docs.maptiler.com/sdk-js/api/helpers/#point
[data from USGS](https://earthquake.usgs.gov/earthquakes/search/#%7B%22mapposition%22%3A%5B%5B-55.17887%2C178.24219%5D%2C%5B81.99694%2C349.27734%5D%5D%2C%22autoUpdate%22%3A%5B%22autoUpdate%22%5D%2C%22feed%22%3A%22undefined_undefined%22%2C%22listFormat%22%3A%22default%22%2C%22restrictListToMap%22%3A%5B%5D%2C%22sort%22%3A%22newest%22%2C%22basemap%22%3A%22grayscale%22%2C%22overlays%22%3A%5B%22plates%22%5D%2C%22distanceUnit%22%3A%22km%22%2C%22timezone%22%3A%22utc%22%2C%22viewModes%22%3A%5B%22list%22%2C%22settings%22%2C%22map%22%5D%2C%22event%22%3Anull%2C%22search%22%3Anull%7D)

#### E2 - Map in React js with heatmap

MapTilerSDK heatmap helpers: https://docs.maptiler.com/sdk-js/api/helpers/#heatmap

#### E3 - Map in React js with popup and sidebar

Material UI: https://mui.com/core/

#### E4 - Map in React js with geocoding control

download MapTiler geocoding control from npm: https://www.npmjs.com/package/@maptiler/geocoding-control

open the terminal on the my-react-map folder

- npm i @maptiler/geocoding-control
- npm install
- npm run dev //to start your map app
  geocoding API reference https://docs.maptiler.com/client-js/geocoding/

#### E5 - 3D Map in React js with geocoding control

Enable/disable map terrain programmatically https://docs.maptiler.com/sdk-js/examples/map-terrain/

## Build with

[Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)  
[MapTiler SDK JS](https://docs.maptiler.com/sdk-js/)  
[MUI](https://mui.com/material-ui/)  
