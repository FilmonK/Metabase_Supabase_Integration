import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Load environment variables that have been setup in Supabase
const SUPABASE_URL = Deno.env.get("PROJECT_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SWID = Deno.env.get("ESPN_SWID")!;
const ESPN_S2 = Deno.env.get("ESPN_S2")!;

// Console logging to confirm they're being loaded but can be commented out
console.log("Environment Variables Loaded:");
console.log("SUPABASE_URL:", SUPABASE_URL);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY:",
  SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing"
);
console.log("SWID:", SWID ? "Loaded" : "Missing");
console.log("ESPN_S2:", ESPN_S2 ? "Loaded" : "Missing");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SEASON_YEAR = "2024";
const HEADERS = {
  "User-Agent": "Mozilla/5.0",
  Accept: "application/json, text/plain, */*",
  Referer: "https://fantasy.espn.com/",
  Origin: "https://fantasy.espn.com",
};
const COOKIES = `swid=${SWID}; espn_s2=${ESPN_S2}`;

async function fetchPlayerData() {
  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${SEASON_YEAR}/players?view=kona_playercard`;
  const response = await fetch(url, {
    headers: { ...HEADERS, Cookie: COOKIES },
  });
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
  const players = await response.json();
  
  return players.map((player) => ({
    player_id: player.id,
    player_name: player.fullName,
    position: player.defaultPositionId,
    team: player.proTeamId,
    ownership_percentage: player.ownership?.percentOwned || 0,
    start_percentage: player.ownership?.percentStarted || 0,
  }));
}

// Calling Supabase's Upsert method to handle conflicts during inserts
async function savePlayersToSupabase(players) {
  const { error } = await supabase.from("players_data").upsert(players, {
    onConflict: ["player_id"],
  });
  if (error) throw error;
}

serve(async () => {
  try {
    console.log("Fetching player data...");
    const players = await fetchPlayerData();
    console.log(`Fetched ${players.length} players. Saving to Supabase...`);
    await savePlayersToSupabase(players);
    return new Response("Player data synced successfully", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
});
