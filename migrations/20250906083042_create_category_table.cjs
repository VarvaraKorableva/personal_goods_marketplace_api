/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async function(knex) {
    await knex.schema.createTable("category", (table) => {
      table.increments("category_id").primary();
      table.string("name", 255).notNullable();
      table.boolean("is_good");
      table
        .integer("parent_id")
        .unsigned()
        .references("category_id")
        .inTable("category")
        .onDelete("CASCADE");
      table.string("image_url", 255).defaultTo(
        "https://images.unsplash.com/photo-1618278559289-d2070c065a17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGNhdCUyMG9uJTIwZ3JleSUyMGJhY2tncmF1bmR8ZW58MHx8MHx8fDA%3D"
      );
      table.string("slug", 30);
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("category");
  }
  