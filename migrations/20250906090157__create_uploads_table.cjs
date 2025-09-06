exports.up = async function(knex) {
    await knex.schema.createTable("uploads", (table) => {
      table.increments("images_of_goods_id").primary();
      table.integer("item_id").references("item_id").inTable("items").onDelete("CASCADE");
      table.string("key", 255);
      table.string("mimetype", 50);
      table.string("location", 1000);
      table.string("originalname", 1000);
      table.integer("owner_id").references("user_id").inTable("users").onDelete("CASCADE");
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("uploads");
  }
  