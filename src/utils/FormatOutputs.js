module.exports.formatOutputArticle = async (article, author, user) => {
  const tagList = [];
  for (const t of article.dataValues.Tags) {
    tagList.push(t.name);
  }
  article.dataValues.tagList = tagList;

  let favorited = false;
  if (user) {
    for (const favorite of user.Favourites) {
      if (favorite.dataValues.id === article.dataValues.id) {
        favorited = true;
      }
    }
  }
  article.dataValues.favorited = favorited;

  const countFavorites = await article.countFavourites();
  article.dataValues.favoritesCount = countFavorites;

  delete article.dataValues.id;
  delete article.dataValues.Tags;
  delete article.dataValues.UserId;
  delete article.dataValues.User;

  article.dataValues.author = this.formatOutputProfile(author, user);

  return article;
};

module.exports.formatOutputProfile = (profile, user) => {
  let following = false;
  if (user) {
    for (const follower of profile.Followers) {
      if (follower.dataValues.id === user.id) {
        following = true;
      }
    }
  }
  profile.dataValues.following = following;

  delete profile.dataValues.id;
  delete profile.dataValues.email;
  delete profile.dataValues.password;
  delete profile.dataValues.createdAt;
  delete profile.dataValues.updatedAt;
  delete profile.dataValues.Followers;
  delete profile.dataValues.Favourites;

  return profile;
};

module.exports.formatOutputComments = (comments, user) => {
  let newArrayOfComments = [];
  for (const comment of comments) {
    delete comment.dataValues.ArticleId;
    delete comment.dataValues.UserId;

    comment.dataValues.author = this.formatOutputProfile(comment.dataValues.User, user);
    delete comment.dataValues.User;
    newArrayOfComments.push(comment);
  }

  return newArrayOfComments;
};

module.exports.formatOutputArticles = async (articles, user) => {
  let newArrayOfArticles = [];
  for (const article of articles) {
    const articleModified = await this.formatOutputArticle(article, article.User, user);
    newArrayOfArticles.push(articleModified);
  }

  return newArrayOfArticles;
};