export async function up(knex) {
    await knex.schema.alterTable('category', (table) => {
      table.string('name_he', 255);
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable('category', (table) => {
      table.dropColumn('name_he');
    });
  }