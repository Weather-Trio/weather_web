import React, { useEffect } from 'react';
import axios from 'axios';
import cityJS from '../OWAdata.js';

const Filter = () => {
  const cityName = cityJS.map((city) => city.name);
  console.log(cityName);

  const cityInfo = [];
  const final = [];

  const cityTest = () => {
    cityName.map((name) =>
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e0c9356d1aa62f18f8c38860ccba9e2b`
        )
        .then((res) => {
          cityInfo.push(res.data);

          const realTemp = parseInt(res.data.main.temp - 273.15);
          final.push([res.data.name, realTemp, res.data.weather[0].main]);
        })
        .catch((error) => {
          console.error('데이터 가져오기 실패 : ', error);
        })
    );
    console.log(cityInfo);
    console.log(final);
  };

  useEffect(() => {
    cityTest();
  });

  return (
    <div>
      <span>Filters</span>
      <select>
        <option value='select'>온도 순</option>
        {final.map((cityTemp, index) => (
          <option key={index}>{cityTemp[index][2]}</option>
        ))}
      </select>
      <select>
        <option value='select'>날씨 순</option>
        <option>맑음</option>
        <option>Clouds</option>
      </select>
    </div>
  );
};
export default Filter;
