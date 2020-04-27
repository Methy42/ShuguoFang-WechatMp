import service from '@/util/request';
import store from '../store/index';
import filiters from '@/filters';
const request = service.mainApi;

/**
 * 获取当前用户openid
 */
export async function apiLogin() {
  uni.showLoading({
    mask: true,
    title: "正在获取您的授权并登录"
  });
  try {
    const result = await new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          console.log('[login-api]', 'wx login success', res);
          const code = res.code;
          if (!code) {
            reject();
            return;
          }
          wx.getUserInfo({
            success: (res) => {
              console.log('[login-api]', 'wx getUserInfo success', res);
              const userInfo = res.userInfo;
              res.code = code;
              request({
                url: '/user/register',
                method: "POST",
                data: res,
              }).then((res) => {
                console.log('[login-api]', 'user register success', res);
                if (res && res.data && res.data.data) {
                  const openId = res.data.data;
                  store.commit('SetOpenId', openId);
                  store.commit('SetUserInfo', userInfo);
                  resolve(true);
                } else {
                  reject();
                }
              }).catch((error) => {
                reject(error);
              });
            },
            fail: (error) => {
              reject(error);
            }
          });
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
    uni.hideLoading();
    return true;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "登录失败",
      icon: "none"
    });
    return false;
  }
}

/**
 * 获取海报图列表
 */
export async function apiGetBannerList() {
  uni.showLoading({
    mask: true,
    title: "正在获取海报图"
  });
  try {
    let bannerList = [];
    const result = await request({
      url: '/banner/list',
      method: "get"
    });
    result.data.data.records.forEach((banner) => {
      bannerList.push({
        id: banner.id,
        title: banner.bannerName,
        objectId: banner.goods_id,
        objectType: "good",
        imagePath: filiters.common_assets_path(banner.bannerUrl),
        status: banner.status
      });
    });
    uni.hideLoading();
    return bannerList;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "获取海报图失败，\r\n请稍后重试",
      icon: "none"
    });
    return [];
  }

}

/**
 * 获取小店分类
 */
export async function apiGetTypeList() {
  uni.showLoading({
    mask: true,
    title: "正在获取小店分类"
  });
  try {
    let query = {
      'page.current': 1,
      'page.size': 6
    }
    let typeList = [];
    const result = await request({
      url: '/goods/type/list',
      method: "get",
      data: query
    });
    result.data.data.forEach((type) => {
      typeList.push({
        id: type.id,
        name: type.typeName,
        iconPath: uni.system_config.assetsUrl + type.iconUrl,
        status: type.typeStatus
      })
    });
    uni.hideLoading();
    return typeList;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "获取小店分类失败，\r\n请稍后重试",
      icon: "none"
    });
    return [];
  }
}

/**
 * 获取分类详情
 */
export async function apiGetTypeDetail(id) {
  uni.showLoading({
    mask: true,
    title: "正在获取分类详情"
  });
  try {
    let query = {
      'page.current': 1,
      'page.size': 1,
      id
    }
    const result = await request({
      url: '/goods/type/list',
      method: "get",
      data: query
    });
    let type = {
      id: result.data.data[0].id,
      name: result.data.data[0].typeName,
      iconPath: uni.system_config.assetsUrl + result.data.data[0].iconUrl,
      status: result.data.data[0].typeStatus
    };
    uni.hideLoading();
    return type;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "获取小店分类失败，\r\n请稍后重试",
      icon: "none"
    });
    return {};
  }
}

/**
 * 搜索分类下的商品
 */
export async function apiSearchGoodsByType(page, id, name) {
  uni.showLoading({
    mask: true,
    title: "很努力的在搜索"
  });
  try {
    let query = {
      'page.current': page,
      'page.size': 10,
      goodsName: name,
      typeId: id
    }
    let goodList = [];
    const result = await request({
      url: "/goods/list",
      method: "get",
      data: query
    });
    result.data.data.records.forEach(async (good) => {
      let tagList = [];
      try {
        const promoteSalesResult = await request({
          url: "/goods/tags",
          method: "get",
          data: {
            id: good.id
          }
        });
        promoteSalesResult.data.data.forEach((tag, index) => {
          if (index > 2) {
            return;
          }
          tagList.push({
            name: tag
          });
        });
      } catch (error) {

      }
      goodList.push({
        id: good.id,
        name: good.goodsName,
        price: filiters.common_price(good.price),
        unit: good.unit,
        status: good.goodsStatus,
        stock: good.stock,
        imagePath: filiters.common_assets_path(good.imgUrl),
        describe: good.goodsDescribe,
        tags: tagList
      });
    });
    uni.hideLoading();
    return goodList;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "搜索失败，\r\n请稍后重试",
      icon: "none"
    });
    return [];
  }
}

/**
 * 获取活动专题详情
 */
export async function apiGetActivityColumnDetail(id) {
  uni.showLoading({
    mask: true,
    title: "正在获取活动专题"
  });
  try {
    let commodityList = [];
    const result = await request({
      url: '/promote/sales/detail',
      method: "get",
      data: {
        id: id
      }
    });
    result.data.data.forEach(commodity => {
      commodityList.push({
        id: parseInt(commodity.goodsId),
        name: commodity.goodsName,
        price: commodity.price,
        unit: commodity.unit,
        status: commodity.goodsStatus,
        stock: commodity.stock,
        imagePath: filiters.common_assets_path(commodity.imgUrl),
        describe: commodity.describe
      });
    });
    uni.hideLoading();
    return commodityList;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "获取活动专题失败，\r\n请稍后重试",
      icon: "none"
    });
    return [];
  }
}

/**
 * 首页获取活动专题列表
 */
export async function apiGetSpecialTopFiveList() {
  uni.showLoading({
    mask: true,
    title: "正在获取活动专题"
  });
  try {
    let queryData = {
      page: 1,
      size: 5
    };
    let specialList = [];
    const result = await request({
      url: '/promote/sales',
      method: "get",
      // data: queryData
    });
    result.data.data.forEach(async (special) => {
      let goodList = [];
      const goodsResult = await request({
        url: '/promote/sales/detail',
        method: "get",
        data: {
          id: special.id
        }
      });
      goodsResult.data.data.forEach(good => {
        goodList.push({
          id: good.id,
          name: good.goodsName,
          price: good.price,
          unit: good.unit,
          status: good.goodsStatus,
          stock: good.stock,
          imagePath: filiters.common_assets_path(good.imgUrl),
          describe: good.describe
        });
      });
      specialList.push({
        id: special.id,
        name: special.name,
        status: special.specialStatus,
        iconPath: filiters.common_assets_path(special.iconUrl),
        goodList: goodList,
      });
    });
    uni.hideLoading();
    return specialList;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "获取活动专题失败，\r\n请稍后重试",
      icon: "none"
    });
    return [];
  }
}

/**
 * 搜索商品
 */
export async function apiSearchGoods(page, filite) {
  uni.showLoading({
    mask: true,
    title: "很努力的在搜索"
  });
  try {
    let query = {
      'page.current': page,
      'page.size': 8,
      goodsName: filite.name
    }
    let goodList = [];
    const result = await request({
      url: "/goods/list",
      method: "get",
      data: query
    });
    result.data.data.records.forEach(async (good) => {
      let tagList = [];
      const promoteSalesResult = await request({
        url: "/goods/tags",
        method: "get",
        data: {
          id: good.id
        }
      });
      promoteSalesResult.data.data.forEach((tag, index) => {
        if (index > 2) {
          return;
        }
        tagList.push({
          name: tag
        });
      });
      goodList.push({
        id: good.id,
        name: good.goodsName,
        price: filiters.common_price(good.price),
        unit: good.unit,
        status: good.goodsStatus,
        stock: good.stock,
        imagePath: filiters.common_assets_path(good.imgUrl),
        describe: good.goodsDescribe,
        tags: tagList
      });
    });
    uni.hideLoading();
    return goodList;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "搜索失败，\r\n请稍后重试",
      icon: "none"
    });
    return [];
  }
}

/**
 * 获取最新上架的五个商品
 */
export async function apiGetTopFiveCommodity() {
  try {
    let query = {
      'page.current': 1,
      'page.size': 5
    }
    let commodityList = [];
    const result = await request({
      url: "/goods/list",
      method: "get",
      data: query
    });
    result.data.data.records.forEach(async (commodity) => {
      commodityList.push({
        id: commodity.id,
        name: commodity.goodsName,
        price: filiters.common_price(commodity.price),
        unit: commodity.unit,
        status: commodity.goodsStatus,
        stock: commodity.stock,
        imagePath: filiters.common_assets_path(commodity.imgUrl),
        describe: commodity.goodsDescribe
      });
    });
    uni.hideLoading();
    return commodityList;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "搜索失败，\r\n请稍后重试",
      icon: "none"
    });
    return [];
  }
}

/**
 * 获取商品详情
 */
export async function apiGetCommodityDetail(id) {
  uni.showLoading({
    mask: true,
    title: "很努力的在搜索"
  });
  try {
    let query = {
      id
    }
    let tagList = [];
    const commodityResult = await request({
      url: "/goods/detail",
      method: "get",
      data: query
    });

    try {
      const promoteSalesResult = await request({
        url: "/goods/tags",
        method: "get",
        data: {
          id
        }
      });
      promoteSalesResult.data.data.forEach((tag, index) => {
        if (index > 2) {
          return;
        }
        tagList.push({
          name: tag
        });
      });
    } catch (error) {

    }
    uni.hideLoading();
    return {
      id: commodityResult.data.data.id,
      name: commodityResult.data.data.goodsName,
      price: filiters.common_price(commodityResult.data.data.price),
      unit: commodityResult.data.data.unit,
      status: commodityResult.data.data.goodsStatus,
      stock: commodityResult.data.data.stock,
      imagePath: filiters.common_assets_path(commodityResult.data.data.imgUrl),
      describe: filiters.common_assets_path(commodityResult.data.data.goodsDescribe),
      tags: tagList
    };
  } catch (error) {
    uni.hideLoading();
    return {};
  }
}

/**
 * 获取商品简要详情（不带促销信息，购物车使用）
 */
export async function apiGetCommoditySummaryDetail(id) {
  uni.showLoading({
    mask: true,
    title: "很努力的在搜索"
  });
  try {
    let query = {
      id
    }
    const commodityResult = await request({
      url: "/goods/detail",
      method: "get",
      data: query
    });
    uni.hideLoading();
    return {
      id: commodityResult.data.data.id,
      name: commodityResult.data.data.goodsName,
      price: filiters.common_price(commodityResult.data.data.price),
      unit: commodityResult.data.data.unit,
      status: commodityResult.data.data.goodsStatus,
      stock: commodityResult.data.data.stock,
      imagePath: filiters.common_assets_path(commodityResult.data.data.imgUrl),
      describe: filiters.common_assets_path(commodityResult.data.data.goodsDescribe)
    };
  } catch (error) {
    uni.hideLoading();
    return {};
  }
}

/**
 * 获取历史订单
 */
export async function apiGetHistoryOrder(page) {
  uni.showLoading({
    mask: true,
    title: "很努力的翻找您的历史订单"
  });
  try {
    let query = {
      page: page,
      size: 10,
      filite: {
        openId: store.state.openId
      },
      order: {
        createTime: "desc"
      }
    }
    let orderList = [];
    const result = await request({
      url: "/api/order",
      data: query,
      method: "get",
    });
    result.forEach((order) => {
      orderList.push({
        id: order.id,
        totalPrice: order.total_price,
        reduction: order.reduction,
        status: order.status,
        paymentTime: order.payment_time,
        addressId: order.address_id,
        deliveryBoyId: order.delivery_boy_id,
        shopId: order.shop_id,
        deliveryTime: order.delivery_time,
        expectedDeliveryTime: order.expected_delivery_time
      });
    })
    uni.hideLoading();
    return orderList;
  } catch (error) {
    uni.hideLoading();
    return [];
  }
}

/**
 * 获取当前用户地址
 */
export async function apiGetCurrentUserAddress(page) {
  uni.showLoading({
    mask: true,
    title: "很努力的翻找您的地址信息"
  });
  try {
    let query = {
      'page.current': page,
      'page.size': 8,
      openId: store.state.openId
    }
    let addressList = [];
    const result = await request({
      url: "/user/receive/address/list",
      data: query,
      method: "get",
    });
    result.data.data.records.forEach((address) => {
      addressList.push({
        id: address.id,
        addressStatus: address.addressStatus,
        addressName: address.address,
        addressDetail: address.province,
        latitude: address.latitude,
        longitude: address.longitude,
        name: address.receivingName,
        telephone: address.phone,
        createTime: address.createTime
      })
    });
    uni.hideLoading();
    return addressList;
  } catch (error) {
    uni.hideLoading();
    return [];
  }
}

/**
 * 新增收货地址
 */
export async function apiCreateCurrentUserAddress(address) {
  uni.showLoading({
    mask: true,
    title: "正在提交"
  });
  try {
    let formData = {
      address: address.addressName,
      province: address.addressDetail,
      latitude: address.latitude,
      longitude: address.longitude,
      receivingName: address.name,
      phone: address.telephone,
      openId: store.state.openId
    }
    const result = await request({
      url: "/user/receive/address",
      data: formData,
      method: "post",
    });
    uni.hideLoading();
    return result;
  } catch (error) {
    uni.hideLoading();
    return [];
  }
}

/**
 * 编辑收货地址
 */
export async function apiUpdateCurrentUserAddress(address) {
  uni.showLoading({
    mask: true,
    title: "正在提交"
  });
  try {
    let formData = {
      id: address.id,
      address: address.addressName,
      province: address.addressDetail,
      latitude: address.latitude,
      longitude: address.longitude,
      receivingName: address.name,
      phone: address.telephone,
      openId: store.state.openId
    }
    const result = await request({
      url: "/user/receive/address",
      data: formData,
      method: "put",
    });
    uni.hideLoading();
    return result;
  } catch (error) {
    uni.hideLoading();
    return [];
  }
}

/**
 * 删除收货地址
 */
export async function apiDeleteCurrentUserAddress(id) {
  uni.showLoading({
    mask: true,
    title: "正在提交"
  });
  try {
    let formData = {
      id,
      addressStatus: 0
    }
    const result = await request({
      url: "/user/receive/address",
      data: formData,
      method: "put",
    });
    uni.hideLoading();
    return result;
  } catch (error) {
    uni.hideLoading();
    return [];
  }
}

/**
 * 获取收货地址详情
 */
export async function apiGetCurrentUserAddressDetail(id) {
  uni.showLoading({
    mask: true,
    title: "正在查找您的收货地址"
  });
  try {
    let address = {};
    let formData = {
      id
    }
    const result = await request({
      url: "/user/receive/address",
      data: formData,
      method: "get",
    });
    uni.hideLoading();
    address = result.data.data;
    return {
      id: address.id,
      addressStatus: address.addressStatus,
      addressName: address.address,
      addressDetail: address.province,
      latitude: address.latitude,
      longitude: address.longitude,
      name: address.receivingName,
      telephone: address.phone,
      createTime: address.createTime
    }
  } catch (error) {
    uni.hideLoading();
    return [];
  }
}

/**
 * 获取当前用户购物车商品信息（仅商品id）
 */
export async function apiGetCurrentUserShoppingCartInfo() {
  try {
    let query = {
      'page.current': 1,
      'page.size': 99,
      openId: store.state.openId
    }
    const result = await request({
      url: "/shop/cart/list",
      data: query,
      method: "get",
    });
    let total = 0;
    result.data.data.forEach(shoppingCartCommodity => {
      total += shoppingCartCommodity.number;
    });
    let shoppingCartInfo = {
      records: result.data.data,
      total: total
    };
    console.log(shoppingCartInfo);
    store.commit('SetShoppingCart', shoppingCartInfo);
    return shoppingCartInfo;
  } catch (error) {
    return {
      records: [],
      total: 0
    };
  }
}

/**
 * 获取当前用户购物车商品列表（商品全字段）
 */
export async function apiGetCurrentUserShoppingCartCommodityList() {
  uni.showLoading({
    mask: true,
    title: "正在查找您的购物车商品"
  });
  try {
    let shoppingCartCommodityList = [];
    const result = await apiGetCurrentUserShoppingCartInfo();
    result.records.forEach(async (shoppingCartCommodity) => {
      let commodity = await apiGetCommoditySummaryDetail(shoppingCartCommodity.goodsId);
      if(commodity.id){
        commodity.shopId = shoppingCartCommodity.id;
        commodity.count = shoppingCartCommodity.number;
        shoppingCartCommodityList.push(commodity);
      }
    });
    uni.hideLoading();
    return {
      records: shoppingCartCommodityList,
      total: result.total
    }
  } catch (error) {
    uni.hideLoading();
    return {
      records: [],
      total: 0
    };
  }
}

/**
 * 向购物车添加商品
 */
export async function apiPushCommodityToShoppingCart(commodityId, count) {
  uni.showLoading({
    mask: true,
    title: "正在向您的购物车添加商品"
  });
  try {
    let formData = {
      openId: store.state.openId,
      goodsId: commodityId,
      number: count
    };
    const result = await request({
      url: "/shop/cart/goods",
      data: formData,
      method: "post",
    });
    uni.hideLoading();
    return true;
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "添加失败，\r\n请稍后重试",
      icon: "none"
    });
    return false;
  }
}

/**
 * 修改商品数量
 */
export async function apiUpdateCommondityCountInShoppingCart(id, commodityId, count) {
  try {
    let putData = {
      id,
      openId: store.state.openId,
      goodsId: commodityId,
      number: count
    };
    const result = await request({
      url: "/shop/cart/goods",
      data: putData,
      method: "put",
    });
    apiGetCurrentUserShoppingCartInfo().then();
    return true;
  } catch (error) {
    uni.showToast({
      title: "修改数量失败，\r\n请稍后重试",
      icon: "none"
    });
    return false;
  }
}

/**
 * 移除购物车商品
 */
export async function apiRemoveCommodityFromShoppingCart(id, commodityId) {
  try {
    let deleteData = {
      id,
      openId: store.state.openId,
      goodsId: commodityId,
    }
    const result = await request({
      url: "/shop/cart/goods",
      data: deleteData,
      method: "delete",
    });
    return true;
  } catch (error) {
    uni.showToast({
      title: "移除商品失败，\r\n请稍后重试",
      icon: "none"
    });
    return false;
  }
}

/**
 * 购物车页面批量移除商品
 */
export async function apiBatchRemoveCommodityFromShoppingCart(paramsArr) {
  try {
    paramsArr.forEach(async (params) => {
      try {
        await apiRemoveCommodityFromShoppingCart(params.id, params.commodityId);
      } catch (error) {

      }
    });
    return true;
  } catch (error) {
    uni.showToast({
      title: "移除商品失败，\r\n请稍后重试",
      icon: "none"
    });
    return false;
  }
}