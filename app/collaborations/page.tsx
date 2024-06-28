import React from 'react';
import ContentsContainer from '@/components/core/content/ContentsContainer';
import { ContentTypes } from '../types';

const Page: React.FC = () => {
  return <ContentsContainer contentType={ContentTypes.collaborations} />;
};

export default Page;
