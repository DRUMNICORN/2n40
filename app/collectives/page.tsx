import React from 'react';
import Contents from '@/components/core/content/Contents';
import { ContentTypes } from '@/utils/enums';

const Page: React.FC = () => {
  return <Contents contentType={ContentTypes.collectives} />;
};

export default Page;
