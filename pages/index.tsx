import { Col, Container, Row } from 'react-bootstrap';

import { BlogPreview } from 'components/blog/BlogPreview/BlogPreview';
import Image from 'next/image';
import { ImageWrapper } from 'components/blog/ImageWrapper/ImageWrapper';
import { Layout } from 'components/Layout/Layout';
import Link from 'next/link';
import { Post } from 'types/post';
import { SocialBar } from 'components/SocialBar/SocialBar';
import fs from 'fs';
import { getAllFiles } from 'helpers/files';
import matter from 'gray-matter';
import path from 'path';
import styles from 'styles/pages/index.module.scss';

export default function Home({
  latestPost = {},
  tags = [],
}: {
  latestPost?: Post;
  tags?: string[];
}) {
  return (
    <Layout
      pageSEO="common"
      title={'Sleepy Slawths | Family Vlog & Gaming Channel'}
      description={`Join us in family and gaming fun! We are 
        a family of five who love to play video games together 
        and share our experiences with the world. We also vlog 
        about our daily lives and adventures. Subscribe to our 
        YouTube channels and follow us on social media to 
        stay up to date with our latest content`}
    >
      <Container className={styles.index}>
        <Row>
          <Col>
            <h1 className={styles.h1}>
              🦥 sleepyslawths<span className={styles.suffix}>.com</span>
            </h1>
            <span className={styles.subtitle}>
              Christian family {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                href="https://linktr.ee/sleepyslawths"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                vlog and gaming content creators
              </a>
            </span>
            <SocialBar />
            <div className={styles.imageFrame}>
              <ImageWrapper>
                <Image
                  src="/static/images/family-gaming.jpg"
                  alt={`Photo of Mission Mike playing videogames with his kids.
                   They are sitting at a computer desk with a green screen behind them.`}
                  style={{ objectFit: 'cover' }}
                  fill
                />
              </ImageWrapper>
              <p>
                Playing video games together and recording our gameplay is the best!! Check out our
                Gaming channels on YouTube:{' '}
                <a
                  href="https://www.youtube.com/@michaelndad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Michael &amp; Dad Gaming &amp; Stuff
                </a>{' '}
                and{' '}
                <a
                  href="https://www.youtube.com/@sleepyslawthgaming"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sleepy Slawth Gaming
                </a>
                .
              </p>
            </div>
          </Col>
          <Col lg className="d-flex flex-column justify-content-center">
            <Container>
              <span className={styles.h2}>The Latest</span>
              <BlogPreview post={latestPost} />
            </Container>
            <Container>
              <br />
              <h2 className={styles.h2}>Tags &amp; Categories</h2>
              {tags.map((tag, index) => {
                return (
                  <Link href={`/blog/tag/${tag}`} key={index}>
                    <span className={styles.tagLink}>{tag}</span>
                  </Link>
                );
              })}
            </Container>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            <Container className={styles.quoteContainer}>
              <span className={`${styles.h2} d-flex justify-content-center align-items-center`}>
                <span className="display-4">🍕</span> <span>Food for Thought</span>
              </span>
              <blockquote>
                <p>
                  <em>
                    &quot;What&apos;s the difference between regular parsley and Italian parsley?
                    Does Italian parsley have an accent or something?&quot;
                  </em>
                </p>
                <p style={{ textAlign: 'right' }}>
                  &mdash;
                  <a
                    href="https://www.youtube.com/channel/UCifuv8WtP23D0I_RHmj-wrA"
                    target="_blank"
                    rel="noreferrer noopener"
                  ></a>{' '}
                  Michael, at 9YO.
                </p>
              </blockquote>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg>
            <div>
              <ImageWrapper>
                <Image
                  src="/static/images/family-school.jpg"
                  alt="Sleepy Slawth family getting ready for a morning of homeschooling."
                  style={{ objectFit: 'contain' }}
                  fill
                />
              </ImageWrapper>
              <p className="text-center">
                Family <span style={{ color: 'red' }}>❤️</span>
                <br /> <br />
              </p>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col className="d-flex flex-column justify-content-center p-5">
            <Container className={styles.quoteContainer}>
              <span className={`${styles.h2} d-flex justify-content-center align-items-center`}>
                <span>A Memorable Quote</span>
                <span className="display-4" style={{ paddingLeft: '1rem' }}>
                  💬
                </span>
              </span>
              <blockquote>
                <p>
                  <em>
                    &quot;What&apos;s the difference between regular parsley and Italian parsley?
                    Does Italian parsley have an accent or something?&quot;
                  </em>
                </p>
                <p style={{ textAlign: 'right' }}>
                  &mdash;
                  <a
                    href="https://www.youtube.com/channel/UCifuv8WtP23D0I_RHmj-wrA"
                    target="_blank"
                    rel="noreferrer noopener"
                  ></a>{' '}
                  Michael, at 9YO.
                </p>
              </blockquote>
            </Container>
          </Col>
        </Row> */}
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

    if (frontMatter?.draft === true) return;

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
