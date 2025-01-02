-- Create the players_data table in Supabase
CREATE TABLE players_data (
    player_id BIGINT PRIMARY KEY,
    player_name TEXT NOT NULL,
    position INTEGER NOT NULL,
    team INTEGER,
    ownership_percentage NUMERIC,
    start_percentage NUMERIC
);

-- Add unique index on player_id
CREATE UNIQUE INDEX idx_players_data_player_id ON players_data(player_id);

