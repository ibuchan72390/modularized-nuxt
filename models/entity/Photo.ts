import { BaseEntity } from './BaseEntity'

export class Photo extends BaseEntity {
  public albumId: number = 0
  public title: string = ''
  public url: string = ''
  public thumbnailUrl: string = ''
}
