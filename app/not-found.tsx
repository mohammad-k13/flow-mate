import Navbar from '@/components/global/navbar'
import Slack from '@/components/layout/slack'
import Title from '@/components/typeography/title'
import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  return (
    <section className='w-full' style={{height: "calc(100vh - 3.5rem)"}}>
      <Navbar />
      <Slack className='w-full h-full' dir='col' justify='around'>
          <Title level={2}>Oppppps!</Title>
          <Image src={"/not-found.svg"} alt='not-found-svg' width={500} height={500}/>
      </Slack>

    </section>
  )
}

export default NotFound