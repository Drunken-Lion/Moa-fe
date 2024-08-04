import type { FC, PropsWithChildren } from 'react';
import { Provider as Container } from 'inversify-react';
import container from '@/shared/repository/lib/container';

const RepositoryProvider: FC<PropsWithChildren> = ({ children }) => (
  <Container container={container}>
    {children}
  </Container>
);

export default RepositoryProvider;