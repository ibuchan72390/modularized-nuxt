/*
 * This is the stupidest ever fucking required object init I've ever seen.
 * I should not need to set everything explicitly.  Default values should be acceptable.
 * Seems that these props must set an initial value and must each be declared public or private.
 */

export class Todo {
  public userId: number = 0
  public id: number = 0
  public title: string = ''
  public completed: boolean = false
}
