exports.up = async function (knex) {
    await knex.raw(`
      ALTER TABLE items
      ALTER COLUMN moderated SET DEFAULT true;
    `);
  };
  
  exports.down = async function (knex) {
    await knex.raw(`
      ALTER TABLE items
      ALTER COLUMN moderated SET DEFAULT false;
    `);
  };
  