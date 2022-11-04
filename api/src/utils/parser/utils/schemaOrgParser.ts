const types: { [id: string]: any } = {
  Person: (person: any) => person.name, // https://schema.org/Person
  HowToStep: (step: any) => step.text.replace(/[\n]/g, ' '), // https://schema.org/HowToStep
  HowToSection: (section: any) => parse(section.itemListElement),
  ImageObject: (image: any) => image.url,
  Organization: (organization: any) => organization.name,
  Thing: (thing: any) => thing.name.replace('From ', ''),
}

export const hasType = (obj: any, value: string) =>
  obj && '@type' in obj
    ? Array.isArray(obj['@type'])
      ? obj['@type'].includes(value)
      : obj['@type'] === value
    : false

export const getType = (obj: any) =>
  obj && '@type' in obj
    ? Array.isArray(obj['@type'])
      ? obj['@type'][0]
      : obj['@type']
    : null

export const parse = (obj: any, transform: (v: any) => any = v => v): any => {
  if (Array.isArray(obj)) {
    return transform(obj.flatMap(o => parse(o, transform)))
  } else if (typeof obj === 'string') {
    return obj
  } else if ('@type' in obj && obj['@type'] in types) {
    return types[obj['@type']](obj)
  } /*else if ('@graph' in obj) {
    return parse(obj['@graph'], transform)
  } */

  return obj
}

export const searchInGraph = (obj: any) => {
  if (obj && '@graph' in obj) {
    return obj['@graph']
  }

  return []
}
