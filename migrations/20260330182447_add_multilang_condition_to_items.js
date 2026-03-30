export async function up(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.string("condition_ru", 255);
      table.string("condition_en", 255);
      table.string("condition_he", 255);
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.dropColumn("condition_ru");
      table.dropColumn("condition_en");
      table.dropColumn("condition_he");
    });
  }