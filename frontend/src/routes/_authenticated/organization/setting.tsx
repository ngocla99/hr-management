import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/organization/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/organization/setting"!</div>
}
