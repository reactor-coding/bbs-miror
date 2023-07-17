module.exports = {
  /**
   * 
   * @param { string[] } urlParts
   * @param { {[key: string]: string} } queryParams
   * @returns { string } 
   */
  bind: (urlParts, queryParams) => {
    const baseUrl = urlParts
      .filter(part => part.trim())
      .map(part => {
        part = part.replace("\\", "");
        
        if (part.startsWith("/")) part = part.substring(1);
        if (part.endsWith("/")) part = part.substring(0, part.length - 1);

        return part;
      })
      .join('/');

    return `${baseUrl}?${queryParams ? Object.entries(queryParams).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&') : ""}`;
  }
}