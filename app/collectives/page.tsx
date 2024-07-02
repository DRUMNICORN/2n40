import React from 'react';
import ContentsContainer from '@/components/core/content/ContentsContainer';
import { ContentTypes } from '@/exports/enums';

const Page: React.FC = () => {
  return <ContentsContainer contentType={ContentTypes.collectives} />;
};

export default Page;
