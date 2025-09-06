exports.up = async function(knex){
    await knex.schema.createTable("items", (table) => {
      table.increments("item_id").primary();
      table.string("title", 255).notNullable();
      table.integer("owner_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.integer("category_id").notNullable().references("category_id").inTable("category").onDelete("CASCADE");
      table.integer("city_id").references("city_id").inTable("cities").onDelete("SET NULL");
      table.decimal("price", 10, 2).notNullable().checkPositive();
      table.string("size", 50);
      table.string("color", 50);
      table.string("condition", 255);
      table.integer("year_of_manufacture");
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.string("description", 900).notNullable();
      table.string("city", 200);
      table.boolean("reserved").defaultTo(false);
      table.specificType("images", "text[]");
      table.boolean("deleted").defaultTo(false);
      table.timestamp("updated_at");
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("items");
  }
  