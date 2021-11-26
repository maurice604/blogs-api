const postsCategory = (sequelize) => {
  const PostsCategory = sequelize.define('PostsCategory', { }, { timestamps: false });

  PostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      onDelete: 'CASCADE',
      as: 'posts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      onDelete: 'CASCADE',
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategory;
};

module.exports = postsCategory;
