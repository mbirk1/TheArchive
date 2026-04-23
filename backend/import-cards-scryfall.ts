import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Pool } from 'pg';
import { statSync } from 'node:fs';

const DB_CONFIG = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'sideboard-db',
  password: 'V40jN2gavmfj1q9Ln5Aq',
  schema: 'sideboard',
};

const BATCH_SIZE = 500;
const FILE_PATH = process.argv[2];

if (!FILE_PATH) {
  console.error('Usage: tsx import-cards.ts <path-to-json>');
  process.exit(1);
}

const pool = new Pool(DB_CONFIG);

async function insertBatch(pool: Pool, batch: any[]): Promise<number> {
  const client = await pool.connect();
  let inserted = 0;
  try {
    await client.query('BEGIN');

    for (const card of batch) {
      const result = await client.query(
        `INSERT INTO sideboard.card (
          id, oracle_id, name, lang, released_at, layout,
          image_uris, mana_cost, cmc, type_line, oracle_text,
          colors, color_identity, keywords, produced_mana,
          legalities, games, rarity, set_code, set_name,
          collector_number, artist, border_color, frame,
          full_art, foil, nonfoil, reprint, prices, raw
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,
          $12,$13,$14,$15,$16,$17,$18,$19,$20,
          $21,$22,$23,$24,$25,$26,$27,$28,$29,$30
        )
        ON CONFLICT (id) DO NOTHING`,
        [
          card.id,
          card.oracle_id ?? null,
          card.name ?? null,
          card.lang ?? null,
          card.released_at ?? null,
          card.layout ?? null,
          card.image_uris ? JSON.stringify(card.image_uris) : null,
          card.mana_cost ?? null,
          card.cmc ?? null,
          card.type_line ?? null,
          card.oracle_text ?? null,
          card.colors ?? [],
          card.color_identity ?? [],
          card.keywords ?? [],
          card.produced_mana ?? [],
          card.legalities ? JSON.stringify(card.legalities) : null,
          card.games ?? [],
          card.rarity ?? null,
          card.set ?? null,
          card.set_name ?? null,
          card.collector_number ?? null,
          card.artist ?? null,
          card.border_color ?? null,
          card.frame ?? null,
          card.full_art ?? false,
          card.foil ?? false,
          card.nonfoil ?? false,
          card.reprint ?? false,
          card.prices ? JSON.stringify(card.prices) : null,
          JSON.stringify(card),
        ],
      );
      inserted += result.rowCount ?? 0;
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
  return inserted;
}

function formatBytes(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function renderProgress(
  processed: number,
  bytesRead: number,
  totalBytes: number,
  imported: number,
  skipped: number,
) {
  const percent = Math.min((bytesRead / totalBytes) * 100, 100);
  const filled = Math.floor(percent / 2);
  const bar = '█'.repeat(filled) + '░'.repeat(50 - filled);
  process.stdout.write(
    `\r[${bar}] ${percent.toFixed(1)}% | ${formatBytes(bytesRead)}/${formatBytes(totalBytes)} | Karten: ${processed} | ✅ ${imported} | ⏭ ${skipped}`,
  );
}

async function main() {
  console.log(`Importiere: ${FILE_PATH}`);

  const totalBytes = statSync(FILE_PATH).size;
  console.log(`Dateigröße: ${formatBytes(totalBytes)}\n`);

  const fileStream = createReadStream(FILE_PATH);
  const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

  let batch: any[] = [];
  let total = 0;
  let skipped = 0;
  let processed = 0;
  let bytesRead = 0;

  fileStream.on('data', (chunk: Buffer) => {
    bytesRead += chunk.length;
  });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '[' || trimmed === ']') continue;

    const json = trimmed.endsWith(',') ? trimmed.slice(0, -1) : trimmed;

    try {
      const card = JSON.parse(json);
      processed++;
      batch.push(card);

      if (batch.length >= BATCH_SIZE) {
        const inserted = await insertBatch(pool, batch);
        total += inserted;
        skipped += batch.length - inserted;
        batch = [];
        renderProgress(processed, bytesRead, totalBytes, total, skipped);
      }
    } catch (e) {
      console.error('\nParse error, skipping:', (e as Error).message);
    }
  }

  if (batch.length > 0) {
    const inserted = await insertBatch(pool, batch);
    total += inserted;
    skipped += batch.length - inserted;
  }

  renderProgress(processed, totalBytes, totalBytes, total, skipped);
  console.log(
    `\n\n✅ Fertig! Verarbeitet: ${processed} | Importiert: ${total} | Übersprungen: ${skipped}`,
  );
  await pool.end();
}

main().catch(console.error);
