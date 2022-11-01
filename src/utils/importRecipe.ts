export enum ImportUrlStatus {
  NotUrl,
  Empty,
  Ok,
  NotAManagedWebsite,
}

const expression =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi

const catalogs = {
  'www.marmiton.org': () => {},
}

export const parseRecipeImportUrl = (url: string): ImportUrlStatus => {
  if (url.length === 0) return ImportUrlStatus.Empty

  if (!url.match(expression)) return ImportUrlStatus.NotUrl

  const { hostname } = new URL(url)

  if (!Object.keys(catalogs).includes(hostname))
    return ImportUrlStatus.NotAManagedWebsite

  return ImportUrlStatus.Ok
}
