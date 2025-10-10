export async function up(knex) {
    // 1️⃣ сначала привести существующие значения к целым (округляем вниз)
    await knex.raw(`UPDATE items SET price = floor(price)`);
  
    // 2️⃣ изменить тип столбца с decimal → integer
    await knex.schema.alterTable("items", (table) => {
      table.integer("price").notNullable().alter();
    });
  }
  
  export async function down(knex) {
    // если нужно откатить миграцию — вернуть decimal(10,2)
    await knex.schema.alterTable("items", (table) => {
      table.decimal("price", 10, 2).notNullable().alter();
    });
  }
  