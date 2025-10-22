exports.up = async function(knex) {
    await knex.schema.alterTable("items", (table) => {
      // Флаг для недвижимости
      table.boolean("is_real_estate").defaultTo(false);
  
      // Флаг для аренды
      table.boolean("is_rent").defaultTo(false);
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.dropColumn("is_real_estate");
      table.dropColumn("is_rent");
    });
  };