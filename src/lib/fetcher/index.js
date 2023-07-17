module.exports = {
  fetcher: {
    json: async (url, options) => {
      const res = await fetch(url, options);
      const content = await res.json();
      return content;
    },
    text: async (url, options) => {
      const res = await fetch(url, options);
      const content = await res.text();
      return content;
    }
  }
}