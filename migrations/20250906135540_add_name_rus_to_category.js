export async function up(knex) {
    await knex.schema.alterTable('category', (table) => {
      table.string('name_rus', 255);
    });
  }
  
  export async function down (knex) {
    await knex.schema.alterTable('category', (table) => {
      table.dropColumn('name_rus');
    });
  }
  