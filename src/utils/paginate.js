export const paginate = async (
  model,
  {
    page = 1,
    limit = 10,
    sortBy = "id",
    order = "asc",
    include = undefined,
  } = {}
) => {
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    model.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      include,
    }),
    model.count(),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
