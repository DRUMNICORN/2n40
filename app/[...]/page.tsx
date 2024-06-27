"use client"

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { MetadataTypes } from '../types';
import Contents from '@/components/layout/Contents';

const Soon = lazy(() => import('@/components/design/Soon'));

interface CollapsePageProps {
  mode?: MetadataTypes; // Optional prop to pass the mode
}

const CollapsePage: React.FC<CollapsePageProps> = ({ mode }) => {
  const [category, setCategory] = useState<MetadataTypes>();


  useEffect(() => {
    let categoryParts = (window?.location?.pathname || '').split('/') || [];
    let category = categoryParts[categoryParts.length - 1].split('?')[0] as MetadataTypes;
    console.log(category);
    setCategory(category)
  }, []);



  if (category || mode)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Contents mode={category || mode || MetadataTypes.collaborations} />
    </Suspense>
  );
  else
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Soon />
    </Suspense>
  );
};

export default CollapsePage;
