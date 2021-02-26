/**
 * 12345 => 12,345
 *
 * @param  {[type]} value    [description]
 */
export const toThousands = (num = 0) => {
  const result = []
  let counter = 0
  const Num = num.toString().split('')
  for (let i = Num.length - 1; i >= 0; i--) {
    counter = counter++
    result.unshift(Num[i])
    if (!(counter % 3) && i !== 0) { result.unshift(',') }
  }
  return result.join('')
}
