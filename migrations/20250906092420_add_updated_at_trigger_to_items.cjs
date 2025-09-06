// 20250906092420_add_updated_at_trigger_to_items.js
exports.up = async function(knex) {
  // 1. Добавляем колонку только если её нет
  const hasColumn = await knex.schema.hasColumn('items', 'updated_at');
  if (!hasColumn) {
    await knex.schema.alterTable('items', table => {
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  }

  // 2. Создаём функцию для обновления updated_at
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  // 3. Создаём триггер, только если его ещё нет
  const triggerExists = await knex.raw(`
    SELECT tgname
    FROM pg_trigger
    WHERE tgname = 'set_updated_at'
  `);

  if (triggerExists.rows.length === 0) {
    await knex.raw(`
      CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON items
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }
};

exports.down = async function(knex) {
  // Удаляем триггер и функцию
  await knex.raw(`DROP TRIGGER IF EXISTS set_updated_at ON items;`);
  await knex.raw(`DROP FUNCTION IF EXISTS update_updated_at_column();`);
};
