import React, { type ReactNode } from 'react'

type Props = {
    children: ReactNode
}

//TASK: Fetch to create user and account then redirect to login
const AuthLayout = ({children}: Props) => {
  return (
    <div>{children}</div>
  )
}

export default AuthLayout