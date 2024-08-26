// app/api/myAnimeList/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api.myanimelist.net/v2";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const query = url.searchParams.get("q");

	if (!query) {
		return NextResponse.json(
			{ error: "Query parameter is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await axios.get(`${API_URL}/anime`, {
			params: {
				q: query,
				limit: 10,
			},
			headers: {
				"X-MAL-CLIENT-ID": process.env.NEXT_PUBLIC_MAL_CLIENT_ID,
			},
		});
		return NextResponse.json(response.data);
	} catch (error) {
		console.error("Error fetching anime:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}
