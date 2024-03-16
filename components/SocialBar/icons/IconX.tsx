import Image from 'next/image';
import React from 'react';
import styles from './icons.module.scss';

/**
 * X icon component, used to link to the platform.
 *
 * @param {string} url the url to link out to.
 * @returns {React.ReactElement} social media icon with link.
 */
const IconX = ({ url }: { url: string }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.icon}
      title="Follow Sleepy Slawths on X!"
    >
      <Image
        src="/static/images/icons/x.png"
        alt="X icon"
        width={30}
        height={30}
        className={styles.iconX}
      />
    </a>
  );
};

export { IconX };
