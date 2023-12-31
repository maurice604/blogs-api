'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      postId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id'
        }
      },
      categoryId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};
