import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// SWID and ESPN_S2 are parameters needed to successfully make the call
const SEASON_YEAR = '2024';
const SWID = process.env.SWID;
const ESPN_S2 = process.env.ESPN_S2;

// Header information pulled from Chrome browser developer tools
const HEADERS = {
    'User-Agent': 'Mozilla/5.0',
    Accept: 'application/json, text/plain, */*',
    Referer: 'https://fantasy.espn.com/',
    Origin: 'https://fantasy.espn.com',
    'x-fantasy-source': 'kona',
    'x-fantasy-filter': '{"filterActive":null}'
};

const COOKIES = `swid=${SWID}; espn_s2=${ESPN_S2}`;

const fetchPlayerData = async () => {
    const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${SEASON_YEAR}/players?view=kona_playercard`;
    try {
        console.log(`Fetching player data...`);
        const response = await fetch(url, {
            headers: {
                ...HEADERS,
                Cookie: COOKIES
            },
        });
        if (!response.ok) {
            console.error(`Failed to fetch data: ${response.status}`);
            return [];
        }
        const data = await response.json();
        const players = data.map((player) => ({
            player_id: player.id,
            player_name: player.fullName,
            position: player.defaultPositionId,
            team: player.proTeamId,
            ownership_percentage: player.ownership?.percentOwned || 0,
            start_percentage: player.ownership?.percentStarted || 0,
        }));
        return players;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        return [];
    }
};

const main = async () => {
    const players = await fetchPlayerData();
    if (players.length > 0) {
        console.log("Fetched player data:", players);
    } else {
        console.log("No player data fetched.");
    }
};

main();
