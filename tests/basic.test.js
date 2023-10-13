import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { add } from '../src/index.js'

test('basic', async () => {
  const result = await add(1, 2)
  assert.equal(result, 3)
})

test.run()
