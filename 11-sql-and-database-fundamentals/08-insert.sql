/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: INSERT Operations & Bulk Ingestion
  ==============================================================================

  1. WHAT IS INSERT?
     The `INSERT INTO` statement adds one or more new rows into a database table.

  2. REAL-LIFE ANALOGY:
     Writing a New Entry in a Guestbook:
     - Single insert: Signing your name in the guestbook when you arrive.
     - Bulk insert: A tour guide handing the hotel clerk a single sheet containing
       the names of 50 tourists at once, registered in one trip.

  3. JARGON BUSTER:
     - Bulk Insert: Inserting multiple rows in a single SQL statement
       (`VALUES (...), (...), (...)`) for 10x-50x faster database throughput.
     - `ON CONFLICT DO NOTHING / UPDATE` (Upsert): If row already exists by unique key,
       update it instead of crashing with a duplicate key error!
*/

DROP TABLE IF EXISTS registered_members;
CREATE TABLE registered_members (
    member_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    points INT DEFAULT 0
);

-- ── 1. SINGLE ROW INSERT WITH RETURNING ──────────────────────────────────────
INSERT INTO registered_members (username, points)
VALUES ('carl_joseph', 150)
RETURNING member_id, username;

-- ── 2. EFFICIENT MULTI-ROW (BULK) INSERT ─────────────────────────────────────
INSERT INTO registered_members (username, points)
VALUES
    ('alice_w', 200),
    ('bob_m', 80),
    ('diana_k', 320);

-- ── 3. UPSERT (ON CONFLICT): Handle duplicate safely ─────────────────────────
INSERT INTO registered_members (username, points)
VALUES ('carl_joseph', 500)
ON CONFLICT (username) 
DO UPDATE SET points = EXCLUDED.points;

-- Check final state
SELECT username, points FROM registered_members ORDER BY points DESC;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  username    | points
  ------------+-------
  carl_joseph | 500
  diana_k     | 320
  alice_w     | 200
  bob_m       | 80
*/