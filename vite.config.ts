import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

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
          server.middlewares.use('/api/upload', (req, res) => {
            let body = ''
            req.on('data', (chunk: Buffer) => { body += chunk.toString() })
            req.on('end', async () => {
              try {
                if (body) (req as any).body = JSON.parse(body)
                const handler = require('./api/upload.js')
                await handler(req, res)
              } catch (e: any) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: e.message }))
              }
            })
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
