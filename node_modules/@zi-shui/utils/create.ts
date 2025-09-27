//block代码块 element元素 modifier装饰
//z-button

function _bem(prefixName:string,blockSuffix:string,element:string,modifier:string)  {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`
  }
  if (element) {
    prefixName += `__${element}`
  }
  if (modifier) {
    prefixName += `--${modifier}`
  }
  return prefixName
}

function createBEM(prefixName: string) {
  const b = (blockSuffix:string = '') => _bem(prefixName,blockSuffix,'','')

  return {
    b
  }
}

function createNamespace(name: string) {
  const prefixName = `z-${name}`
  return createBEM(prefixName)
}

const bem = createNamespace('icon')
console.log(bem.b('box'))