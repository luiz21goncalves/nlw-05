import { http } from './app'
import './websockets/client'

http.listen(3333, () => console.log('Server started'))
