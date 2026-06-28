import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module'
import type { Connect } from 'vite'
import type { ServerResponse } from 'http'

const require = createRequire(import.meta.url)

type LocalRequest = Connect.IncomingMessage & {
  body?: unknown
  query?: Record<string, string>
}

type LocalResponse = ServerResponse & {
  status: (code: number) => LocalResponse
  json: (data: unknown) => void
  send: (data?: unknown) => void
}

type Handler = (req: LocalRequest, res: LocalResponse) => Promise<void>

function parseBody(req: Connect.IncomingMessage): Promise<unknown> {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk: Buffer) => { raw += chunk.toString() })
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : undefined) } catch { resolve(undefined) }
    })
  })
}

function adaptResponse(res: ServerResponse): LocalResponse {
  const localRes = res as LocalResponse

  localRes.status = (code: number) => {
    localRes.statusCode = code
    return localRes
  }

  localRes.json = (data: unknown) => {
    if (!localRes.headersSent) {
      localRes.setHeader('Content-Type', 'application/json')
    }
    localRes.end(JSON.stringify(data))
  }

  localRes.send = (data?: unknown) => {
    if (data === undefined) {
      localRes.end()
      return
    }

    if (typeof data === 'object') {
      localRes.json(data)
      return
    }

    localRes.end(String(data))
  }

  return localRes
}

export default defineConfig(({ mode }) => {
  // Carga las variables de .env en process.env para que las funciones API las vean
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
      // Plugin que sirve las funciones de api/ en desarrollo local
      {
        name: 'api-local',
        configureServer(server) {
          server.middlewares.use('/api', async (req, res, next) => {
            const url = req.url ?? ''

            // Extraer query params del path
            const [pathname] = url.split('?')

            // Parsear body para métodos que lo necesitan
            const body = await parseBody(req)
            ;(req as any).body = body

            let handler: Handler | undefined

            if (pathname === '/products' || pathname === '/products/') {
              handler = require('./api/products.js')
            } else if (pathname === '/categories' || pathname === '/categories/') {
              handler = require('./api/categories.js')
            } else if (pathname === '/config' || pathname === '/config/') {
              handler = require('./api/config.js')
            } else if (pathname === '/upload' || pathname === '/upload/') {
              handler = require('./api/upload.js')
            } else if (pathname === '/health' || pathname === '/health/') {
              handler = require('./api/health.js')
            } else if (pathname === '/ping' || pathname === '/ping/') {
              handler = require('./api/ping.js')
            } else {
              // Rutas dinámicas: /product/[id]
              const productMatch = pathname.match(/^\/product\/([^/]+)$/)
              if (productMatch) {
                ;(req as any).query = { id: productMatch[1] }
                handler = require('./api/product/[id].js')
              }
            }

            if (handler) {
              try {
                await handler(req as LocalRequest, adaptResponse(res))
              } catch (e: any) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: e.message }))
              }
            } else {
              next()
            }
          })
        },
      },
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
