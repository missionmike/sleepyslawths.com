import { Container } from 'react-bootstrap';
import Image from 'next/image';
import { Layout } from 'components/Layout/Layout';
import { Post } from 'types/post';
import { SocialBar } from 'components/SocialBar/SocialBar';
import fs from 'fs';
import { getAllFiles } from 'helpers/files';
import matter from 'gray-matter';
import path from 'path';
import styles from 'styles/pages/about.module.scss';

export default function Page() {
  return (
    <Layout title={'Who are Sleepy Slawths?'} isProse>
      <Container>
        <h1>About Sleepy Slawths</h1>
        <SocialBar />
        <p>
          <Image
            src="/static/images/sleepyslawths-profile.jpeg"
            width={300}
            height={300}
            alt="Sleepy Slawths profile photo"
            className={`rounded ${styles.profileImg}`}
          />
          We are Sleepy Slawths! A family who loves to play together and share our experiences with
          the world. Subscribe to our YouTube channels and follow us on social media to stay up to
          date with our latest content!
        </p>
        <p>
          We hope that our content will inspire others to spend time with their families and create
          lasting memories, whether they&apos;e recorded or not.
        </p>
        <p>
          For any questions, please reach out on any of our social media platforms or{' '}
          <a href="mailto:holler@sleepyslawths.com" style={{ textDecoration: 'none' }}>
            holler@sleepyslawths.com
          </a>
        </p>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const files = getAllFiles('posts'),
    tags = [];

  let latestPostDate: Date = null,
    latestPost: Post = {};

  files.map((file) => {
    if (!file.includes('posts')) return;

    const blogPostPath = path.join('posts', file.split('posts')[1]);
    const markdownWithMeta = fs.readFileSync(blogPostPath, 'utf-8');

    if (!markdownWithMeta) return;

    const { data: frontMatter } = matter(markdownWithMeta);

    if (frontMatter?.tags) tags.push(frontMatter.tags);

    if (!latestPostDate || (frontMatter?.date && new Date(frontMatter?.date) > latestPostDate)) {
      latestPostDate = new Date(frontMatter.date);
      latestPost.content = markdownWithMeta;
      latestPost.path = blogPostPath.replace('.mdx', '').replace('posts/', 'blog/');
    }
  });

  return {
    props: {
      latestPost,
      tags: [...new Set(tags.flat())],
    },
  };
};
