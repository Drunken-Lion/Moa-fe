import ky, {
  type KyRequest,
  type AfterResponseHook,
  type KyInstance
} from 'ky';
import authStorage from '@/shared/utils/authStorage';
import { injectable } from 'inversify';

type PublicMethods = 'get' | 'post' | 'put' | 'delete';
type PublicInstance = Readonly<Pick<KyInstance, PublicMethods>>;

@injectable()
export default abstract class HttpClient {
  private readonly internalClient: KyInstance;

  constructor() {
    this.internalClient = this.createInstance();
  }

  protected get httpClient(): PublicInstance {
    return {
      get: this.internalClient.get,
      post: this.internalClient.post,
      put: this.internalClient.put,
      delete: this.internalClient.delete
    }
  }

  private createInstance(): KyInstance {
    return ky.extend({
      prefixUrl: `${import.meta.env.VITE_API_SERVER}/api/v1`,
      headers: { 'Accept': 'application/json' },
      hooks: {
        beforeRequest: [
          (request) => this.beforeRequest(request)
        ],
        afterResponse: [
          async (...args) => this.afterResponse(...args)
        ]
      }
    });
  }

  private beforeRequest(request: KyRequest): void {
    const storedToken = authStorage.getToken();
    if (storedToken) request.headers.set('Authorization', `Bearer ${storedToken}`);
  }

  /**
   * @todo implement response standardization
   */
  private afterResponse(...args: Parameters<AfterResponseHook>): void {
    
  }
}