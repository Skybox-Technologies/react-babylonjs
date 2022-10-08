import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { BabylonApp, BasicCameraLightsGround } from '@react-babylonjs/extra'
import React, { FC, useState } from 'react'
import { useBeforeRender, useScene } from 'react-babylonjs'

type RotatingBoxProps = {
  rpm: number
}

const RotatingBox: FC<Partial<RotatingBoxProps>> = (props) => {
  const _props: RotatingBoxProps = {
    rpm: 5,
    ...props,
  }
  const { rpm } = _props
  const scene = useScene()
  const [y, setY] = useState(0)
  useBeforeRender(
    () => {
      if (!scene) return
      const deltaTimeInMillis = scene.getEngine().getDeltaTime()
      setY((oldY) => oldY + (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000))
    },
    undefined,
    undefined,
    undefined,
    [rpm]
  )
  return <box name="box" size={2} position={new Vector3(0, 1, 0)} rotation={new Vector3(0, y, 0)} />
}

const App: FC = () => {
  return (
    <BabylonApp>
      <BasicCameraLightsGround />
      <RotatingBox />
    </BabylonApp>
  )
}

export default App
