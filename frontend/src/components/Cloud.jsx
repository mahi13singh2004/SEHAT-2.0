import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import FOG from 'vanta/dist/vanta.fog.min'

const VantaFogBackground = () => {
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE, // Pass THREE explicitly
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0
        })
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div
      ref={vantaRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        zIndex: -1
      }}
    ></div>
  )
}

export default VantaFogBackground
