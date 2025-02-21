import axios from "axios";
import serverSettings from "../configs/serverSetting";

// 옵션과 모델 설정에 사용할 기본 인터페이스 (필요에 따라 확장 가능)
export interface IControllerOptions {
  [key: string]: any;
}

export interface IModelConfig extends Record<string, any> {}

class BuyingItController {
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

  async filtering(option: IControllerOptions): Promise<any> {
    const params = option;
    const url = `${this.apiUrl}${this.rootRoute}/${this.role}/${this.modelId}/filtering`;
    const response = await axios.post(url, params);

    return response;
  }
}
export default BuyingItController;
