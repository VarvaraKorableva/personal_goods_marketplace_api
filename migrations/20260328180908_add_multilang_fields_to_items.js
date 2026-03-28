export async function up(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.string("title_ru", 255);
      table.string("title_en", 255);
      table.string("title_he", 255);
      table.string("original_language", 5);
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.dropColumn("title_ru");
      table.dropColumn("title_en");
      table.dropColumn("title_he");
      table.dropColumn("original_language");
    });
  }