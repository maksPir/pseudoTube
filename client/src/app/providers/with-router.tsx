import { Spin } from 'antd';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin delay={300} size="large"></Spin>}>{component()}</Suspense>
    </BrowserRouter>
  );
};
