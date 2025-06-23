import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { getAuth } from '@clerk/react-router/ssr.server'
import { createClerkClient } from '@clerk/react-router/api.server'

export async function loader(args: LoaderFunctionArgs) {
  // Use `getAuth()` to get the user's ID
  const { userId } = await getAuth(args)
  console.log(userId);

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return redirect('/auth?redirect_url=' + args.request.url)
  }

  // Instantiate the Backend SDK and get the user's full `Backend User` object
  const user = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(
    userId,
  )

  return {
    user: JSON.stringify(user),
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Dashboard() {
  const loaderData = useLoaderData();
    return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(loaderData, null, 2)}</code>
      </pre>
    </div>
  )
}