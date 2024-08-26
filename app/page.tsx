"use client";
import { useState } from "react";
import { searchAnime } from "../lib/myAnimeList";
import { motion } from "framer-motion";
import Link from "next/link";

const HomePage = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async () => {
		setLoading(true);
		setError(null);
		const data = await searchAnime(query);
		if (data) {
			setResults(data.data || []);
		} else {
			setError("Failed to fetch data");
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
			<h1 className="text-4xl font-bold mt-10">Anime Search</h1>
			<div className="mt-6 flex">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for an anime..."
					className="px-4 py-2 rounded-l-lg text-black"
				/>
				<button
					onClick={handleSearch}
					className="px-4 py-2 bg-blue-500 rounded-r-lg hover:bg-blue-600"
				>
					Search
				</button>
			</div>
			{loading && <p className="mt-4">Loading...</p>}
			{error && <p className="mt-4 text-red-500">{error}</p>}
			<motion.div
				className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{results.map((anime) => (
					<Link key={anime.node.id} href={`/anime/${anime.node.id}`}>
						<motion.div
							className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
							whileHover={{ scale: 1.05 }}
						>
							<img
								src={anime.node.main_picture.medium}
								alt={anime.node.title}
								className="rounded-lg w-full"
							/>
							<h2 className="mt-4 text-lg font-semibold">{anime.node.title}</h2>
						</motion.div>
					</Link>
				))}
			</motion.div>
		</div>
	);
};

export default HomePage;
