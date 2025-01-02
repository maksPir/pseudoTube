export type RootState = ReturnType<typeof import('app/store/index').store.getState>;
export type AppDispatch = typeof import('app/store/index').store.dispatch;
export type DispatchFunc = () => AppDispatch;
