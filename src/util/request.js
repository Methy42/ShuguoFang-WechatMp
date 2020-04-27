const baseUrl = uni.system_config.baseUrl;

const service = {
  mainApi: (option) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + option.url,
        method: option.method,
        data: option.data,
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  }
}

export default service
