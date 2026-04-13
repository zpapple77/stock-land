
<template>
  <div class="info-panel-container card">
    <div v-if="selectedLand" class="selected-detail">
      <h3>项目详情</h3>
      <div class="detail-item">
        <label>项目名称：</label>
        <span>{{ selectedLand.name }}</span>
      </div>
      <div class="detail-item">
        <label>所属区域：</label>
        <span>{{ selectedLand.city }} - {{ selectedLand.district }} - {{ selectedLand.street }}</span>
      </div>
      <div class="detail-item">
        <label>土地面积：</label>
        <span class="highlight">{{ selectedLand.area }} 亩</span>
      </div>
      <div class="detail-item">
        <label>详细地址：</label>
        <span>{{ selectedLand.address }}</span>
      </div>
      <div class="detail-item">
        <label>经纬度：</label>
        <span>{{ selectedLand.longitude }}, {{ selectedLand.latitude }}</span>
      </div>
      <el-button type="primary" size="small" style="margin-top: 10px; width: 100%" @click="store.setSelectedLand(null)">
        返回列表
      </el-button>
    </div>
    
    <div v-else class="list-section">
      <h3>存量用地列表</h3>
      <div class="list-wrapper">
        <div 
          v-for="item in filteredData.slice(0, 100)" 
          :key="item.id" 
          class="list-item"
          @click="store.setSelectedLand(item)"
        >
          <div class="item-name">{{ item.name }}</div>
          <div class="item-info">
            <span>{{ item.area }} 亩</span>
            <span>{{ item.district }}</span>
          </div>
        </div>
        <div v-if="filteredData.length > 100" class="list-footer">
          仅显示前 100 条数据...
        </div>
        <div v-if="filteredData.length === 0" class="empty-list">
          暂无相关数据
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLandStore } from '../store/useLandStore';
import { storeToRefs } from 'pinia';

const store = useLandStore();
const { filteredData, selectedLand } = storeToRefs(store);
</script>

<style scoped>
.info-panel-container {
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
h3 {
  margin: 0;
  padding: 15px;
  background: #f5f7fa;
  color: #1d3a8a;
  font-size: 16px;
  border-bottom: 1px solid #ebeef5;
}
.selected-detail {
  padding: 15px;
}
.detail-item {
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
}
.detail-item label {
  color: #666;
  font-weight: bold;
}
.highlight {
  color: #e6a23c;
  font-weight: bold;
}
.list-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.list-wrapper {
  flex: 1;
  overflow-y: auto;
}
.list-item {
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
}
.list-item:hover {
  background: #f0f5ff;
}
.item-name {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}
.item-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}
.list-footer {
  text-align: center;
  padding: 10px;
  font-size: 12px;
  color: #999;
}
.empty-list {
  text-align: center;
  padding: 30px;
  color: #999;
}
</style>
