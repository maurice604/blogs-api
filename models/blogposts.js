const blogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false }); 

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      onDelete: 'CASCADE',
      as: 'user',
      foreignKey: 'userId', 
   });
  };

  return BlogPost;
};

module.exports = blogPost;
