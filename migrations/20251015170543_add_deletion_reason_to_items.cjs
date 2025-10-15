exports.up = async function (knex) {
    await knex.schema.alterTable("items", (table) => {
      table.string("deletion_reason", 500).nullable(); // можно оставить null для старых записей
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.alterTable("items", (table) => {
      table.dropColumn("deletion_reason");
    });
  };