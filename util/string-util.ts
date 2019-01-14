export class StringUtil {
  public static GetKey(): string {
    let text = ''

    // I am not sure if case is important in our keys here,
    // may be useless to include lowercase equivalents
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    // Functional Practice
    // Array.from(new Array(10).keys())
    //   .map((x: number) =>
    //     possible.charAt(Math.floor(Math.random() * possible.length))
    //   )
    //   .reduce((prev: string, curr: string) => (prev += curr))

    return text
  }

  public static GetUniqueKey(disallowedItems: string[]): string {
    let initialKey = this.GetKey()

    while (disallowedItems.indexOf(initialKey) > -1) {
      initialKey = this.GetKey()
    }

    return initialKey
  }
}
