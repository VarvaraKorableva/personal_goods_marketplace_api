export async function up(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.string("original_language", 10).alter();
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.string("original_language", 5).alter();
    });
  }