export interface IInitialState {
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  answer: string;
}
export interface IResponsePayload extends IInitialState {}
