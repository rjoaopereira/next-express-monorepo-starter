import Link from 'next/link'

export default () => (
  <div>
    <h1>Hello from the front</h1>
    <ul>
      <li>
    <Link href="/ping">
      <a>Go to api route</a>
    </Link>
    </li>
    <li>
    <Link href="/sse">
      <a>Go to SSE</a>
    </Link>
    </li>
    </ul>
  </div>
)
