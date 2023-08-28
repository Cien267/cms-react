// func make array to 2 storey array with len of child array = len
export const chunk = (array, len) => {
  const newArray = []
  let arr = []
  for (let i = 0; i < array.length; i++) {
    arr.push(array[i])

    if (array.length === i + 1 || (i + 1) % len === 0) {
      const newArr = arr
      newArray.push(newArr)
      arr = []
    }
  }
  return newArray
}

export const flat = array => {
  const newArray = array.reduce((prev, curr) => [...prev, ...curr], [])
  const set = new Set(newArray)
  return Array.from(set)
}

export const mapPermissionToArray = (resources, array = [], len) => {
  const resourceGroups = resources.reduce((a, v) => {
    return { ...a, [v.group]: [] }
  }, {})

  for (let item of array) {
    const group = item.split('.')[0]

    if (!resourceGroups[group]) {
      resourceGroups[group] = []
    }
    resourceGroups[group].push(item)
  }

  return Object.values(resourceGroups)
}

export const isArrayValid = array => Array.isArray(array) && array?.length
