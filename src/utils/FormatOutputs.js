module.exports.formatOutputArticle = (article, author, user) => {
  const tagList = [];
  for (const t of article.dataValues.Tags) {
    tagList.push(t.name);
  }
  article.dataValues.tagList = tagList;

  let following = false;
  let favorited = false;
  let countFavorites = 0;
  if (user) {
    for (const favorite of user.Favourites) {
      countFavorites += 1;
      if (favorite.dataValues.id === article.dataValues.id) {
        favorited = true;
      }
    }

    for (const follower of author.Followers) {
      if (follower.dataValues.id === user.dataValues.id) {
        following = true;
      }
    }
  }
  article.dataValues.favorited = favorited;
  article.dataValues.favoritesCount = countFavorites;
  author.dataValues.following = following;

  delete article.dataValues.id;
  delete article.dataValues.Tags;
  delete article.dataValues.UserId;

  delete author.dataValues.id;
  delete author.dataValues.email;
  delete author.dataValues.password;
  delete author.dataValues.createdAt;
  delete author.dataValues.updatedAt;
  delete author.dataValues.Followers;
  article.dataValues.author = author;

  return article;
};