import { uniq } from 'lodash'

const SHARED_LINKS_KEY = 'sharedLinks'
const SEPARATOR = ','

export const getSharingLinks = () =>
  localStorage
    .getItem(SHARED_LINKS_KEY)
    ?.split(SEPARATOR)
    .map(s => s.trim())
    .filter(Boolean) || []

export const saveSharingLinks = (linkIds: string[]) => {
  localStorage.setItem(SHARED_LINKS_KEY, uniq([linkIds]).join(SEPARATOR))
}

export const cleanSharingLinks = () => localStorage.removeItem(SHARED_LINKS_KEY)

export const renderSharingLink = (linkId: string) =>
  `${process.env.REACT_APP_URL}/share/${linkId}`
