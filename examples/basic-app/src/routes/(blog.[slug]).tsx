/**
 * Dynamic Blog Post Route: /blog/:slug
 */

import { useParams } from '@webframework/core';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
}

// Mock data - would come from database in production
const BLOG_POSTS: Record<string, BlogPost> = {
  'hello-world': {
    slug: 'hello-world',
    title: 'Hello World',
    excerpt: 'Getting started with WebFramework',
    content: 'WebFramework is a fast, opinionated React framework...',
    author: 'Alice',
    publishedAt: '2024-01-01',
  },
  'routing-guide': {
    slug: 'routing-guide',
    title: 'Routing Guide',
    excerpt: 'Understanding file-system routing',
    content: 'Learn how to use WebFramework routing with bracket syntax...',
    author: 'Bob',
    publishedAt: '2024-01-05',
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS[slug as string];

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post not found</h1>
          <a href="/" className="text-blue-400 hover:text-blue-300">
            ← Back home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white py-16">
      <article className="container mx-auto max-w-2xl px-4">
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-slate-400">
            By {post.author} on{' '}
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </header>

        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-slate-300">{post.excerpt}</p>
          <div className="mt-8 text-slate-300 leading-relaxed">
            {post.content}
          </div>
        </div>

        <footer className="border-t border-slate-700 pt-8">
          <a href="/" className="text-blue-400 hover:text-blue-300">
            ← Back home
          </a>
        </footer>
      </article>
    </div>
  );
}
