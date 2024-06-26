import React from 'react';
import { ContentTypes } from './types';
import ContentsContainer from '@/components/core/content/ContentsContainer';

const Page: React.FC = () => {
  return <ContentsContainer contentType={ContentTypes.collaborations} />;
};

export default Page;
