import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Copyright &copy; {new Date().getFullYear()} Michael R. Dinerstein (
      <a href="https://missionmike.dev/" target="_blank" rel="noopener noreferrer">
        Mission Mike
      </a>
      ) and{' '}
      <a href="https://linktr.ee/sleepyslawths" target="_blank" rel="noopener noreferrer">
        Sleepy Slawths
      </a>
      <br />
      &nbsp;
      <br />
      <a href="mailto:holler@sleepyslawths.com" style={{ textDecoration: 'none' }}>
        Send a message 📧
      </a>{' '}
      |{' '}
      <a href="https://slawths.vip/discord" target="_blank" rel="noopener noreferrer">
        Join our Discord
      </a>
    </footer>
  );
};

export { Footer };
