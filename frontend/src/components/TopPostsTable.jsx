import { useEffect, useState } from "react";
import api from "../api/api";

export default function TopPostsTable() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/topics/trending-titles?top_n=5")
      .then(res => {
        setPosts(res.data.posts || []);
      })
      .catch(err => console.error(err));
  }, []);

  if (posts.length === 0) {
    return (
      <div className="h-[240px] flex items-center justify-center text-slate-400 animate-pulse">
        Loading top viral posts...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          {/* Header */}
          <thead className="bg-slate-100 sticky top-0 z-10">
            <tr className="text-slate-600 text-xs uppercase tracking-wide">

              <th className="py-3 px-3 text-left">
                #
              </th>

              <th className="py-3 px-3 text-left">
                Post Title
              </th>

              <th className="py-3 px-3 text-center">
                Score
              </th>

              <th className="py-3 px-3 text-center">
                Comments
              </th>

              <th className="py-3 px-3 text-center">
                Subreddit
              </th>

            </tr>
          </thead>

          {/* Body */}
          <tbody>

            {posts.map((post, index) => (
              <tr
                key={index}
                className="border-t hover:bg-blue-50 transition"
              >

                {/* Rank */}
                <td className="py-3 px-3 font-semibold text-slate-500">
                  {index + 1}
                </td>

                {/* Title */}
                <td className="py-3 px-3">

                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    title={post.title}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {post.title.length > 70
                      ? post.title.substring(0, 70) + "..."
                      : post.title}
                  </a>

                </td>

                {/* Score */}
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold text-xs">
                    🔥 {post.score}
                  </span>
                </td>

                {/* Comments */}
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    💬 {post.num_comments}
                  </span>
                </td>

                {/* Subreddit */}
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">
                    r/{post.subreddit}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
