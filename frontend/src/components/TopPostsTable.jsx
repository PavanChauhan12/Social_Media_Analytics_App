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

  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="font-semibold mb-3">Top Viral Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-400">No data available</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Title</th>
                <th>Score</th>
                <th>Comments</th>
                <th>Subreddit</th>
              </tr>
            </thead>

            <tbody>

              {posts.map((post, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-2 pr-2">
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {post.title.substring(0, 60)}...
                    </a>
                  </td>

                  <td className="text-center font-medium">
                    🔥 {post.score}
                  </td>

                  <td className="text-center">
                    💬 {post.num_comments}
                  </td>

                  <td className="text-center text-gray-500">
                    r/{post.subreddit}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}
