// requires
const fs = require("node:fs");
const { api } = require("./lib/wpapis/index.js");

(async () => {
  console.log("---\n投稿を取得しています...");

  /**
   * @type { postData[] }
   */
  const posts = await api.getPosts();

  const mapped_post = posts.map(post => {
    return {
      post_id: post.id,
      date: post.date,
      updated_date: post.modified,
      vanitylink: post.guid.rendered,
      status: post.status,
      title: post.title.rendered,
      content: post.content.rendered,
      description: post.excerpt.rendered,
      author: post.author
    }
  });

  // download alpine.js
  await fetch("https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js")
})();

/* 
  -----------------------------------------
  下から Visual Studio Code のための型定義です。
  お気にせず。
  -----------------------------------------
 */

/**
 * @typedef {Object} postData
 * @property {number} author
 * @property {string[]} categories
 * @property {string} comment_status
 * @property {Object} content
 * @property {string} date
 * @property {string} date_gmt
 * @property {Object} excerpt
 * @property {number} featured_media
 * @property {string} format
 * @property {Object} guid
 * @property {number} id
 * @property {string} jetpack_featured_media_url
 * @property {Object[]} jetpack_publicize_connections
 * @property {string} jetpack_shortlink
 * @property {string} link
 * @property {Object} meta
 * @property {string} modified
 * @property {string} modified_gmt
 * @property {Object} nishiki_blocks_pro
 * @property {string} ping_status
 * @property {string} slug
 * @property {string} status
 * @property {boolean} sticky
 * @property {string[]} tags
 * @property {string} template
 * @property {Object} title
 * @property {string} type
 * @property {Object} _links
 */