'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'Pedro pedreira',
        ativo: true,
        email: 'pedro@pedra.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Carol sucessagem',
        ativo: false,
        email: 'carol@c.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria marieta',
        ativo: true,
        email: 'maria@m.com',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
