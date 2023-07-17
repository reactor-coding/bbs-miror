/**
 * 作り途中です。文句無しで
 * @author reactor-coding
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

/**
 * @typedef {Object} commentData
 * @property {number} id
 * @property {number} post
 * @property {number} parent
 * @property {number} author
 * @property {string} author_name
 * @property {string} author_url
 * @property {string} date
 * @property {string} date_gmt
 * @property {Object} content
 * @property {string} content.rendered
 * @property {string} link
 * @property {string} status
 * @property {string} type
 * @property {Object} author_avatar_urls
 * @property {string} author_avatar_urls.24
 * @property {string} author_avatar_urls.48
 * @property {string} author_avatar_urls.96
 * @property {Object[]} meta
 * @property {Object[]} _links
 * @property {Object[]} _links.self
 * @property {string} _links.self.href
 * @property {Object[]} _links.collection
 * @property {string} _links.collection.href
 * @property {Object[]} _links.author
 * @property {boolean} _links.author.embeddable
 * @property {string} _links.author.href
 * @property {Object[]} _links.up
 * @property {boolean} _links.up.embeddable
 * @property {string} _links.up.post_type
 * @property {string} _links.up.href
 * @property {Object[]} _links.in-reply-to
 * @property {boolean} _links.in-reply-to.embeddable
 * @property {string} _links.in-reply-to.href
 */

const path = require("node:path");
const config = require(path.join(__dirname, `/config/project.config.js`));
const url = require("../url/index.js");
const { fetcher } = require("./fetcher.js");

/**
 * @type { string }
 */
const baseEndpoint = url.bind([config.fetch.WPURL, "wp-json/wp/v2"]);
/**
 * @type { {[key: string]: string} }
 */
const endpoints = {
  posts: url.bind([baseEndpoint, "posts"]),
  comments: url.bind([baseEndpoint, "comments"]),
  users: url.bind([baseEndpoint, "users"])
};

module.exports = {
  api: {
    /**
     * [WordPress] Get All Posts
     * @param { ?{[key: string]: string} } options 
     * @return { postData[] }
     */
    getPosts: async (options) => {
      const { searchParams, pathname, origin } = new URL(endpoints.posts);

      Object.entries(options).forEach(([key, value]) => searchParams.append(key, value));

      /**
       * Posts Data
       * @type { postData[] }
       */
      const posts = await fetcher(`${origin}${pathname}?${searchParams.toString()}`);

      return posts;
    },

    /**
     * [WordPress] Get All Comments
     * @param { ?{[key: string]: string} } options 
     * @return { commentData[] }
     */
    getComments: async (options) => {
      const { searchParams, pathname, origin } = new URL(endpoints.comments);

      Object.entries(options).forEach(([key, value]) => searchParams.append(key, value));

      /**
       * Comments Data
       * @type { commentData[] }
       */
      const comments = await fetcher(`${origin}${pathname}?${searchParams.toString()}`);

      return comments;
    },
    getUsers: async (options) => {
      const { searchParams, pathname, origin } = new URL(endpoints.posts);

      Object.entries(options).forEach(([key, value]) => searchParams.append(key, value));

      /**
       * Posts Data
       * @type { postData[] }
       */
      const authors = await fetcher(`${origin}${pathname}?${searchParams.toString()}`);

      return authors;
    }
  }
}