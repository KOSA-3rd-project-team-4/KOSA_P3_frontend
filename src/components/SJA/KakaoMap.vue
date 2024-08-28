<template>
    <div class="mapContainer">
        <div class="filterBtn">
            <button type="button" @click="filterBtnClick">filter</button>
        </div>
        <div class="map">
            <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" @onLoadKakaoMap="onLoadKakaoMap">
                <KakaoMapMarker
                    v-for="(marker, idx) in markerList"
                    :key="idx"
                    :lat="marker.lat"
                    :lng="marker.lng"
                    :clickable="true"
                    @onClickKakaoMapMarker="onClickKakaoMapMarker(idx)"
                />
                <KakaoMapCustomOverlay
                    v-for="(marker, idx) in markerList"
                    :key="idx"
                    :lat="marker.lat"
                    :lng="marker.lng"
                    :yAnchor="1.4"
                    :visible="overlayStates[idx]"
                >
                        <div
                            id="kakao-map-custom-overlay"
                            style="
                                padding: 10px;
                                background-color: white;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                            "
                            @click="openModal"
                        >
                            <div style="font-weight: bold; margin-bottom: 5px; display: flex">
                                카페 카카오
                                <div
                                    style="
                                        position: absolute;
                                        top: 10px;
                                        right: 10px;
                                        color: #888;
                                        width: 17px;
                                        height: 17px;
                                        background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
                                    "
                                    @click="closeOverlay(idx, $event)"
                                    title="닫기"
                                ></div>
                            </div>
                            <div style="display: flex">
                                <div style="margin-right: 10px">
                                    <img
                                        src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png"
                                        width="73"
                                        height="70"
                                    />
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: flex-start">
                                    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                                        카페 파트타임
                                    </div>
                                    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                                        11:00 ~ 13:00
                                    </div>
                                    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                                        시급: 10,000 원
                                    </div>
                                </div>
                            </div>
                        </div>
                </KakaoMapCustomOverlay>
            </KakaoMap>
        </div>
    </div>
    <ModalCompo :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler">
        <template #header>Custom header</template>
        <template #content>Custom content</template>
        <template #footer>Custom content</template>
    </ModalCompo>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { KakaoMap, KakaoMapMarker, KakaoMapCustomOverlay } from 'vue3-kakao-maps';
import ModalCompo from './ModalCompo.vue';
import markerImageSrc from '../../assets/images/red_dot.png';

const kakaoMapRef = ref(null);

const markerList = ref([]);

const coordinate = ref({
    lat: 0,
    lng: 0,
});

const fetchMarkerList = () => {
    // 전체 마커 조회
    // try {
    //     axios.get('http://localhost:8080/query/bizannouncement/select/all')
    //         .then(response => {
    //             const data = response.data;
    //             if (data === null) {
    //                 throw new Error("Data Not Found");
    //             }
    //             data.map(el => {
    //                 markerList.value.push({ lat: el.work_pos_latitude, lng: el.work_pos_longitude })
    //             })
    //         })
    //         .catch(err => {
    //             // TODO: 커밋할 때 삭제하기
    //             // console.log('failed')
    //             // console.log(JSON.stringify(err))
    //         });
    // } catch (e) {
    //     console.log(e);
    // }

    try {
        axios.get('http://localhost:8080/location', {
            params: {
                latitude: coordinate.value.lat,
                longitude: coordinate.value.lng,
                radius: 5.0,
            },
            // withCredentials: true
        })
            .then(response => {
                console.log(JSON.stringify(response));
                // if (data === null) {
                //     throw new Error("Data Not Found");
                // }
                // data.map(el => {
                //     markerList.value.push({ lat: el.work_pos_latitude, lng: el.work_pos_longitude })
                // })
            })
            .catch(err => {
                // TODO: 커밋할 때 삭제하기
                console.log('failed')
                console.log(JSON.stringify(err))
            });
    } catch (e) {
        console.log(e);
    }
};

const getLocation = () => {
    kakao.maps.event.addListener(kakaoMapRef.value, 'click', function (mouseEvent) {
        const latlng = mouseEvent.latLng;

        console.log(`클릭한 위치의 위도는 ${latlng.getLat()} 이고,`);
        console.log(`경도는 ${latlng.getLng()} 입니다`);
        console.log(JSON.stringify(markerList.value));
    });
}

const onLoadKakaoMap = (mapRef) => {
    kakaoMapRef.value = mapRef;
    kakao.maps.event.addListener(kakaoMapRef.value, 'tilesloaded', setCurrentLocationMarker);
};

const createMarkerImage = () => {
    const imageSize = new kakao.maps.Size(25, 25)
    const imageOptions = {  
                shape: 'circle',
                spriteOrigin: new kakao.maps.Point(0, 0),
                spriteSize: new kakao.maps.Size(25, 25),
            };
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize, imageOptions);
    return markerImage;
}

const createMarker = () => {
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(coordinate.value.lat, coordinate.value.lng),
        image: createMarkerImage(),
    });
    
    return marker; 
}

const setCurrentLocationMarker = () => {
    createMarker().setMap(kakaoMapRef.value);
}

const getCurrentPositionPromise = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                },
                (error) => {
                    console.error(error);
                    alert('위치 정보를 가져올 수 없습니다.');
                    reject(error);
                }
            );
        } else {
            alert('브라우저가 Geolocation을 지원하지 않습니다.');
            reject(new Error('Geolocation not supported'));
        }
    });
};

const setCurrentPosition = async () => {
    try {
        const position = await getCurrentPositionPromise();
        coordinate.value.lat = position.coords.latitude;
        coordinate.value.lng = position.coords.longitude;
        console.log(coordinate.value.lat, coordinate.value.lng)
    } catch (error) {
        console.error('Failed to get the position:', error);
    }
};

onMounted(async () => {
    await setCurrentPosition();

    fetchMarkerList();

    overlayStates.value = markerList.value.map(() => false);
});

const overlayStates = ref([]);

const isModalOpened = ref(false);

const openModal = () => {
    isModalOpened.value = true;
};
const closeModal = () => {
    isModalOpened.value = false;
};

const toggleOverlay = (index) => {
    overlayStates.value[index] = !overlayStates.value[index];
};

const closeOverlay = (index, event) => {
    event.stopPropagation();
    overlayStates.value[index] = false;
};

const submitHandler = () => {};

const filterBtnClick = () => {
};

const addMarker = (marker) => {
    const lat = marker.lat;
    const lng = marker.lng;
    markerList.value.push({ lat, lng });
};

const onClickKakaoMapMarker = (index) => {
    toggleOverlay(index);
};
</script>

<style scoped>
.mapContainer {
    display: inline-flex;
    flex-direction: column;
}

.map {
    width: 100%;
    height: 500px;
    justify-content: center;
}

.filterBtn {
    display: flex;
    justify-content: start;
}

.filterBtn button {
    border: 1px solid #d5d9df;
    color: #666c76;
    display: inline-block;
    vertical-align: top;
    width: 79px;
    height: 30px;
    border-radius: 4px;
    background-color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 0.8125rem;
    text-align: center;
    line-height: 28px;
}
</style>
