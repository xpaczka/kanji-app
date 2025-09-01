CREATE TABLE IF NOT EXISTS user_kanji (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    kanji_id UUID NOT NULL,
    stage INT NOT NULL,
    next_review_at TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE,
    FOREIGN KEY (kanji_id) REFERENCES kanji (id) ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION get_learn_items(user_auth_id UUID)
RETURNS TABLE (
    id UUID,
    kanji VARCHAR(1),
    level VARCHAR(7),
    meanings TEXT[],
    kun_readings TEXT[],
    on_readings TEXT[]
) AS $$
    BEGIN
        RETURN QUERY
            WITH user_kanji_items AS (
                SELECT kanji_id from user_kanji
                WHERE user_id = user_auth_id
            )

            SELECT * from kanji
            WHERE kanji.id NOT IN (SELECT user_kanji_items.kanji_id from user_kanji_items)
            ORDER BY level DESC, kanji ASC 
            LIMIT 5;
    END;
$$ LANGUAGE plpgsql;