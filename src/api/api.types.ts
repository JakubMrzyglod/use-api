import { ShowToast } from './api.constants';

export type ApiMethod = 'get' | 'post' | 'delete' | 'patch';

export type ApiConfig<Res, Req = {}> = {
  onSuccess?: OnSuccess<Res, Req>;
  onError?: () => {};
  showToast?: ShowToast;
  transform?: (data: any) => Req;
  // navigateTo?: string; // TODO:
};

export type OnSuccessProps<Res, Req = {}> = { resData: Res; reqData: Req; args: any[] };

export type OnSuccess<Res, Req> = (props: OnSuccessProps<Res, Req>) => void;

export type UseApiType = [call: (callParam?: Call) => void, loading: boolean];

export type Path = [method: ApiMethod, path: string | ((...args: any[]) => string)];

export type Call = {
  data?: any;
  args?: (string | number)[];
};
