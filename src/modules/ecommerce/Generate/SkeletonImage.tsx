import { Skeleton } from '@mantine/core'
import { IconPhotoAi } from '@tabler/icons-react'
import React from 'react'

export default function SkeletonImage() {
  return (
    <>
      <Skeleton
        animate={true}
        visible={true}
        radius="md"
        height={300}
        width="100%"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '10'
          }}
        >
          <IconPhotoAi size={32} />
        </div>
      </Skeleton>
    </>
  )
}
