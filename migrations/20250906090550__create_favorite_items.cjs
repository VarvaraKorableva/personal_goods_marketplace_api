exports.up = async function(knex) {
    await knex.schema.createTable("favorite_items", (table) => {
      table.increments("favorite_items_id").primary();
      table.integer("favorite_collector_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.integer("item_id").notNullable().references("item_id").inTable("items").onDelete("CASCADE");
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("favorite_items");
  }
  