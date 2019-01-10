import { BaseEntity } from './BaseEntity'

export class Comment extends BaseEntity {
  public postId: number = 0
  public name: string = ''
  public email: string = ''
  public body: string = ''
}
