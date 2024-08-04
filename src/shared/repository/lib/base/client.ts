import axios, {
  AxiosError,
  type AxiosResponse,
  type AxiosInstance,
  type InternalAxiosRequestConfig
} from 'axios';
import authStorage from '@/shared/utils/authStorage';
import { injectable } from 'inversify';

type PublicMethods = 'get' | 'post' | 'put' | 'delete';
type PublicInstance = Readonly<Pick<AxiosInstance, PublicMethods>>;

@injectable()
export default abstract class HttpClient {
  private readonly internalClient: AxiosInstance;

  constructor() {
    this.internalClient = this.createInstance();
    this.registerInterceptors();
  }

  protected get httpClient(): PublicInstance {
    return {
      get: this.internalClient.get,
      post: async (...args: Parameters<AxiosInstance['post']>) => {
        if (args[1] instanceof FormData) return await this.internalClient.postForm(...args);
        return await this.internalClient.post(...args);
      },
      put: this.internalClient.put,
      delete: this.internalClient.delete
    }
  }

  private createInstance(): AxiosInstance {
    return axios.create({
      baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  private registerInterceptors(): void {
    this.internalClient.interceptors.request.use(this.handleRequest);
    this.internalClient.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private handleRequest(request: InternalAxiosRequestConfig) {
    const storedToken = authStorage.getToken();
    if (storedToken) request.headers['Authorization'] = `Bearer ${storedToken}`;

    return request;
  }

  /**
   * @todo implement response standardization
   */
  private handleResponse(response: AxiosResponse) {
    return response;
  }

  private handleError(error: unknown) {
    if (error instanceof AxiosError) {

    }

    return new Promise(() => {});
  }
}