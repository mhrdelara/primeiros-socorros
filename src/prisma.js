const { PrismaClient } = require("@prisma/client");
const { format } = require("date-fns");
const { flatten, unflatten } = require("flat");
const _ = require("lodash");

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  let result = await next(params);

  if (_.isArray(result) || _.isObject(result))
    result = sanitizeDateValuesInObject(result);

  return result;
});

function sanitizeDateValuesInObject(result) {
  if (_.isArray(result))
    return result.map((r) => sanitizeDateValuesInObject(r));
  if (!_.isObject(result)) return result;
  result = flatten(result);
  result = _.mapValues(result, (value, key) => {
    if (
      value instanceof Date &&
      value.toISOString().endsWith("T00:00:00.000Z")
    ) {
      return format(value, "dd/MM/yyyy");
    }
    return value;
  });
  result = unflatten(result);
  return result;
}

module.exports = prisma;
