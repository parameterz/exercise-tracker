module.exports = function(eleventyConfig) {
  
  // Create collection of all exercises
  eleventyConfig.addCollection("exercises", function(collectionApi) {
    return collectionApi.getFilteredByGlob("exercises/*.md");
  });
  
  return {
    dir: {
      input: ".",
      output: "_site"
    },
    htmlTemplateEngine: "njk"
  };
};
