import { BaseEntity } from './BaseEntity'

export class Post extends BaseEntity {
  public userId: number = 0
  public title: string = ''
  public body: string = ''
}
