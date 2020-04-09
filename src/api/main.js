import service from '../util/request';
const request = service.mainApi;


export function apiGetBannerList(){
  return request({
    url: '/api/banner',
    method: "get"
  });
}

export function apiGetBannerList(){
  return request({
    url: '/api/banner',
    method: "get"
  });
}