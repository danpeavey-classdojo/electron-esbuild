/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import deepMerge from 'deepmerge'
import path from 'path'
import { Configuration } from 'webpack'

import type { EnvConfig } from '../config.mjs'
import { Target, TypeConfig } from '../enums.mjs'
import type { Configurator } from './base.configurator.mjs'

export class WebpackConfigurator implements Configurator<TypeConfig.webpack> {
  public readonly type = TypeConfig.webpack

  constructor(public readonly config: EnvConfig) {}

  toBuilderConfig(
    partial: Partial<Configuration>,
    _: Configuration,
    target: Target,
  ): Configuration {
    return deepMerge(
      partial,
      {
        output: {
          filename: target === Target.main ? 'main.js' : 'index.js',
          path: path.resolve(process.cwd(), this.config.output),
        },
      },
      { clone: false },
    )
  }
}