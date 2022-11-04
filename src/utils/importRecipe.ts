export enum ImportUrlStatus {
  NotUrl,
  Empty,
  Ok,
  NotAManagedWebsite,
  Error,
}

const expression =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi

export const parseRecipeImportUrl = (url: string): ImportUrlStatus => {
  if (url.length === 0) return ImportUrlStatus.Empty

  if (!url.match(expression)) return ImportUrlStatus.NotUrl

  return ImportUrlStatus.Ok
}
