import { SERVER_API_URL } from 'app/app.constants';

export interface ISocial {
  resourceUrl: string;
  share(content);
}
