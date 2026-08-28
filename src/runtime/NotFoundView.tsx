'use client'

import { useEffect, useState } from 'react'

const kaomojis = ['(>_<)', '(T_T)', '(o_o)', '(._.)', '(;_;)', '(\u00b4-\ufe4f-`)']

export function NotFoundView() {
  const [kaomoji, setKaomoji] = useState('(._.)')

  useEffect(() => {
    setKaomoji(kaomojis[Math.floor(Math.random() * kaomojis.length)])
  }, [])

  return <main className="dp-not-found">
    <div>
      <span className="dp-not-found-kaomoji" title="Kaomoji ngẫu nhiên">{kaomoji}</span>
      <h1>Lạc trôi đâu đếyyy ???</h1>
      <p>Đừng mò nữa, ở đây không có gì ngoài sự trống vắng...</p>
    </div>
  </main>
}