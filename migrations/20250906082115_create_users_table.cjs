exports.up = async function(knex)  {
    await knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("username", 30).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("password", 255).notNullable();
        table.string("phone", 15);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.integer("ad_count").defaultTo(0);
    });
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users");
}
