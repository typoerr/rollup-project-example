import { constant } from '@shared/lib'
import { identity } from '@typoerr/atomic'
import http from 'http'

export function run() {
  const server = http.createServer((req, res) => {
    console.log(identity(constant('project-b')()))
    res.end(req.url)
  })
  server.listen(3000)
}
