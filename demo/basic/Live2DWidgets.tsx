'use client'
import { useState } from 'react'
import { Live2DWidget } from 'next-live2d'

const WIDGET_WIDTH = 200
const WIDGET_HEIGHT = 300
const MODEL_POOL = ['rem_2', 'xisitina', 'HK416-1-normal', 'HK416-2-destroy', 'Kar98k-normal', 'kp31']

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
    />
  )
}
