import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from '@/lib/constants';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import remarkGfm from 'remark-gfm';
import MdxComponents from '@/components/MdxComponents';
import TypewriterTitle from '@/components/TypewriterTitle';
import JsonLd from '@/components/JsonLd';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: new Date(post.date).toISOString(),
      authors: [AUTHOR_NAME],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: new Date(post.date).toISOString(),
          author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
          url: `${SITE_URL}/blog/${slug}`,
          keywords: post.tags,
        }}
      />

      {/* 뒤로가기 */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-12"
      >
        ← BACK
      </Link>

      {/* 포스트 헤더 */}
      <header className="mb-8 border-b border-black pb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
            {post.category}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs font-bold tracking-widest text-gray-400">
            {format(new Date(post.date), 'yyyy. MM. dd', { locale: ko })}
          </span>
        </div>
        <TypewriterTitle
          text={post.title}
          className="text-4xl font-black leading-tight tracking-tight mb-6"
        />
        <p className="text-base text-gray-500 leading-relaxed">{post.excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold border border-black px-2.5 py-1 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 본문 */}
      <article className="prose">
        <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={MdxComponents} />
      </article>

      {/* 하단 */}
      <footer className="mt-20 pt-10 border-t border-black">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-black tracking-widest uppercase hover:opacity-50 transition-opacity"
        >
          ← 목록으로
        </Link>
      </footer>
    </div>
  );
}
