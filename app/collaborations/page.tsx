import React from 'react';
import Contents from '@/components/layout/Contents';
import { CategoryType } from '../types';

const collaborationPage: React.FC = () => {
  return <Contents mode={CategoryType.Collaboration} />;
};

export default collaborationPage;
