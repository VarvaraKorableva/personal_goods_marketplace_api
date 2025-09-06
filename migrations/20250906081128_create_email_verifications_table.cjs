exports.up = async function(knex){
    await knex.schema.createTable("email_verifications", (table) => {
      table.increments("id").primary();
      table.string("email", 255).notNullable();
      table.string("verification_code", 6).notNullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("expires_at").notNullable().defaultTo(
        knex.raw("now() + interval '15 minutes'")
      );
    });
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("email_verifications");
  }
  