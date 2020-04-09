const service = {
  mainApi: (option) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: option.url,
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
