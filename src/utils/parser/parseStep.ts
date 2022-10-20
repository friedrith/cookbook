const expression =
  /((http:\/\/|https:\/\/|)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?)/gi

export const replaceUrlsByLinks = (
  description: string,
  className: string = ''
) =>
  description.replace(
    expression,
    `<a href="$1" target="_blank" class="${className}">$1</a>`
  )
