// import React, { useEffect } from 'react';
// import { usePostStore } from '../store/usePostStore';
// import { Link } from 'react-router-dom';
// import { Heart, MessageCircle } from 'lucide-react';

// export default function HomePage() {
//   const approvedBlogs = usePostStore((state) => state.approvedBlogs);
//   const isApproveBlogLoading = usePostStore((state) => state.isApproveBlogLoading);
//   const approvedPosts = usePostStore((state) => state.approvedPosts);
//   const searchQuery = usePostStore((state) => state.searchQuery);

//   useEffect(() => {
//     approvedPosts();
//   }, [approvedPosts]);

//   if (isApproveBlogLoading) return <h1>Loading Posts!</h1>;

//   const filtered = searchQuery
//     ? approvedBlogs.filter((p) =>
//         p.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : approvedBlogs;

//   return (
//     <div className="p-4 space-y-6 max-w-3xl mx-auto">
//       {filtered.length === 0 ? (
//         <div className="text-center text-gray-500 mt-10">
//           {searchQuery ? 'No posts match your search.' : 'No posts available.'}
//         </div>
//       ) : (
//         filtered.map((p) => (
//           <div key={p._id} className="flex justify-between items-start border-b pb-4">
//             <div className="flex-1 pr-4">
//               <div className="flex items-center space-x-3 mb-1">
//                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white font-medium">
//                     {p.author.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <span className="text-xs text-gray-400">
//                   {new Date(p.createdAt).toLocaleDateString('en-GB', {
//                     day: 'numeric',
//                     month: 'short',
//                     year: 'numeric',
//                   })}
//                 </span>
//               </div>
//               <Link to={`/posts/${p._id}`}>
//                 <h2 className="text-lg font-semibold text-gray-900 hover:underline">
//                   {p.title}
//                 </h2>
//               </Link>
//               {/* <div className="mt-2 flex items-center space-x-4 text-gray-500">
//                 <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
//                   <Heart className="w-4 h-4" />
//                   <span>Like</span>
//                 </div>
//                 <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
//                   <MessageCircle className="w-4 h-4" />
//                   <span>Comment</span>
//                 </div>
//               </div> */}
//             </div>
//             {p.coverImage && (
//               <img
//                 src={p.coverImage}
//                 alt="Cover"
//                 className="w-44 h-24 object-cover rounded-md flex-shrink-0"
//               />
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


import React, { useEffect } from 'react';
import { usePostStore } from '../store/usePostStore';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, User, Search, BookOpen } from 'lucide-react';

export default function HomePage() {
  const approvedBlogs = usePostStore((state) => state.approvedBlogs);
  const isApproveBlogLoading = usePostStore((state) => state.isApproveBlogLoading);
  const approvedPosts = usePostStore((state) => state.approvedPosts);
  const searchQuery = usePostStore((state) => state.searchQuery);

  useEffect(() => {
    approvedPosts();
  }, [approvedPosts]);

  if (isApproveBlogLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-700">Loading Posts...</h1>
        </div>
      </div>
    );
  }

  const filtered = searchQuery
    ? approvedBlogs.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : approvedBlogs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Amazing Stories
          </h1>
          <p className="text-gray-600 text-lg">
            Explore the latest approved posts from our community
          </p>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              {searchQuery ? (
                <>
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No posts match your search
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or explore all posts
                  </p>
                </>
              ) : (
                <>
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No posts available
                  </h3>
                  <p className="text-gray-500">
                    Check back later for new content
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Posts Grid */
          <div className="space-y-6">
            {filtered.map((p) => (
              <article 
                key={p._id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Content Section */}
                    <div className="flex-1 space-y-4">
                      {/* Author & Date */}
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {p.author.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 text-sm">
                            {p.author.name}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(p.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <Link to={`/posts/${p._id}`} className="block">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors duration-200 group-hover:text-blue-600">
                          {p.title}
                        </h2>
                      </Link>

                      {/* Interaction Buttons */}
                      {/* <div className="flex items-center space-x-6 pt-2">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200 group/like">
                          <Heart className="w-5 h-5 group-hover/like:scale-110 transition-transform duration-200" />
                          <span className="text-sm font-medium">Like</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 group/comment">
                          <MessageCircle className="w-5 h-5 group-hover/comment:scale-110 transition-transform duration-200" />
                          <span className="text-sm font-medium">Comment</span>
                        </button>
                      </div> */}
                    </div>

                    {/* Cover Image */}
                    {p.coverImage && (
                      <div className="sm:w-52 sm:h-32 w-full h-48 flex-shrink-0">
                        <img
                          src={p.coverImage}
                          alt="Cover"
                          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}