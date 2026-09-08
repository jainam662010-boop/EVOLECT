"use client"

import { useRef, useEffect } from "react"

export default function LiquidGlassBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) return

    let w: number
    let h: number
    let raf: number

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = canvas.width = parent.offsetWidth
      h = canvas.height = parent.offsetHeight
      gl.viewport(0, 0, w, h)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    const vs = `attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0,1);}`
    const fs = `precision mediump float;uniform float u_t;uniform vec2 u_res;
    float sdSphere(vec2 p,float r){return length(p)-r;}
    float opSmoothUnion(float d1,float d2,float k){float h=clamp(.5+.5*(d2-d1)/k,0.,1.);return mix(d2,d1,h)-k*h*(1.-h);}
    void main(){
      vec2 uv=gl_FragCoord.xy/u_res;
      vec2 p=(gl_FragCoord.xy-.5*u_res)/min(u_res.x,u_res.y);
      float t=u_t*.5;
      float d1=sdSphere(p-vec2(sin(t*.7)*.2,cos(t*.9)*.15),.22+sin(t)*.03);
      float d2=sdSphere(p-vec2(cos(t*.8)*.18,sin(t*.6)*.2),.18+cos(t*1.1)*.02);
      float d3=sdSphere(p-vec2(sin(t*1.2)*.1,cos(t*.5)*.25),.15);
      float d=opSmoothUnion(d1,d2,.12);
      d=opSmoothUnion(d,d3,.1);
      vec3 col=vec3(.94,.96,.98);
      if(d<0.0){
        float edge=1.-smoothstep(-.02,0.,d);
        float fresnel=pow(1.-abs(d)*8.,2.);
        col=vec3(.6,.8,1.)*edge*.5+vec3(.95,.97,1.)*fresnel*.3;
        vec2 refract=vec2(sin(uv.y*15.+t*2.),cos(uv.x*15.+t*1.5))*.008;
        float bg=sin((uv.x+refract.x)*20.)*cos((uv.y+refract.y)*20.)*.5+.5;
        col+=vec3(bg*.15,bg*.2,bg*.35);
      }
      float bg2=sin(uv.x*12.+t)*cos(uv.y*10.-t*.7)*.5+.5;
      col+=vec3(bg2*.08,bg2*.12,bg2*.2)*(1.-smoothstep(0.,.5,abs(d)));
      float rim=smoothstep(.01,0.,abs(d)-.01)*.6;
      col+=vec3(.7,.85,1.)*rim;
      gl_FragColor=vec4(col,1);
    }`

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const loc = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u_t = gl.getUniformLocation(prog, "u_t")!
    const u_res = gl.getUniformLocation(prog, "u_res")!

    const loop = (t: number) => {
      gl.uniform1f(u_t, t * 0.001)
      gl.uniform2f(u_res, w, h)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ background: "linear-gradient(135deg, #0c1426, #162040)" }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
