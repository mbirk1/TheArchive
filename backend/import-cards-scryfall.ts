import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Pool } from 'pg';
import { statSync } from 'node:fs';

const DB_CONFIG = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'archive-db',
  password: 'V40jN2gavmfj1q9Ln5Aq',
  schema: 'archive',
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
        `INSERT INTO archive.card (
          id, oracle_id, object, multiverse_ids, mtgo_id, arena_id,
          tcgplayer_id, cardmarket_id, name, lang, released_at, uri,
          scryfall_uri, layout, highres_image, image_status, image_uris,
          mana_cost, cmc, type_line, oracle_text, colors, color_identity,
          keywords, produced_mana, all_parts, legalities, games, reserved,
          game_changer, foil, nonfoil, finishes, oversized, promo, reprint,
          variation, set_id, set_code, set_name, set_type, set_uri,
          set_search_uri, scryfall_set_uri, rulings_uri, prints_search_uri,
          collector_number, digital, rarity, flavor_text, card_back_id,
          artist, artist_ids, illustration_id, border_color, frame,
          full_art, textless, booster, story_spotlight, edhrec_rank,
          penny_rank, prices, related_uris, purchase_uris, raw
        ) VALUES (
                   $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,
                   $17::jsonb,$18,$19,$20,$21,$22,$23,$24::jsonb,$25,$26::jsonb,
                   $27::jsonb,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,
                   $40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,
                   $55,$56,$57,$58,$59,$60,$61,$62,$63::jsonb,$64::jsonb,$65::jsonb,$66::jsonb
                 )
           ON CONFLICT (id) DO NOTHING`,
        [
          card.id,
          card.oracle_id ?? null,
          card.object ?? null,
          card.multiverse_ids?.length ? card.multiverse_ids : [],
          card.mtgo_id ?? null,
          card.arena_id ?? null,
          card.tcgplayer_id ?? null,
          card.cardmarket_id ?? null,
          card.name ?? null,
          card.lang ?? null,
          card.released_at ?? null,
          card.uri ?? null,
          card.scryfall_uri ?? null,
          card.layout ?? null,
          card.highres_image ?? false,
          card.image_status ?? null,
          card.image_uris ? JSON.stringify(card.image_uris) : null,
          card.mana_cost ?? null,
          card.cmc ?? null,
          card.type_line ?? null,
          card.oracle_text ?? null,
          card.colors ?? [],
          card.color_identity ?? [],
          JSON.stringify(card.keywords ?? []),
          card.produced_mana ?? [],
          card.all_parts ? JSON.stringify(card.all_parts) : null,
          card.legalities ? JSON.stringify(card.legalities) : null,
          card.games ?? [],
          card.reserved ?? false,
          card.game_changer ?? false,
          card.foil ?? false,
          card.nonfoil ?? false,
          card.finishes ?? [],
          card.oversized ?? false,
          card.promo ?? false,
          card.reprint ?? false,
          card.variation ?? false,
          card.set_id ?? null,
          card.set ?? null,
          card.set_name ?? null,
          card.set_type ?? null,
          card.set_uri ?? null,
          card.set_search_uri ?? null,
          card.scryfall_set_uri ?? null,
          card.rulings_uri ?? null,
          card.prints_search_uri ?? null,
          card.collector_number ?? null,
          card.digital ?? false,
          card.rarity ?? null,
          card.flavor_text ?? null,
          card.card_back_id ?? null,
          card.artist ?? null,
          card.artist_ids ?? [],
          card.illustration_id ?? null,
          card.border_color ?? null,
          card.frame ?? null,
          card.full_art ?? false,
          card.textless ?? false,
          card.booster ?? false,
          card.story_spotlight ?? false,
          card.edhrec_rank ?? null,
          card.penny_rank ?? null,
          card.prices ? JSON.stringify(card.prices) : null,
          card.related_uris ? JSON.stringify(card.related_uris) : null,
          card.purchase_uris ? JSON.stringify(card.purchase_uris) : null,
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
        try {
          const inserted = await insertBatch(pool, batch);
          total += inserted;
          skipped += batch.length - inserted;
        } catch (e) {
          console.error('\nInsert error:', (e as Error).message);
          for (const c of batch) {
            try {
              const inserted = await insertBatch(pool, [c]);
              total += inserted;
            } catch (e2) {
              console.error('Problematic card ID:', c.id);
              console.error('Problematic card name:', c.name);
              console.error('Error:', (e2 as Error).message);
              skipped++;
            }
          }
        }
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
