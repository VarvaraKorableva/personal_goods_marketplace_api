exports.up = async function (knex) {
    await knex.schema.alterTable("items", (table) => {
      table.boolean("moderated").notNullable().defaultTo(false);
    });
  }
  
  exports.down = async function (knex) {
    await knex.schema.alterTable("items", (table) => {
      table.dropColumn("moderated");
    });
  }
  