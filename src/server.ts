import { serverHttp } from "./http"
import './websocket'

serverHttp.listen(3000, () => {
    console.log('Server is runnig on port localhost:3000')
})