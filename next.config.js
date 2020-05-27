const glob = require("glob");

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  // exportPathMap: async function() {
  //   const routes = {
  //     '/': { page: '/' },
  //     '/info': { page: '/info' },
  //   }
  //   //get all .md files in the posts dir
  //   const blogs = glob.sync('posts/**/*.md')

  //   //remove path and extension to leave filename only
  //   const blogSlugs = blogs.map(file =>
  //     file
  //       .split('/')[1]
  //       .replace(/ /g, '-')
  //       .slice(0, -3)
  //       .trim()
  //   )

  //   //add each blog to the routes obj
  //   blogSlugs.forEach(blog => {
  //     routes[`/blog/${blog}`] = { page: '/blog/[slug]', query: { slug: blog } }
  //   })

  //   return routes
  // },
};

//OLD MDX VERSION

// require("dotenv").config();

// const withMDX = require("@next/mdx")({
//   extension: /\.(mdx)$/,
//   // options: {
//   //   remarkPlugins: [slug],
//   //   compilers: [mdxTableOfContents],
//   // },
// });

// module.exports = withMDX({
//   // pageExtensions: ['js', 'jsx', 'md', 'mdx'],
//   env: {
//     GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
//     REPO_FULL_NAME: process.env.REPO_FULL_NAME,
//     BASE_BRANCH: process.env.BASE_BRANCH,
//   },
// });
