
import { defineStore } from 'pinia';
import { getLandData, getAdminDivisions } from '../services/dataService';

export const useLandStore = defineStore('land', {
  state: () => ({
    rawData: [],
    filteredData: [],
    adminDivisions: {},
    filters: {
      city: '',
      district: '',
      street: ''
    },
    selectedLand: null,
    loading: false
  }),
  
  getters: {
    cities: (state) => Object.keys(state.adminDivisions),
    districts: (state) => {
      if (!state.filters.city) return [];
      return Object.keys(state.adminDivisions[state.filters.city] || {});
    },
    streets: (state) => {
      if (!state.filters.city || !state.filters.district) return [];
      return state.adminDivisions[state.filters.city][state.filters.district] || [];
    }
  },
  
  actions: {
    async initData() {
      this.loading = true;
      try {
        const [data, divisions] = await Promise.all([
          getLandData(),
          getAdminDivisions()
        ]);
        this.rawData = data;
        this.adminDivisions = divisions;
        this.applyFilters();
      } finally {
        this.loading = false;
      }
    },
    
    setFilter(key, value) {
      this.filters[key] = value;
      // Clear sub-filters when parent filter changes
      if (key === 'city') {
        this.filters.district = '';
        this.filters.street = '';
      } else if (key === 'district') {
        this.filters.street = '';
      }
      this.applyFilters();
    },
    
    applyFilters() {
      this.filteredData = this.rawData.filter(item => {
        return (
          (!this.filters.city || item.city === this.filters.city) &&
          (!this.filters.district || item.district === this.filters.district) &&
          (!this.filters.street || item.street === this.filters.street)
        );
      });
    },
    
    setSelectedLand(land) {
      this.selectedLand = land;
    }
  }
});
