import Duration, {
  minutesToDuration,
  hoursToDuration,
  ascendingOrder,
} from '@/features/timers/models/Duration'

const regexes = [
  {
    regex: [
      /([0-9]+)\s*(min|minutes?)/,
      /([0-9]+)\sà\s[0-9]+\s*(min|minutes?)/,
      /([0-9]+)\s-\s[0-9]+\s*(min|minutes?)/,
    ],
    parse: (description: string, regex: RegExp) => {
      const match = description.match(regex)

      return match ? minutesToDuration(parseInt(match[1])) : 0
    },
  },
  {
    regex: [/([0-9]+)\s*(h|heures?)/, /([0-9]+)\sà\s[0-9]+\s*(h|heures?)/],
    parse: (description: string, regex: RegExp) => {
      const match = description.match(regex)

      return match ? hoursToDuration(parseInt(match[1])) : 0
    },
  },
]

const onlyUnique = (duration: Duration, index: number, array: Duration[]) =>
  array.indexOf(duration) === index

type Parser = (description: string, regex: RegExp) => number

type FoundStringDurations = {
  regex: RegExp
  parse: Parser
  descriptions: string[] | null
}

const findDurationString =
  (description: string) =>
  ({
    regex,
    parse,
  }: {
    regex: RegExp[]
    parse: Parser
  }): FoundStringDurations[] =>
    regex.map(r => ({
      parse,
      regex: r,
      descriptions: description.match(new RegExp(r, 'g')),
    }))

const convertStringToDuration = ({
  regex,
  parse,
  descriptions,
}: FoundStringDurations): number[] =>
  descriptions ? descriptions.map(d => parse(d, regex)) : []

const findDurations = (description: string) =>
  regexes
    .flatMap(findDurationString(description))
    .filter(r => Boolean(r.descriptions))
    .flatMap(convertStringToDuration)
    .filter(Boolean)
    .sort(ascendingOrder)
    .filter(onlyUnique)

export default findDurations
