
<template>
  <div class="filter-panel card">
    <el-form :inline="true" class="filter-form">
      <el-form-item label="市">
        <el-select 
          :model-value="store.filters.city" 
          placeholder="选择市" 
          clearable 
          @change="v => store.setFilter('city', v)"
        >
          <el-option v-for="city in cities" :key="city" :label="city" :value="city" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="区">
        <el-select 
          :model-value="store.filters.district" 
          placeholder="选择区" 
          clearable 
          :disabled="!store.filters.city"
          @change="v => store.setFilter('district', v)"
        >
          <el-option v-for="district in districts" :key="district" :label="district" :value="district" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="街道">
        <el-select 
          :model-value="store.filters.street" 
          placeholder="选择街道" 
          clearable 
          :disabled="!store.filters.district"
          @change="v => store.setFilter('street', v)"
        >
          <el-option v-for="street in streets" :key="street" :label="street" :value="street" />
        </el-select>
      </el-form-item>
      
      <div class="stats">
        共找到 <b>{{ filteredData.length }}</b> 个项目
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { useLandStore } from '../store/useLandStore';
import { storeToRefs } from 'pinia';

const store = useLandStore();
const { cities, districts, streets, filteredData } = storeToRefs(store);
</script>

<style scoped>
.filter-panel {
  padding: 15px;
  background: white;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.filter-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.el-form-item {
  margin-bottom: 0 !important;
  margin-right: 20px;
}
.el-form-item :deep(.el-select) {
  width: 180px;
}
.stats {
  margin-left: auto;
  font-size: 14px;
  color: #666;
}
.stats b {
  color: #1d3a8a;
  font-size: 18px;
}
</style>
