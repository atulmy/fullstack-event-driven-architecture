'use client'

// Imports
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import { IconCheck } from '@packages/ui/build/icons'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { api } from '@/common/config/api'
import { isDevelopment, notify } from '@/common/helpers/utils'
import { routes } from '@/common/routes'

// Component
const SpeechToText = () => {
  // render
  return (
    <div>
      <p>Speech to Text</p>
    </div>
  )
}

export default SpeechToText
