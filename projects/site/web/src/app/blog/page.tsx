// UI imports
import { IconArrowForward } from '@packages/ui/build/icons'
import style from './page.module.scss'

// Common imports
import { subString } from '@packages/common/build/utils'

// Local imports
import { api } from '@/common/config/api'
import { Wrapper } from '@/common/elements/wrapper'
import { CallToAction } from '@/common/elements/cta'
import { routes } from '@/common/routes'
import Link from 'next/link'

// no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

// data
async function blogList() {
  let blog

  try {
    // api
    const data = await api.blog.list.query()

    if (data.success) {
      blog = data.data
    }
  } catch (error) {
    console.log('error', error)
  }

  return blog
}

// Component
const Blog = async () => {
  const blog = await blogList()

  // render
  return (
    <div className={style.blog}>
      {/* hero */}
      <Wrapper className={style.hero}>
        <h1>Blog</h1>
        <h2>Tips and tricks, industry knowledge and more.</h2>
      </Wrapper>

      {/* list */}
      <Wrapper className={style.list}>
        {blog.map((b) => (
          <div className={style.item} key={b._id}>
            <h3>{b.title}</h3>
            <h6>{subString(b.content, 100)}</h6>

            <Link href={routes.blog.detail.path(b.slug)}>
              <button>
                Read more <IconArrowForward />
              </button>
            </Link>
          </div>
        ))}
      </Wrapper>

      {/* call to action */}
      <CallToAction />
    </div>
  )
}

export default Blog
