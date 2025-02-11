import axios, { AxiosResponse } from "axios";

// 서버 설정 (실제 설정에 맞게 수정)
const serverSettings: { config: { apiUrl: string } } = {
  config: {
    // 예: "localhost:4021" 또는 도메인명
    apiUrl: "http://localhost:4021",
  },
};

// 옵션과 모델 설정에 사용할 기본 인터페이스 (필요에 따라 확장 가능)
export interface IControllerOptions {
  [key: string]: any;
}

export interface IModelConfig extends Record<string, any> {}

class AppMemberController {
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

  async signUp(option: IControllerOptions): Promise<any> {
    const params = option;
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/sign_up/local`;
    const response = await axios.post(url, params);

    return response;
  }

  async signIn(option: IControllerOptions): Promise<any> {
    const params = option;
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/sign_in/local`;
    const response = await axios.post(url, params);

    return response;
  }

  async getProfile(option: IControllerOptions): Promise<any> {
    const params = option;
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/profile`;
    const response = await axios.get(url, params);

    return response;
  }
}
export default AppMemberController;
