const fetch = require('node-fetch');

// 🔎 Function to search for songs
async function searchSongs(query) {
    try {
        const url = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (response.data && response.data.data) {
            return response.data.data.results.map(song => ({
                id: song.id,
                title: song.name,
                artist: song.primaryArtists,
                url: song.url, // Play URL
            }));
        }
        return [];
    } catch (error) {
        console.error("❌ Error fetching search results:", error);
        return [];
    }
}

// 🎵 Function to get song details (including streaming URL)
async function getSongDetails(songId) {
    try {
        const url = `https://saavn.dev/api/songs?id=${songId}`;
        const response = await fetch(url);
        if (response.data && response.data.data.length > 0) {
            const song = response.data.data[0];
            return {
                title: song.name,
                artist: song.primaryArtists,
                playUrl: song.url, // Streaming link
                downloadUrl: song.downloadUrl?.[4]?.url || "Not available",
            };
        }
        return null;
    } catch (error) {
        console.error("❌ Error fetching song details:", error);
        return null;
    }
}

module.exports = { searchSongs, getSongDetails };
