module.exports = function(eleventyConfig) {
  
  // Create collection of all exercises
  eleventyConfig.addCollection("exercises", function(collectionApi) {
    return collectionApi.getFilteredByGlob("exercises/*.md");
  });
  
  // Add default filter for Nunjucks
  eleventyConfig.addFilter("default", function(value, defaultValue) {
    return value === undefined || value === null ? defaultValue : value;
  });
  
  return {
    dir: {
      input: ".",
      output: "_site"
    },
    htmlTemplateEngine: "njk"
  };
};
