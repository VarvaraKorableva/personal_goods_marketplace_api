// 20250906083000_create_cities_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async function(knex) {
    await knex.schema.createTable("cities", (table) => {
      table.increments("city_id").primary();
      table.string("name", 255).notNullable();
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("cities");
  }
  