import { Address } from './address.model'
import { Company } from './company.model'

export class User {
  public id: number = 0
  public name: string = ''
  public username: string = ''
  public email: string = ''
  public address: Address = new Address()
  public phone: string = ''
  public website: string = ''
  public company: Company = new Company()
}
