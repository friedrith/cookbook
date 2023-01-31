class Scroll {
  scroll = 0

  onScroll(v: number) {
    this.scroll = v
  }
}

const rememberScroll = () => new Scroll()

export default rememberScroll
