-- Kanji table
CREATE TABLE IF NOT EXISTS "kanji" (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    kanji VARCHAR(1) NOT NULL,
    level VARCHAR(7) NOT NULL,
    meanings TEXT[] NOT NULL,
    kun_readings TEXT[] NOT NULL,
    on_readings TEXT[] NOT NULL
);

-- User table
CREATE TABLE IF NOT EXISTS "accounts" (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    preferences JSON DEFAULT NULL
);

-- Knowledge Evaluation table
CREATE TABLE IF NOT EXISTS "knowledge_evaluation" (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    account_id UUID,
    level VARCHAR(7) DEFAULT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON UPDATE CASCADE
);

-- User Kanji History table
CREATE TABLE IF NOT EXISTS "user_kanji_history" (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    account_id UUID,
    kanji_id UUID,
    timestamp TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON UPDATE CASCADE,
    FOREIGN KEY (kanji_id) REFERENCES kanji (id) ON UPDATE CASCADE
);