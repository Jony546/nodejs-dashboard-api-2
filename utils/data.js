const { faker } = require("@faker-js/faker");
const types = require("./../json/types.json");
const regions = require("./../json/regions.json");

function getFakerNumber() {
  return faker.datatype.number({ min: 0, max: 255 });
}

function getIp() {
  return `${getFakerNumber()}.${getFakerNumber()}.${getFakerNumber()}.${getFakerNumber()}`;
}

function getID() {
  return `${faker.random.alpha()}-${faker.random.alphaNumeric(10)}`;
}

function getRow() {
  return {
    name: faker.name.findName(),
    id: getID(),
    type: faker.random.arrayElement(types),
    az: faker.random.arrayElement(regions),
    publicIP: getIp(),
    privateIP: getIp(),
    state: faker.random.arrayElement(["running", "stopped"]),
  };
}

const getData = (
  cache,
  page_size = 10,
  page_number = 1,
  sorting_key = "name",
  sort_type = ""
) => {
  const data = cache.get("tableData") || [];
  let sorted;

  const filtered = data.filter((element) => element.state === "running");

  if (sort_type) {
    if (sort_type === "descendent") {
      sorted = filtered.sort((a, b) =>
        a[sorting_key] > b[sorting_key]
          ? 1
          : b[sorting_key] > a[sorting_key]
          ? -1
          : 0
      );
    } else {
      sorted = filtered.sort((a, b) =>
        a[sorting_key] < b[sorting_key]
          ? 1
          : b[sorting_key] < a[sorting_key]
          ? -1
          : 0
      );
    }
  }

  return paginate(sort_type ? sorted : filtered, page_size, page_number);
};

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function createData(cache) {
  const data = [];

  for (let i = 0; i < 500; i++) {
    data.push(getRow());
  }

  cache.set("tableData", data, 10000);
}

module.exports = {
  getData,
  createData,
};
