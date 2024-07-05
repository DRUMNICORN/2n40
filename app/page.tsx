import React from 'react';
import { ContentTypes } from '@/exports/enums';
import Contents from '@/components/core/content/Contents';

const Page: React.FC = () => {
  return <Contents contentType={ContentTypes.collaborations} />;
};

export default Page;
