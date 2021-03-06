import {ResponseBase, ErrorAxios} from './../../config/type';
import Axios from 'axios';
import {HandleErrorApi} from '../../common/handleError/index';
import {BASE_API} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import {ERROR_NETWORK_CODE, RESULT_CODE_PUSH_OUT} from '../../config';
import DropDownAlert from '../utils/dropDownHolder';
import {R} from '../../assets/value';
import {remove} from '../utils/storage';
import {navigateToLogin} from '../../navigation/navigationHelper';
import {translate} from '../utils/i18n/translate';

const responseDefault: ResponseBase<any> = {
  code: -500,
  status: false,
  msg: translate('error:errorData'),
  data: {},
};
const _onPushLogout = () => {
  remove(R.strings.TOKEN).then(val => {});
  DropDownAlert.showError(
    translate('dialog:lbTitleError'),
    translate('error:pushLogout'),
  );
  navigateToLogin();
};
const Instance = Axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
async function Get<T>(url: string, param?: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.get<ResponseBase<T>>(url, {params: param, headers: header})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

async function Post<T>(url: string, data: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val};
    }
  });
  return Instance.post<ResponseBase<T>>(url, data, {headers: header})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function PostWithFile<T>(url: string, data: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {
        token: val,
        'Content-Type': 'multipart/form-data',
      };
    }
  });
  return Instance.post<ResponseBase<T>>(url, data, {headers: header})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function PostFile<T>(url: string, FormData: FormData, params?: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.post<ResponseBase<T>>(url, {params: params, data: FormData})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

async function Put<T>(url: string, data: object, params?: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.put<ResponseBase<T>>(url, {params: params, data: data})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function Delete<T>(url: string, data: object, params?: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.delete<ResponseBase<T>>(url, {params: params, data: data})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
export const ServiceAsync = {
  Get,
  Post,
  Put,
  Delete,
  PostFile,
  PostWithFile,
};
