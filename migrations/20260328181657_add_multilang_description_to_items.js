export async function up(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.text("description_ru");
      table.text("description_en");
      table.text("description_he");
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable("items", (table) => {
      table.dropColumn("description_ru");
      table.dropColumn("description_en");
      table.dropColumn("description_he");
    });
  }