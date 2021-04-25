import { http } from './app'
import './websockets/admin'
import './websockets/client'

http.listen(3333, () => console.log('Server started'))
