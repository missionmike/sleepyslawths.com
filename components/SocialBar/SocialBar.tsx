import { IconFacebook } from './icons/IconFacebook';
import { IconInstagram } from './icons/IconInstagram';
import { IconTikTok } from './icons/IconTikTok';
import { IconX } from './icons/IconX';
import { IconYouTube } from './icons/IconYouTube';
import React from 'react';
import { siteMetadata } from 'data/siteMetadata';
import styles from './SocialBar.module.scss';

/**
 * Social media icons component to link to various
 * platforms.
 *
 * @returns {React.ReactElement} Social media icons with links.
 */
const SocialBar = () => {
  return (
    <div className={styles.socialBar}>
      <IconYouTube url={siteMetadata.youTube} />
      <IconTikTok url={siteMetadata.tikTok} />
      <IconInstagram url={siteMetadata.instagram} />
      <IconFacebook url={siteMetadata.facebook} />
      <IconX url={siteMetadata.twitter} />
    </div>
  );
};

export { SocialBar };
