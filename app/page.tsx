import React, { useEffect } from 'react';
import Contents from '@/components/layout/Contents';
import { MetadataTypes } from './types';

const homePage: React.FC = () => {
  return <Contents mode={MetadataTypes.collaborations} />;
};

export default homePage;
