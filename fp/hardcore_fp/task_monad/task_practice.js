const { prop } = require("ramda");
const { Task } = require("types");

const httpGet = (url) =>
  new Task((reject, resolve) => {
    request(url, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });

const myTask = httpGet("http://example.com/data.json")
  .map(JSON.parse)
  .map(prop("url"))
  .chain(httpGet)
  .map(JSON.parse);

myTask.fork(
  //the request isn't sent until we call .fork
  (err) => console.error(err),
  (data) => renderData(data)
);
