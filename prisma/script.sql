-- Active: 1735309583107@@10.0.3.6@5432@homo-qualy@public

#npx prisma migrate dev --name add_index_to_photoanalisys
#npx prisma migrate deploy



SELECT id, "idReport", index,  description FROM "PhotoAnalisys" WHERE "idReport" = 1 ORDER BY "index" asc LIMIT 100

WITH RankedRows AS (
  SELECT
    id,
    "idReport",
    ROW_NUMBER() OVER (PARTITION BY "idReport" ORDER BY id) AS new_index
  FROM "PhotoAnalisys"
)
UPDATE "PhotoAnalisys"
SET index = RankedRows.new_index
FROM RankedRows
WHERE "PhotoAnalisys".id = RankedRows.id;