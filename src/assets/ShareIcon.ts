import {
  ShareIcon as DefaultShareIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline'

import { isMacLike } from '~/src/utils/platforms/mobile'

const ShareIcon = isMacLike() ? ArrowUpOnSquareIcon : DefaultShareIcon

export default ShareIcon
