import React, { useEffect } from 'react';
import { MetadataTypes } from './types';
import ContentsContainer from '@/components/core/content/ContentsContainer';

const homePage: React.FC = () => {
  return <ContentsContainer mode={MetadataTypes.collaborations} />;
};

export default homePage;
