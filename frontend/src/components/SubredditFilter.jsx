import { useState } from "react";

export default function SubredditFilter({ selected, onChange }) {

  const presets = [
    "technology",
    "india",
    "machinelearning",
    "cricket",
    "trump",
    "startups"
  ];

  const [input, setInput] = useState("");

  // Dropdown change
  const handleDropdown = (e) => {
    onChange(e.target.value);
  };

  // Search submit
  const handleSearch = () => {
    if (!input.trim()) return;

    onChange(input.toLowerCase().trim());
    setInput("");
  };

  return (
    <div className="flex items-center gap-3">

      {/* Dropdown */}
      <select
        value={selected}
        onChange={handleDropdown}
        className="px-4 py-2 rounded-lg border shadow-sm text-sm"
      >
        <option value="all">All Subreddits</option>

        {presets.map((sub) => (
          <option key={sub} value={sub}>
            r/{sub}
          </option>
        ))}
      </select>

      {/* Search */}
      <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter subreddit"
          className="outline-none text-sm w-40"
        />

        <button
          onClick={handleSearch}
          className="ml-2 text-blue-600 font-semibold"
        >
          Go
        </button>

      </div>

    </div>
  );
}
