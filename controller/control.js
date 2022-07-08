const url = "https://jsonplaceholder.typicode.com/posts";

//fetch data from JSON placeholder API
async function getTopics(url) {
  return await (await fetch(url)).json();
}

//simulate pagination on request from frontend
async function paginaton(req, res, next) {
  const page = req.params.page;
  const data = await getTopics(url);
  //since the maximum topics required is 7
  //assuming the data is Arrayfied
  let startIndex = (page - 1) * 7;
  let endIndex = startIndex + 7;
  const response = data.slice(startIndex, endIndex);
  res.json(response);
}

module.exports = { getTopics, paginaton };
