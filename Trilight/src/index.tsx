import { Hono } from 'hono'
import { renderer } from './renderer'
import { HomePage } from './pages/HomePage'

const app = new Hono()

// Homepage using JSX components
app.get('/', renderer, (c) => c.render(<HomePage />))

export default app
