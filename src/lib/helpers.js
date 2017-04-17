/* eslint-disable */

const arr = x => Array.from(x)
const num = x => Number(x) || 0
const isEmpty = xs => xs.length === 0
const take = n => xs => xs.slice(0, n)
const drop = n => xs => xs.slice(n)
const reverse = xs => xs.slice(0).reverse()
const comp = f => g => x => f(g(x))
const not = x => !x
const chunk = n => xs => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))]

export const numToWords = (n) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four',
    'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
    'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
  ]
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty',
    'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ]
  const g = [
    '', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion',
    'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion',
  ]
  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  const makeGroup = ([ones, tens, huns]) => [
    num(huns) === 0 ? '' : a[huns] + ' Hundred ',
    num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
    a[tens + ones] || a[ones]
  ].join('')
  // "thousands" constructor no real good names for this, i guess
  const thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`
  // execute !
  if (typeof n === 'number') return numToWords(String(n))
  if (n === '0') return 'zero'
  return comp(chunk(3))(reverse)(arr(n))
    .map(makeGroup)
    .map(thousand)
    .filter(comp(not)(isEmpty))
    .reverse()
    .join(' ')
}
