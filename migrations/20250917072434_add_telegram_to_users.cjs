exports.up = async function(knex) {
    await knex.schema.alterTable("users", (table) => {
      table.string("telegram").nullable();
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.alterTable("users", (table) => {
      table.dropColumn("telegram");
    });
  }
  