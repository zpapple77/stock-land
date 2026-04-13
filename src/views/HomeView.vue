
<template>
  <div class="home-view">
    <header class="header">
      <div class="logo-text">湖北省存量用地地图展示系统</div>
    </header>
    
    <main class="main-content">
      <FilterPanel />
      
      <div class="content-body">
        <div class="map-section">
          <MapView />
        </div>
        <div class="info-section">
          <InfoPanel />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLandStore } from '../store/useLandStore';
import MapView from '../components/MapView.vue';
import FilterPanel from '../components/FilterPanel.vue';
import InfoPanel from '../components/InfoPanel.vue';

const store = useLandStore();

onMounted(() => {
  store.initData();
});
</script>

<style scoped>
.home-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  overflow: hidden;
}
.header {
  height: 60px;
  background-color: #1d3a8a;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
}
.logo-text {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}
.main-content {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content-body {
  flex: 1;
  display: flex;
  gap: 15px;
  overflow: hidden;
}
.map-section {
  flex: 4;
  height: 100%;
  position: relative;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.info-section {
  flex: 1;
  height: 100%;
  min-width: 300px;
  overflow: hidden;
}
</style>
