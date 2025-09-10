exports.up = async function(knex) {
  // Удаляем старый check constraint через raw
  await knex.raw(`
    ALTER TABLE items
    DROP CONSTRAINT IF EXISTS items_price_check;
  `);

  // Добавляем новый — разрешает 0 и выше
  await knex.raw(`
    ALTER TABLE items 
    ADD CONSTRAINT items_price_check CHECK (price >= 0);
  `);
};

exports.down = async function(knex) {
  // Удаляем новый constraint через raw
  await knex.raw(`
    ALTER TABLE items
    DROP CONSTRAINT IF EXISTS items_price_check;
  `);

  // Восстанавливаем старый (price > 0)
  await knex.raw(`
    ALTER TABLE items 
    ADD CONSTRAINT items_price_check CHECK (price > 0);
  `);
};
