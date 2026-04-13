
const cities = {
  '武汉市': {
    '江岸区': ['大智街道', '一七街道', '二七街道'],
    '江汉区': ['民族街道', '花楼街道', '水塔街道'],
    '武昌区': ['积玉桥街道', '粮道街道', '紫阳街道'],
    '洪山区': ['珞南街道', '关山街道', '狮子山街道'],
  },
  '襄阳市': {
    '襄城区': ['真武山街道', '古城街道', '庞公街道'],
    '樊城区': ['屏襄门街道', '定中门街道', '中原街道'],
  },
  '宜昌市': {
    '西陵区': ['西陵街道', '学院街道', '云集街道'],
    '伍家岗区': ['伍家岗街道', '万寿桥街道', '宝塔河街道'],
  },
  '黄冈市': {
    '黄州区': ['赤壁街道', '东湖街道', '禹王街道'],
  },
  '孝感市': {
    '孝南区': ['书院街道', '新华街道', '广场街道'],
  }
};

const cityCoords = {
  '武汉市': [114.3055, 30.5928],
  '襄阳市': [112.1224, 32.0085],
  '宜昌市': [111.2908, 30.7026],
  '黄冈市': [114.8724, 30.4539],
  '孝感市': [113.9266, 30.9264],
};

export const getLandData = () => {
  const data = [];
  const cityNames = Object.keys(cities);
  
  for (let i = 1; i <= 2000; i++) {
    const cityName = cityNames[Math.floor(Math.random() * cityNames.length)];
    const districts = Object.keys(cities[cityName]);
    const districtName = districts[Math.floor(Math.random() * districts.length)];
    const streets = cities[cityName][districtName];
    const streetName = streets[Math.floor(Math.random() * streets.length)];
    
    const baseCoord = cityCoords[cityName];
    // Randomize coordinates within a small range around the city center
    const longitude = baseCoord[0] + (Math.random() - 0.5) * 0.2;
    const latitude = baseCoord[1] + (Math.random() - 0.5) * 0.2;
    
    data.push({
      id: `LAND_${i.toString().padStart(4, '0')}`,
      name: `${cityName}${districtName}存量用地项目-${i}`,
      longitude: parseFloat(longitude.toFixed(6)),
      latitude: parseFloat(latitude.toFixed(6)),
      area: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      city: cityName,
      district: districtName,
      street: streetName,
      address: `湖北省${cityName}${districtName}${streetName}${i}号`
    });
  }
  
  return Promise.resolve(data);
};

export const getAdminDivisions = () => {
  return Promise.resolve(cities);
};
