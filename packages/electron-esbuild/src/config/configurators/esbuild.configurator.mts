/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import deepMerge from 'deepmerge'
import { BuildOptions } from 'esbuild'
import nodeModule from 'node:module'
import path from 'node:path'

import type { EnvConfig } from '../config.mjs'
import { Target, TypeConfig } from '../enums.mjs'
import type { Configurator } from './base.configurator.mjs'

export class EsbuildConfigurator implements Configurator<TypeConfig.esbuild> {
  public readonly type = TypeConfig.esbuild

  constructor(public readonly config: EnvConfig) {}

  toBuilderConfig(
    partial: Partial<BuildOptions>,
    userConfig: BuildOptions,
    target: Target,
  ): BuildOptions {
    const additional: Partial<BuildOptions> = {}
    const out = path.resolve(
      process.cwd(),
      this.config.output,
      target === Target.main ? 'main.js' : 'index.js',
    )

    if (userConfig.entryPoints?.length ?? 1 > 1) {
      additional.outdir = path.dirname(out)
    } else {
      additional.outfile = out
    }

    return deepMerge(
      deepMerge(
        partial,
        {
          external: [
            ...(partial.external ?? []),
            'electron',
            ...nodeModule.builtinModules,
          ],
        },
        { clone: false },
      ),
      additional,
      { clone: false },
    )
  }
}
