import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'

// Vertex Shader: simple full-screen quad
const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  // Flip Y coordinate for standard screen coords
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Fragment Shader: Cybernetic background with Chromatic Aberration, Glitch slices, Speed Lines, and Matrix dots
const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_velocity;
uniform float u_is_dark;

varying vec2 v_uv;

// Pseudo-random function
float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// 1D noise
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(hash21(vec2(i, i * 0.5)), hash21(vec2(i + 1.0, (i + 1.0) * 0.5)), smoothstep(0.0, 1.0, f));
}

void main() {
  vec2 uv = v_uv;
  vec2 screenPos = gl_FragCoord.xy / u_resolution.xy;
  
  // Calculate aspect ratio
  float aspect = u_resolution.x / u_resolution.y;
  vec2 aspectUv = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  // 1. DYNAMIC GLITCH SLICES (amplified by scroll velocity + subtle time interval)
  float glitchIntensity = clamp(u_velocity * 0.035, 0.0, 0.7);
  float sliceRandom = hash21(vec2(floor(uv.y * 36.0), floor(u_time * 8.0)));
  
  // Trigger periodic glitch bursts or high scroll spikes
  float glitchTrigger = step(0.92 - glitchIntensity * 0.4, sliceRandom) * glitchIntensity;
  float glitchShift = (hash21(vec2(sliceRandom, u_time)) - 0.5) * glitchTrigger * 0.08;
  
  // 2. CHROMATIC ABERRATION (RGB Shift)
  float caSpread = (glitchIntensity * 0.02 + 0.0018 + length(uv - u_mouse) * 0.0015);
  
  vec2 uvR = uv + vec2(glitchShift + caSpread, 0.0);
  vec2 uvG = uv + vec2(glitchShift, 0.0);
  vec2 uvB = uv + vec2(glitchShift - caSpread, 0.0);

  // 3. SPEED LINES (Anime/Manga style vertical kinetic streaks on fast scrolling)
  float speedLineAlpha = 0.0;
  if (u_velocity > 0.4) {
    float lineCoord = aspectUv.x * 60.0;
    float lineNoise = hash21(vec2(floor(lineCoord), floor(u_time * 24.0)));
    float lineStrength = step(0.82, lineNoise);
    // Vertical fade near center, strong near edges
    float edgeFactor = smoothstep(0.1, 0.7, abs(aspectUv.x));
    float speedSpeed = clamp((u_velocity - 0.4) * 0.8, 0.0, 1.0);
    speedLineAlpha = lineStrength * speedSpeed * edgeFactor * 0.45;
  }

  // 4. JAPANESE CYBER GRID & PARTICLES
  vec2 gridUv = fract(vec2(aspectUv.x * 32.0, aspectUv.y * 32.0)) - 0.5;
  float gridDot = smoothstep(0.06, 0.01, length(gridUv));
  
  // Subtle wave/noise drift
  float drift = sin(aspectUv.y * 4.0 + u_time * 0.8) * cos(aspectUv.x * 4.0 + u_time * 0.6) * 0.5 + 0.5;

  // Scanline rhythm
  float scanline = sin(uv.y * u_resolution.y * 0.85) * 0.025 * glitchIntensity;

  // Background base tone depending on theme (Light vs Dark mode)
  vec3 baseColor;
  vec3 gridColor;
  vec3 speedLineColor;
  vec3 glitchAccent;

  if (u_is_dark > 0.5) {
    // Cyber Obsidian Dark Mode
    baseColor = vec3(0.02, 0.02, 0.027); // #050507
    gridColor = vec3(0.23, 0.51, 0.96) * 0.12; // #3b82f6 subtle
    speedLineColor = vec3(0.58, 0.82, 1.0); // Bright cyan speed line
    glitchAccent = vec3(0.2, 0.6, 1.0) * glitchTrigger;
  } else {
    // Pure Minimalist Light Mode
    baseColor = vec3(0.985, 0.988, 0.995); // #fbfbfc
    gridColor = vec3(0.12, 0.22, 0.4) * 0.05; // Soft slate
    speedLineColor = vec3(0.15, 0.35, 0.85); // Blue streak
    glitchAccent = vec3(0.1, 0.4, 0.9) * glitchTrigger;
  }

  // Combine RGB channels with Chromatic Aberration
  float rVal = gridDot * (0.8 + 0.2 * sin(uvR.y * 10.0 + u_time));
  float gVal = gridDot * (0.8 + 0.2 * sin(uvG.y * 10.0 + u_time * 1.1));
  float bVal = gridDot * (0.8 + 0.2 * sin(uvB.y * 10.0 + u_time * 1.2));

  vec3 finalColor = baseColor;
  // Blend grid dots
  finalColor += gridColor * vec3(rVal, gVal, bVal);
  // Blend speed lines
  finalColor = mix(finalColor, speedLineColor, speedLineAlpha);
  // Blend chromatic glitch flash
  finalColor += glitchAccent * (0.5 + 0.5 * sin(u_time * 20.0));
  // Apply scanline tint
  finalColor += vec3(scanline);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export default function CyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const currentVelocity = useRef<number>(0)
  const targetVelocity = useRef<number>(0)
  const mousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 })

  // Subscribe to Lenis scroll velocity
  useLenis(({ velocity }) => {
    // Velocity is positive or negative depending on scroll direction
    targetVelocity.current = Math.min(Math.abs(velocity) * 0.1, 8.0)
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Try getting WebGL context
    const gl =
      canvas.getContext('webgl', { antialias: false, powerPreference: 'high-performance' }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

    if (!gl) {
      console.warn('WebGL is not supported in this browser, skipping CyberCanvas.')
      return
    }

    // Shader compiler helper
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    )

    const aPositionLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPositionLoc)
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution')
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse')
    const uTimeLoc = gl.getUniformLocation(program, 'u_time')
    const uVelocityLoc = gl.getUniformLocation(program, 'u_velocity')
    const uIsDarkLoc = gl.getUniformLocation(program, 'u_is_dark')

    let width = 0
    let height = 0

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75) // Cap DPR for high performance
      width = Math.floor(window.innerWidth * dpr)
      height = Math.floor(window.innerHeight * dpr)

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl?.viewport(0, 0, width, height)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Mouse tracking with throttling
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX / window.innerWidth
      mousePos.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Animation loop
    let animId: number
    let startTime = performance.now()
    let isTabVisible = !document.hidden

    const handleVisibility = () => {
      isTabVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    function render() {
      if (!gl || !isTabVisible) {
        animId = requestAnimationFrame(render)
        return
      }

      // Smooth decay of velocity
      currentVelocity.current += (targetVelocity.current - currentVelocity.current) * 0.08
      targetVelocity.current *= 0.94 // Natural friction

      const now = performance.now()
      const elapsedSeconds = (now - startTime) * 0.001

      // Check current theme
      const isDark = document.documentElement.classList.contains('dark') ? 1.0 : 0.0

      gl.uniform2f(uResolutionLoc, width, height)
      gl.uniform2f(uMouseLoc, mousePos.current.x, mousePos.current.y)
      gl.uniform1f(uTimeLoc, elapsedSeconds)
      gl.uniform1f(uVelocityLoc, currentVelocity.current)
      gl.uniform1f(uIsDarkLoc, isDark)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (gl) {
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        gl.deleteBuffer(positionBuffer)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700"
      style={{ willChange: 'transform' }}
    />
  )
}
