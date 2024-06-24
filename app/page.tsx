import React, { useEffect } from 'react';
import Contents from '@/components/layout/Contents';
import { CategoryType } from './types';

const homePage: React.FC = () => {
  return <Contents mode={CategoryType.Collaboration} />;
};

export default homePage;
