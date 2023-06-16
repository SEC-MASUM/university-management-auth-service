import { IGenericErrorMessage } from './genericErrorMessage';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
