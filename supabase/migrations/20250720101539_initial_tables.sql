-- Kanji table
CREATE TABLE IF NOT EXISTS kanji (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    kanji VARCHAR(1) NOT NULL,
    level VARCHAR(7) NOT NULL,
    meanings TEXT[] NOT NULL,
    kun_readings TEXT[] NOT NULL,
    on_readings TEXT[] NOT NULL
);

-- Preferences table
CREATE TABLE IF NOT EXISTS preferences (
    user_id UUID,
    values JSON DEFAULT NULL,

    FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE
);

-- User Kanji History table
CREATE TABLE IF NOT EXISTS user_kanji_history (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID,
    kanji_id UUID,
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE,
    FOREIGN KEY (kanji_id) REFERENCES kanji (id) ON UPDATE CASCADE
);