import { Request, Response } from 'express'
import { officialDomains } from '../utils/parser'

export async function getOfficialDomains(req: Request, res: Response) {
  res.status(200).send({ officialWebsites: officialDomains })
}
