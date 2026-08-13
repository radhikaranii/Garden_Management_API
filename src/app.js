const { URL } = require('node:url')
const { getAllowedUser, getGardenData } = require('./data')

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload)

  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })

  res.end(body)
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''

    req.on('data', (chunk) => {
      raw += chunk
    })

    req.on('end', () => {
      if (!raw) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(raw))
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })
}

function createApp() {
  return async function handler(req, res) {
    const requestUrl = new URL(req.url, 'http://localhost')

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
      res.end()
      return
    }

    if (req.method === 'GET' && requestUrl.pathname === '/') {
      return sendJson(res, 200, {
        name: 'Garden Management API',
        status: 'ok',
        endpoints: ['/api/health', '/api/login', '/api/garden-data'],
        version: '1.0.0',
      })
    }

    if (req.method === 'GET' && requestUrl.pathname === '/api/health') {
      return sendJson(res, 200, {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      })
    }

    if (req.method === 'POST' && requestUrl.pathname === '/api/login') {
      try {
        const body = await readRequestBody(req)
        const user = getAllowedUser(body.email)

        if (!user || !body.password?.trim()) {
          return sendJson(res, 401, {
            error: 'Invalid demo credentials',
          })
        }

        return sendJson(res, 200, {
          email: user.email,
          name: user.name,
          homeLabel: user.homeLabel,
        })
      } catch {
        return sendJson(res, 400, {
          error: 'Invalid JSON body',
        })
      }
    }

    if (req.method === 'GET' && requestUrl.pathname === '/api/garden-data') {
      const email = requestUrl.searchParams.get('email')
      const user = getAllowedUser(email)
      const gardenData = getGardenData(email)

      if (!user || !gardenData) {
        return sendJson(res, 404, {
          error: 'Garden data not found',
        })
      }

      return sendJson(res, 200, {
        user: {
          email: user.email,
          name: user.name,
          homeLabel: user.homeLabel,
        },
        ...gardenData,
      })
    }

    return sendJson(res, 404, {
      error: 'Not Found',
    })
  }
}

module.exports = {
  createApp,
}
