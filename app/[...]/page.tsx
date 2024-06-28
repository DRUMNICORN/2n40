"use client"

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { MetadataTypes } from '../types';
import Logo from '@/components/core/design/Logo';
import ContentsContainer from '@/components/core/content/ContentsContainer';

// const Soon = lazy(() => import('@/components/core/Soon'));

interface CollapsePageProps {
  mode?: MetadataTypes; // Optional prop to pass the mode
}

const CollapsePage: React.FC<CollapsePageProps> = ({ mode }) => {
  const [category, setCategory] = useState<MetadataTypes>();

  
  useEffect(() => {
    let categoryParts = (window?.location?.pathname || '').split('/') || [];
    let category = categoryParts[categoryParts.length - 1].split('?')[0] as MetadataTypes;
    setCategory(category)
  }, []);


  if (!category) return <Logo rotating />
  else return <ContentsContainer mode={category || mode} />;
};

export default CollapsePage;
