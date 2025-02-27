import { PageInstance } from '@tarojs/runtime'

class Stacks {
  stacks: PageInstance[] = []

  backDelta = 0

  set delta (delta: number) {
    if (delta > 0) {
      this.backDelta = delta
    } else {
      --this.backDelta
    }
  }

  get length () {
    return this.stacks.length
  }

  get last () {
    return this.stacks[this.length - 1]
  }

  get () {
    return this.stacks
  }

  getItem (index: number) {
    return this.stacks[index]
  }

  getDelta (pathname: string) {
    if (this.backDelta >= 1) {
      return this.backDelta
    }
    // NOTE: 此处为了修复浏览器后退多级页面，在大量重复路由状况下可能出现判断错误的情况 （增强判断能力只能考虑在 query 中新增参数来判断，暂时搁置）
    const prevIndex = this.stacks.findIndex(r => r.path?.replace(/\?.*/g, '') === pathname)
    return this.length - 1 - prevIndex
  }

  getPrevIndex (pathname: string) {
    return this.length - 1 - this.getDelta(pathname)
  }

  pop () {
    return this.stacks.pop()
  }

  push (page: PageInstance) {
    return this.stacks.push(page)
  }
}

const stacks = new Stacks()

export default stacks
