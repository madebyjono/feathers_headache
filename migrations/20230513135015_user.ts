// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.integer('cellphone');
    table.string('email').unique();
    table.string('password');
    table.string('verifyShortToken');
    table.bigInteger('verifyExpires');
    table.integer('resetAttempts');
    table.integer('resetExpires');
    table.string('resetShortToken')
    table.string('resetToken');
    table.string('verifyChanges');
    table.boolean('isVerified');
    table.string('verifyToken');
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
