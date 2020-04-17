import { constant } from '@shared/lib'
import { identity } from '@typoerr/atomic'

console.log(identity(constant('project-a')()))
