export class Pool {
  constructor(createFn, resetFn, initialSize = 50) {
    this._create = createFn
    this._reset  = resetFn
    this._pool   = []
    for (let i = 0; i < initialSize; i++) this._pool.push(createFn())
  }

  get() {
    return this._pool.length > 0 ? this._pool.pop() : this._create()
  }

  release(obj) {
    this._reset(obj)
    this._pool.push(obj)
  }
}
