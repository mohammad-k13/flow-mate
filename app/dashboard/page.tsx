import { signOut } from '@/auth'
import Slack from '@/components/layout/slack'
import { Button } from '@/components/ui/button'
import React from 'react'

const Dashboard = async () => {
  const onClick =  async () => {
    "use server"
    await signOut();
  }
  return (
    <section className='w-full h-screen'>
      <Slack className='w-full h-full'>
        <Button onClick={onClick}>Sign Out</Button>
      </Slack>
    </section>
  )
}

export default Dashboard