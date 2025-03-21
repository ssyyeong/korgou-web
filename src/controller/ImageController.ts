import axios from "axios";
import serverSettings from "../configs/serverSetting";

// 옵션과 모델 설정에 사용할 기본 인터페이스 (필요에 따라 확장 가능)
export interface IControllerOptions {
  [key: string]: any;
}

export interface IModelConfig extends Record<string, any> {}

class ImageController {
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
    this.apiUrl = serverSettings.config.apiUrl;
    this.rootRoute = "/api";
    this.role = "user";
  }

  async uploadImage(option: IControllerOptions): Promise<any> {
    const params = option;
    const url = `${this.apiUrl}${this.rootRoute}/common/file/upload_image`;
    const response = await axios.post(url, params);

    return response;
  }
}
export default ImageController;
