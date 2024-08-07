export default function ({ route, redirect }) {
  if (route.path === '/') {
    return redirect('/seo')
  }
  if (route.path === '/portal') {
    // Get current query parameters
    const query = route.query

    // Append query parameters to redirect URL
    return redirect(`/invoices?${new URLSearchParams(query).toString()}`)
  }
}
