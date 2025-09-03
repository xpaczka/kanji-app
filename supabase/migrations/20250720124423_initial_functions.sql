CREATE OR REPLACE FUNCTION update_user_kanji_history (
    user_id UUID,
    kanji_id UUID,
    updated_at TIMESTAMP
) RETURNS VOID AS $$
    BEGIN
        INSERT INTO user_kanji_history (user_id, kanji_id, updated_at)
        VALUES (user_id, kanji_id, updated_at)
        ON CONFLICT (user_id, kanji_id)
        DO UPDATE SET updated_at = EXCLUDED.updated_at;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_kanji_history(user_id UUID) 
RETURNS TABLE (
    kanji VARCHAR(1),
    level VARCHAR(7),
    updated_at TIMESTAMP
) AS $$
    BEGIN
        SELECT kanji, level, updated_at
        FROM user_kanji_history
        LEFT JOIN kanji ON user_kanji_history.kanji_id = kanji.id
        WHERE user_kanji_history.user_id = user_id
        ORDER BY timestamp DESC;
    END;
$$ LANGUAGE plpgsql;

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

CREATE OR REPLACE FUNCTION get_review_items(user_auth_id UUID)
RETURNS TABLE (
    id UUID,
    kanji VARCHAR(1),
    level VARCHAR(7),
    meanings TEXT[],
    kun_readings TEXT[],
    on_readings TEXT[],
    stage INT,
    next_review_at TIMESTAMP
) AS $$
    BEGIN
        RETURN QUERY
            WITH user_kanji_items AS (
                SELECT 
                    kanji_id, 
                    user_kanji.stage, 
                    user_kanji.next_review_at 
                FROM user_kanji
                WHERE user_id = user_auth_id
            )

            SELECT 
                kanji.*, 
                user_kanji_items.stage, 
                user_kanji_items.next_review_at 
            FROM kanji
            JOIN user_kanji_items ON kanji.id = user_kanji_items.kanji_id
            WHERE kanji.id IN (SELECT user_kanji_items.kanji_id from user_kanji_items);
    END;
$$ LANGUAGE plpgsql;