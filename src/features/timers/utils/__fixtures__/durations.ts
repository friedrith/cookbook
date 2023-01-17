const durations = {
  '1 min': [60000],
  '1 min foo bar 1 min': [60000],
  '2 min foo bar 1 min': [60000, 120000],
  '2 min': [120000],
  '2 minutes': [120000],
  '1 à 2 minutes': [60000, 120000],
  '1 heure': [3600000],
  '2 heures': [7200000],
}

export default durations
