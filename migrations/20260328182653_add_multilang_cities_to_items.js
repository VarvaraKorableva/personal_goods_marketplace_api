export async function up(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.string("city_ru", 200);
      table.string("city_en", 200);
      table.string("city_he", 200);
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.dropColumn("city_ru");
      table.dropColumn("city_en");
      table.dropColumn("city_he");
    });
  }