import React from 'react';
import Contents from '@/components/layout/Contents';
import { MetadataTypes } from '../types';

const collaborationPage: React.FC = () => {
  return <Contents mode={MetadataTypes.collaborations} />;
};

export default collaborationPage;
