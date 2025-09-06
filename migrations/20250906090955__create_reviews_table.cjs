exports.up = async function(knex) {
    await knex.schema.createTable("reviews", (table) => {
      table.increments("review_id").primary();
      table.integer("author_review_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.integer("seller_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.string("text_review", 1000);
      table.integer("score").checkBetween([1,5]);
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("reviews");
  }
  