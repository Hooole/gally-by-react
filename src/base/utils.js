export function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

export function get30Deg() {
  return (Math.random() < 0.5 ? "" : "-") + Math.floor(Math.random() * 30);
}

/**
 * prefixStyle
 */
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    Webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export const prefixStyle = (style) => {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}