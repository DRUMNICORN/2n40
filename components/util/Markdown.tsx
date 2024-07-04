"use client" 

import React, { useEffect, useState } from 'react';
import styles from './Markdown.module.scss';
import Linked from './Linked';
import { boldRegex, headerRegex, hrefRegex, lineRegex, linkRegex, urlRegex } from '@/utils/regex';
import { ContentTypes } from '@/utils/enums';

interface EntityContentProps {
  content: string;
  active?: boolean;
  editing?: boolean;
  onChange?: (content: string) => void;
}

const applyMarkdown = (str: string) => {

  const elements = str.split(lineRegex).map((line, i) => {
    if (line.startsWith('>')) {
      return (
        <div key={`note-${i}`} className={styles.note}>
          {line.replace('>', '')}
        </div>
      );
    }

    const linkMatches = Array.from(line.matchAll(linkRegex));
    if (linkMatches.length > 0) {
      return (
        <div key={`link-group-${i}`} className={styles.links}>
          {line.split(linkRegex).map((part, k) => (
            k % 2 === 0 ? <span key={`text-${k}`}>{part}</span> : <Linked key={`link-${k}`} href={part}>{part}</Linked>
          ))}
        </div>
      );
    }

    const hrefMatches = Array.from(line.matchAll(hrefRegex));
    if (hrefMatches.length > 0) {
      return (
        <div key={`href-group-${i}`} className={styles.links}>
          {line.split(hrefRegex).map((part, k) => {
            const match = hrefMatches.find((m) => m.includes(part));
            if (match) {
              const [_, name, href] = match;
              return (
                k % 2 === 0 ? <span key={`href-text-${k}`}>{part}</span> : <Linked key={`href-link-${k}`} href={href} />
              );
            }
            return <span key={`href-text-${k}`}>{part}</span>;
          })}
        </div>
      );
    }

    const urlMatches = Array.from(line.matchAll(urlRegex));
    if (urlMatches.length > 0) {
      return (
        <div key={`url-group-${i}`} className={styles.links}>
          {line.split(urlRegex).map((part, k) => (
            k % 2 === 0 ? <span key={`url-text-${k}`}>{part}</span> : <Linked key={`url-link-${k}`}  type={ContentTypes.website} href={part}/>
          ))}
        </div>
      );
    }

    const headerMatches = Array.from(line.matchAll(headerRegex));
    if (headerMatches.length > 0) {
      return headerMatches.map((match, j) => {
        const [_, level, text] = match;
        return <h1 key={`header-${i}-${j}`} className={`${styles.header} ${styles[`h${level.length}`]}`}>{text}</h1>;
      });
    }

    // Replace text between ** with bold formatting
    let boldElements = line.split(boldRegex).map((part, k) => {
      if (k % 2 === 1) {
        return <strong key={`bold-${k}`}>{part}</strong>;
      }
      return part;
    });

    return <div key={`text-${i}`}><span className={styles.text}>{boldElements}</span></div>;
  });

  return (
    <div className={styles.section}>
      {elements}
    </div>
  );
};

const Markdown: React.FC<EntityContentProps> = ({ content, active, editing, onChange }) => {
  const [formattedContent, setFormattedContent] = useState(content);

  useEffect(() => {
    if (editing) {
      const trimmedContent = content.trim();
      setFormattedContent(trimmedContent);
    }
  }, [content, editing]);

  useEffect(() => {
    if (active) {
      setFormattedContent(content);
    }
  }, [active, content]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormattedContent(e.target.value);
    if (onChange) {
      onChange(`\n${e.target.value}\n`);
    }
  };

  return (
    <div className={`${styles.markdown}`}>
      {editing ?
        <textarea
          className={styles.textarea}
          value={formattedContent.trim()}
          onChange={handleInputChange}
          disabled={!editing}
        />
        : <div className={styles.section}>
          {applyMarkdown(formattedContent)}
        </div>
      }
    </div>
  );
};

export default Markdown;
