-- Kanji table
CREATE TABLE IF NOT EXISTS kanji (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    kanji VARCHAR(1) NOT NULL,
    level VARCHAR(7) NOT NULL,
    meanings TEXT[] NOT NULL,
    kun_readings TEXT[] NOT NULL,
    on_readings TEXT[] NOT NULL
);

-- User Kanji table
CREATE TABLE IF NOT EXISTS user_kanji (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    kanji_id UUID NOT NULL,
    stage INT NOT NULL,
    next_review_at TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE,
    FOREIGN KEY (kanji_id) REFERENCES kanji (id) ON UPDATE CASCADE
);