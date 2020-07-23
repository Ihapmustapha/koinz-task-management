export const tasksMapper = (tasksList) => {
  if (!tasksList || !Array.isArray(tasksList)) return {};

  const map = {};
  tasksList.forEach((element) => {
    if (element.id) map[element.id] = element;
  });

  return map;
};
