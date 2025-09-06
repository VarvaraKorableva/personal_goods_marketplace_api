exports.up = async function(knex) {
    await knex.schema.createTable("conversations", (table) => {
      table.increments("conversation_id").primary();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("conversation_owner_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.integer("item_owner_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.integer("item_id").references("item_id").inTable("items").onDelete("CASCADE");
      table.boolean("is_deleted_by_conversation_owner").defaultTo(false);
      table.boolean("is_deleted_by_item_owner").defaultTo(false);
      table.boolean("is_conversation_deleted").defaultTo(false);
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("conversations");
  }
  