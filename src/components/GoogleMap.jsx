import { useEffect, useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

// eslint-disable-next-line react/prop-types
function GoogleMap({ latLonList }) {
  const ref = useRef(null);

  useEffect(() => {
    //구글 지도 객체를 생성 , ref.current는 useRef 훅을 참조한 DOM요소
    const map = new window.google.maps.Map(ref.current, {
      center: { lat: 36.48, lng: 127.29 },
      zoom: 13,
    });

    //  마커 클릭시 사용되는 정보창 열기 위한 객체
    // eslint-disable-next-line no-undef
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // 레이블 구분을 위해 / 여러 마커를 구분하기 위해 필요 / 일반적으로 알파벳으로 표현
    const labels = "";

    // 마커를 저장할 배열
    const markers = [];

    // forEach 는 js의 배열 메서드로 배열의 각 요소에 대해 한 번씩 지정된 함수를
    // 실행하는데 사용된다. 반복문처럼 배열의 각 요소 순환, 콜백 함수로 전달된 작업 수행
    // eslint-disable-next-line react/prop-types
    latLonList.forEach((location, i) => {
      const label = labels[i % labels.length]; // labels.length는 레이블 문자열의 길이
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lon },
        label: label,
        map: map,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(`Marker: ${label}`);
        infoWindow.open(map, marker);
      });

      markers.push(marker); // 마커를 markers 배열에 추가
    });

    // MarkerClusterer를 사용하여 마커 클러스터링
    new MarkerClusterer({ markers: markers, map: map });
    //new MarkerClusterer({ markers, map }); 이렇게 해도된다.
  }, [latLonList]);
  //latLonList가 변경될 때마다 해당 useEffect의 콜백 함수가 실행 , 효과 실행조건

  return (
    <div ref={ref} id="map" style={{ width: "450px", height: "400px" }}></div>
  );
}
export default GoogleMap;
