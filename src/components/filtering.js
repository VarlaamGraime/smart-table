export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        }),
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action) {
      if (action.name === "clear") {
        const parentAction = action.parentNode;
        const input = parentAction.querySelector("input");

        if (input) {
          input.value = "";
        }

        const field = action.dataset.field;
        state[field] = "";
      }
    }

    const filter = {};
    Object.keys(elements).forEach((key) => {
      const element = elements[key];
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          const name = element.name;
          const value = element.value;

          if (name === "date") {
            const isFullDate = /^\d{4}-\d{2}-\d{2}$/.test(value);

            if (isFullDate) {
              filter[`filter[${name}]`] = value;
            }

            return;
          }

          filter[`filter[${name}]`] = value;
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
