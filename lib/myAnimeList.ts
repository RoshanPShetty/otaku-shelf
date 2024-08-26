// lib/myAnimeList.ts
export const searchAnime = async (query: string) => {
	try {
		const response = await fetch(`/api/anime?q=${query}`);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || "An error occurred");
		}
		return data;
	} catch (error) {
		console.error("Error fetching anime:", error);
		return null;
	}
};
