export async function up (knex) {
    await knex.schema.alterTable("category", (table) => {
      table.text("image_url").alter();
    });
  }
  
  export async function down (knex) {
    await knex.schema.alterTable("category", (table) => {
      table.string("image_url", 255).alter();
    });
  }
  