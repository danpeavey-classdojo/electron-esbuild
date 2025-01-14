/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import type { Builder } from '../builder.mjs'
import type { Item } from '../config/config.mjs'

export abstract class BaseBuilder<T> implements Builder {
  readonly env: string

  abstract readonly hasInitialBuild: boolean

  protected constructor(protected readonly _config: Item<T>) {
    this.env = this._config.isMain
      ? 'Main'
      : this._config.isRenderer
      ? 'Renderer'
      : 'Unknown env'
  }

  abstract build(): Promise<void>

  abstract dev(start: () => void): void | Promise<void>
}
