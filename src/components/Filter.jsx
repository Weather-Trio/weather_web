import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cityJS from '../OWAdata.js';

const Filter = () => {
  // 최종 정보를 담을 상태 변수로 final 배열과 weatherConditions 배열을 선언
  const [final, setFinal] = useState([]);
  const [weatherConditions, setWeatherConditions] = useState([]);

  // cityJS 파일에서 도시 이름들을 추출
  const cityName = cityJS.map((city) => city.name);

  // 도시 정보를 가져오는 비동기 함수 정의
  const cityTest = async () => {
    // 도시 이름, 온도, 날씨만있는 최종 결과를 저장할 임시 배열 선언
    const cityFinal = [];

    // 각 도시 이름에 대한 정보를 가져오는 비동기 요청
    for (const name of cityName) {
      try {
        const res = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e0c9356d1aa62f18f8c38860ccba9e2b`
        );

        // 켈빈을 섭씨로 변환
        const realTemp = parseInt(res.data.main.temp - 273.15);
        // 도시 이름, 섭씨 온도, 날씨 정보를 tempFinal 배열에 추가
        cityFinal.push([res.data.name, realTemp, res.data.weather[0].main]);
      } catch (error) {
        console.error('데이터 가져오기 실패 : ', error);
      }
    }

    // tempFinal 배열을 상태 변수로 설정
    setFinal(cityFinal);
    console.log(final);

    // final 배열에서 날씨 정보만 추출하여 weatherConditions 상태 변수로 설정
    const weatherConditions = final.map((cityTemp) => cityTemp[2]);
    setWeatherConditions(weatherConditions);
  };

  function changeValue() {
    const temp = document.getElementById('temp').value;
    console.log(temp);
  }

  // 컴포넌트가 마운트될 때 cityTest 함수를 실행
  useEffect(() => {
    cityTest();
  }, []);

  return (
    <div>
      <span>Filters</span>
      <select id='temp' onChange={changeValue}>
        <option name='temp' value='temp_default'>
          온도 순
        </option>
        <option name='temp' value='high'>
          높은 순
        </option>
        <option name='temp' value='low'>
          낮은 순
        </option>
      </select>
      <select id='weather'>
        <option name='weather' value='weather_default'>
          날씨 순
        </option>
        {[...new Set(weatherConditions)].map((condition, index) => (
          <option key={index}>{condition}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
