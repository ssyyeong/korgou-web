// ControllerAbstractBase.ts
import axios, { AxiosResponse } from "axios";

// 서버 설정 (실제 설정에 맞게 수정)
const serverSettings: { config: { apiUrl: string } } = {
  config: {
    // 예: "localhost:4021" 또는 도메인명
    // apiUrl: "", // 서버 API URL
    apiUrl: "http://localhost:4021", // 로컬 서버 API URL
  },
};

// 옵션과 모델 설정에 사용할 기본 인터페이스 (필요에 따라 확장 가능)
export interface IControllerOptions {
  [key: string]: any;
}

export interface IModelConfig extends Record<string, any> {}

class ControllerAbstractBase {
  modelName?: string;
  modelId?: string;
  apiUrl: string;
  rootRoute: string;
  role: string;
  mergedPath: string;
  modelConfig: IModelConfig | null;

  constructor({
    modelName,
    modelId,
  }: {
    modelName?: string;
    modelId?: string;
  }) {
    this.modelName = modelName;
    this.modelId = modelId;
    this.apiUrl = serverSettings.config.apiUrl;
    this.rootRoute = "/api";
    this.role = "user";
    // 예: https://localhost:4021/api/user/{modelId}
    this.mergedPath = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}`;
    this.modelConfig = null;
  }

  async parseResponse(response: AxiosResponse): Promise<any> {
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to load data");
  }

  // 모델 설정을 불러옴
  async getModelConfig(): Promise<IModelConfig | null> {
    const url = `${this.apiUrl}${this.rootRoute}/common/model/find_one`;
    const params = { MODEL_NAME: this.modelName };
    const response = await axios.get(url, {
      params,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const res = await this.parseResponse(response);
    return res.result ? res.result : null;
  }

  // findOne: 모델 설정(FIND_ONE)을 바탕으로 옵션 키 목록을 구성하여 GET 요청
  async findOne(option: IControllerOptions): Promise<any> {
    if (!this.modelConfig) {
      this.modelConfig = await this.getModelConfig();
    }
    const findOption: IControllerOptions = {};
    if (this.modelConfig && this.modelConfig.FIND_ONE) {
      const keyList: Array<{ KEY: string }> =
        this.modelConfig.FIND_ONE.FIND_OPTION_KEY_LIST;
      keyList.forEach((config) => {
        if (option[config.KEY] !== undefined) {
          findOption[config.KEY] = option[config.KEY];
        }
      });
    }
    const params = { FIND_OPTION_KEY_LIST: JSON.stringify(findOption) };
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/find_one`;
    const response = await axios.get(url, { params });
    return await this.parseResponse(response);
  }

  // findOneByKey: 옵션 객체를 그대로 JSON 문자열로 감싸서 GET 요청
  async findOneByKey(option: IControllerOptions): Promise<any> {
    if (!this.modelConfig) {
      this.modelConfig = await this.getModelConfig();
    }
    const params = { FIND_OPTION_KEY_LIST: JSON.stringify(option) };
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/find_by_key`;
    const response = await axios.get(url, { params });
    return await this.parseResponse(response);
  }

  // findAll: 모델 설정(FIND_ALL)을 바탕으로 옵션 키 목록을 구성하여 GET 요청
  async findAll(option: IControllerOptions): Promise<any> {
    if (!this.modelConfig) {
      this.modelConfig = await this.getModelConfig();
    }
    const findOption: IControllerOptions = {};
    const keyList: Array<{ KEY: string }> =
      this.modelConfig.FIND_ALL.FIND_OPTION_KEY_LIST;
    keyList.forEach((config) => {
      if (option[config.KEY] !== undefined) {
        findOption[config.KEY] = option[config.KEY];
      }
    });
    const params = { FIND_OPTION_KEY_LIST: JSON.stringify(findOption) };
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/find_all`;
    const response = await axios.get(url, {
      params,
    });
    return await this.parseResponse(response);
  }

  // findAllByJoinKey: join key를 이용하여 GET 요청
  async findAllByJoinKey(option: IControllerOptions): Promise<any> {
    if (!this.modelConfig) {
      this.modelConfig = await this.getModelConfig();
    }
    const params = { FIND_OPTION_KEY_LIST: JSON.stringify(option) };
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/find_all_by_joined_key`;
    const response = await axios.get(url, { params });
    return await this.parseResponse(response);
  }

  // create: 모델 생성을 위한 POST 요청
  async create(option: IControllerOptions): Promise<any> {
    if (!this.modelConfig) {
      this.modelConfig = await this.getModelConfig();
    }
    const createOption: IControllerOptions = {};
    const keyList: Array<{ KEY: string }> =
      this.modelConfig.CREATE.CREATE_OPTION_KEY_LIST;
    keyList.forEach((config) => {
      if (option[config.KEY] !== undefined) {
        createOption[config.KEY] = option[config.KEY];
      }
    });

    // 브라우저의 localStorage에서 userId 가져오기
    const userId = localStorage.getItem("userId") || "";
    if (userId !== "") {
      createOption.APP_MEMBER_IDENTIFICATION_CODE = userId;
    }

    const data = { CREATE_OPTION_KEY_LIST: JSON.stringify(createOption) };
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/create`;
    const response = await axios.post(url, data);
    return await this.parseResponse(response);
  }

  // update: 모델 업데이트를 위한 PUT 요청
  async update(option: IControllerOptions): Promise<any> {
    if (!this.modelConfig) {
      this.modelConfig = await this.getModelConfig();
    }
    const findOption: IControllerOptions = {};
    const updateOption: IControllerOptions = {};
    const findKeyList: Array<{ KEY: string }> =
      this.modelConfig.UPDATE.FIND_OPTION_KEY_LIST;
    findKeyList.forEach((config) => {
      if (option[config.KEY] !== undefined) {
        findOption[config.KEY] = option[config.KEY];
      }
    });
    const updateKeyList: Array<{ KEY: string }> =
      this.modelConfig.UPDATE.UPDATE_OPTION_KEY_LIST;
    updateKeyList.forEach((config) => {
      if (option[config.KEY] !== undefined) {
        updateOption[config.KEY] = option[config.KEY];
      }
    });

    const data = {
      FIND_OPTION_KEY_LIST: JSON.stringify(findOption),
      UPDATE_OPTION_KEY_LIST: JSON.stringify(updateOption),
    };
    console.log(data);
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/update`;
    const response = await axios.put(url, data);
    return await this.parseResponse(response);
  }

  // delete: 모델 삭제(또는 비활성화) 처리를 위한 PUT 요청
  async delete(option: IControllerOptions): Promise<any> {
    if (!this.modelConfig) {
      this.modelConfig = await this.getModelConfig();
    }
    const findOption: IControllerOptions = {};
    const deleteOption: IControllerOptions = {};
    const findKeyList: Array<{ KEY: string }> =
      this.modelConfig.DELETE.FIND_OPTION_KEY_LIST;
    findKeyList.forEach((config) => {
      if (option[config.KEY] !== undefined) {
        findOption[config.KEY] = option[config.KEY];
      }
    });
    const updateKeyList: Array<{ KEY: string }> =
      this.modelConfig.DELETE.UPDATE_OPTION_KEY_LIST;
    updateKeyList.forEach((config) => {
      if (option[config.KEY] !== undefined) {
        deleteOption[config.KEY] = option[config.KEY];
      }
    });

    const data = {
      FIND_OPTION_KEY_LIST: JSON.stringify(findOption),
      UPDATE_OPTION_KEY_LIST: JSON.stringify(deleteOption),
    };

    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/delete`;
    const response = await axios.post(url, data);
    return await this.parseResponse(response);
  }

  // updateProfile: 프로필 이미지 업로드 후 업데이트 요청
  async updateProfile(
    option: IControllerOptions,
    img: File | null
  ): Promise<any> {
    if (img) {
      const formData = new FormData();
      formData.append("file", img, img.name);
      const uploadUrl = `${this.apiUrl}${this.rootRoute}/common/file/upload_image`;
      const uploadResponse = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await this.parseResponse(uploadResponse);
      option.PROFILE_IMAGE = JSON.stringify(res.result);
    }
    // AppMember 컨트롤러를 새로 생성하여 update 호출
    const controller = new ControllerAbstractBase({
      modelName: "AppMember",
      modelId: "app_member",
    });
    return await controller.update(option);
  }

  // createCommunity: 파일들을 업로드 후 커뮤니티 글 생성 요청
  async createCommunity(
    option: IControllerOptions,
    files: File[]
  ): Promise<any> {
    const images: any[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const uploadUrl = `${this.apiUrl}${this.rootRoute}/common/file/upload_image`;
      const uploadResponse = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await this.parseResponse(uploadResponse);
      // 업로드 결과가 배열로 반환된다고 가정하고 첫 번째 요소를 저장
      images.push(res.result[0]);
    }
    option.IMAGE_LIST = JSON.stringify(images);
    const controller = new ControllerAbstractBase({
      modelName: "CommunityBoardContent",
      modelId: "community_board_content",
    });
    return await controller.create(option);
  }

  // certification: 신분증 및 계약서 이미지 업로드 후 인증 요청 (생성 또는 업데이트)
  async certification(
    option: IControllerOptions,
    idCard: File | null,
    contract: File | null,
    type: string
  ): Promise<any> {
    if (idCard) {
      const formData = new FormData();
      formData.append("file", idCard, idCard.name);
      const uploadUrl = `${this.apiUrl}${this.rootRoute}/common/file/upload_image`;
      const uploadResponse = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await this.parseResponse(uploadResponse);
      option.ID_CARD_IMAGE_PATH = JSON.stringify(res.result);
    }
    if (contract) {
      const formData = new FormData();
      formData.append("file", contract, contract.name);
      const uploadUrl = `${this.apiUrl}${this.rootRoute}/common/file/upload_image`;
      const uploadResponse = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await this.parseResponse(uploadResponse);
      option.CONTRACT_IMAGE_PATH = JSON.stringify(res.result);
    }
    const controller = new ControllerAbstractBase({
      modelName: "CommunityVarification",
      modelId: "community_varification",
    });
    if (type === "create") {
      return await controller.create(option);
    } else {
      return await controller.update(option);
    }
  }
}

export default ControllerAbstractBase;
