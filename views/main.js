const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) => {
  const list =pages.map(val=>{
    return `<li><a href='/wiki/${val.slug}'>${val.title}</a></li>`
  });
  return layout(html`
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${list}
    </ul>
  </ul>`);}