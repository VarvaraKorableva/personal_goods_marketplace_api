exports.up = async function(knex) {
    await knex.schema.createTable("messages", (table) => {
      table.increments("message_id").primary();
      table.integer("sender_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.integer("receiver_id").notNullable().references("user_id").inTable("users").onDelete("CASCADE");
      table.text("message_text").notNullable();
      table.timestamp("timestamp").defaultTo(knex.fn.now()).notNullable();
      table.integer("item_id").notNullable().references("item_id").inTable("items").onDelete("CASCADE");
      table.boolean("read").defaultTo(false);
      table.integer("conversation_id").references("conversation_id").inTable("conversations").onDelete("CASCADE");
      table.boolean("is_deleted_by_sender").defaultTo(false);
      table.boolean("is_deleted_by_receiver").defaultTo(false);
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("messages");
  }
  
