import React, { useEffect } from 'react';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

const HomePage = () => {
  // const { authUser } = useAuthStore();
  const { posts, isPostsLoading, getAllPosts } = usePostStore();

  useEffect(() => {
    getAllPosts();
  }, []);


  if (isPostsLoading) return <h1>Loading Posts!</h1>;

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      {posts.map((p) => (
        <div
          key={p._id}
          className="flex justify-between items-start border-b pb-4"
        >
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-3 mb-1">
              <img
                src={p.authorImage}
                alt={p.authorName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-gray-700">
                {p.authorName}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(p.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <Link to={`/posts/${p._id}`}>
              <h2 className="text-lg font-semibold text-gray-900 hover:underline">
                {p.title}
              </h2>
            </Link>
            <div className="mt-2 flex items-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                <Heart className="w-4 h-4" />
                <span>Like</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </div>
            </div>
          </div>
          {p.coverImage && (
            <img
              src={p.coverImage ? p.coverImage : `https://cdn-icons-png.flaticon.com/512/1326/1326377.png`}
              alt={"img"}
              className="w-44 h-24 object-cover rounded-md flex-shrink-0"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
