
<template>
  <div class="map-container-wrapper">
    <div id="map-container" class="map-container"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet.markercluster';
import { useLandStore } from '../store/useLandStore';
import { storeToRefs } from 'pinia';

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const store = useLandStore();
const { filteredData, selectedLand } = storeToRefs(store);

let map = null;
let clusterGroup = null;

const initMap = () => {
  // Center: Hubei Province [30.6, 114.3]
  map = L.map('map-container').setView([30.6, 114.3], 7);

  // Add OpenStreetMap tile layer (Free & Open Source)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  clusterGroup = L.markerClusterGroup();
  map.addLayer(clusterGroup);

  renderMarkers();
};

const renderMarkers = () => {
  if (!map || !clusterGroup) return;

  clusterGroup.clearLayers();

  const markers = filteredData.value.map(item => {
    // Note: Leaflet uses [latitude, longitude]
    const marker = L.marker([item.latitude, item.longitude]);
    
    const popupContent = `
      <div class="info-window">
        <h4>${item.name}</h4>
        <p><b>面积:</b> ${item.area} 亩</p>
        <p><b>地址:</b> ${item.address}</p>
      </div>
    `;
    
    marker.bindPopup(popupContent);
    
    marker.on('click', () => {
      store.setSelectedLand(item);
    });

    return marker;
  });

  clusterGroup.addLayers(markers);
};

const showPopup = (data) => {
  if (!map || !data) return;
  
  // Find marker in cluster or just open popup at location
  map.setView([data.latitude, data.longitude], 15);
  
  const popupContent = `
    <div class="info-window">
      <h4>${data.name}</h4>
      <p><b>面积:</b> ${data.area} 亩</p>
      <p><b>地址:</b> ${data.address}</p>
    </div>
  `;
  
  L.popup()
    .setLatLng([data.latitude, data.longitude])
    .setContent(popupContent)
    .openOn(map);
};

watch(filteredData, () => {
  renderMarkers();
});

watch(selectedLand, (newVal) => {
  if (newVal && map) {
    showPopup(newVal);
  }
});

onMounted(() => {
  // Use nextTick to ensure the container is ready
  nextTick(() => {
    initMap();
  });
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
.map-container-wrapper {
  width: 100%;
  height: 100%;
}
.map-container {
  width: 100%;
  height: 100%;
  z-index: 1; /* Important for Leaflet */
}

/* Sync styles with InfoWindow from AMap */
:deep(.info-window) {
  padding: 5px;
  max-width: 250px;
}
:deep(.info-window h4) {
  margin: 0 0 10px 0;
  color: #1d3a8a;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-size: 16px;
}
:deep(.info-window p) {
  margin: 5px 0;
  font-size: 14px;
}
</style>
