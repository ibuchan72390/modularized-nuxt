import { BaseEntity } from './BaseEntity'

export class Album extends BaseEntity {
  public userId: number = 0
  public title: string = ''
}
