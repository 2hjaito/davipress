'use client'
import { useState } from 'react'
import { Live2DWidget } from 'next-live2d'
import { getPluginOptions } from 'davipress/runtime/plugins'
import config from '../davipress.config'

type Live2DOptions = { models?: string[]; width?: number; height?: number }

const options = getPluginOptions(config, 'live2d') as Live2DOptions
const MODEL_POOL = options.models?.length ? options.models : ['histoire']
const WIDGET_WIDTH = options.width ?? 200
const WIDGET_HEIGHT = options.height ?? 300

function pickRandomModel() {
  return MODEL_POOL[Math.floor(Math.random() * MODEL_POOL.length)]!
}

export default function Live2DWidgets() {
  // Chọn 1 model random khi mount, tự đổi mỗi khi reload trang.
  const [model] = useState(() => pickRandomModel())

  return (
    <Live2DWidget
      key={model}
      modelName={model}
      position="left"
      width={WIDGET_WIDTH}
      height={WIDGET_HEIGHT}
      showOnMobile={false}
    />
  )
}
