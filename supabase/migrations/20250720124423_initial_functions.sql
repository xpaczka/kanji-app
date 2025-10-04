CREATE OR REPLACE FUNCTION get_user_kanji(user_auth_id UUID)
RETURNS TABLE (
    id UUID,
    kanji VARCHAR(1),
    level VARCHAR(7),
    meanings TEXT[],
    kun_readings TEXT[],
    on_readings TEXT[],
    user_kanji_uuid UUID,
    kanji_stage INT,
    next_review_at TIMESTAMP
) AS $$
    BEGIN
        RETURN QUERY
            WITH user_kanji_items AS (
                SELECT 
                    user_kanji.id,
                    user_kanji.kanji_id, 
                    user_kanji.stage, 
                    user_kanji.next_review_at 
                FROM user_kanji
                WHERE user_id = user_auth_id
            )

            SELECT 
                kanji.*, 
                user_kanji_items.id AS user_kanji_uuid,
                user_kanji_items.stage AS kanji_stage, 
                user_kanji_items.next_review_at 
            FROM kanji
            JOIN user_kanji_items ON kanji.id = user_kanji_items.kanji_id
            WHERE kanji.id IN (SELECT user_kanji_items.kanji_id FROM user_kanji_items);
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
                SELECT kanji_id FROM user_kanji
                WHERE user_id = user_auth_id
            )

            SELECT * FROM kanji
            WHERE kanji.id NOT IN (SELECT user_kanji_items.kanji_id FROM user_kanji_items)
            ORDER BY level DESC, kanji ASC;
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
    user_kanji_uuid UUID,
    kanji_stage INT,
    next_review_at TIMESTAMP
) AS $$
    BEGIN
        RETURN QUERY
            WITH user_kanji_items AS (
                SELECT 
                    user_kanji.id,
                    user_kanji.kanji_id, 
                    user_kanji.stage, 
                    user_kanji.next_review_at 
                FROM user_kanji
                WHERE user_id = user_auth_id
                    AND user_kanji.stage < 10
                    AND (user_kanji.next_review_at IS NULL OR user_kanji.next_review_at <= NOW())
            )

            SELECT 
                kanji.*, 
                user_kanji_items.id AS user_kanji_uuid,
                user_kanji_items.stage AS kanji_stage, 
                user_kanji_items.next_review_at 
            FROM kanji
            JOIN user_kanji_items ON kanji.id = user_kanji_items.kanji_id
            WHERE kanji.id IN (SELECT user_kanji_items.kanji_id FROM user_kanji_items);
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_kanji_with_stage(user_auth_id UUID)
RETURNS TABLE (
    id UUID,
    kanji VARCHAR(1),
    level VARCHAR(7),
    meanings TEXT[],
    kun_readings TEXT[],
    on_readings TEXT[],
    kanji_stage INT
) AS $$
    BEGIN
        RETURN QUERY
            WITH user_kanji_items AS (
                SELECT 
                    user_kanji.kanji_id,
                    user_kanji.stage 
                FROM user_kanji
                WHERE user_id = user_auth_id
            )

            SELECT
                kanji.*, 
                user_kanji_items.stage AS kanji_stage
            FROM kanji
            LEFT JOIN user_kanji_items ON kanji.id = user_kanji_items.kanji_id
            ORDER BY level DESC, kanji ASC;
    END;
$$ LANGUAGE plpgsql;