"use client" 

import React, { useEffect, useRef } from 'react';
import styles from './SoundCloudEmbed.module.scss'
interface SoundCloudEmbedProps {
   trackUrl: string;
   active: boolean;
}

const SoundCloudEmbed: React.FC<SoundCloudEmbedProps> = ({ trackUrl, active }) => {
   const iframeSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
      trackUrl
   )}&auto_play=${active}&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true`;

   const iframeRef = useRef<HTMLIFrameElement>(null);

   useEffect(() => {
      const iframe = iframeRef.current;
      if (iframe) {
         const message = active ? '{"event":"play"}' : '{"event":"pause"}';
         iframe.contentWindow?.postMessage(message, 'https://w.soundcloud.com');
      }
   }, [active]);

   return (
      <iframe
         ref={iframeRef}
         width="100%"
         height="166"
         scrolling="no"
         frameBorder="no"
         // allow="autoplay"
         src={iframeSrc}
         title="SoundCloud Player"
      />
   );
};

export default SoundCloudEmbed;
