// UI imports
import style from './page.module.scss'

// Local imports
import { api } from '@/common/config/api'
import { Wrapper } from '@/common/elements/wrapper'
import { CallToAction } from '@/common/elements/cta'

// data
async function blogDetail({ slug }) {
  let blog

  try {
    // api
    const data = await api.blog.detail.query({ slug })

    if (data.success) {
      blog = data.data
    }
  } catch (error) {
    console.log('error', error)
  }

  return blog
}

// Component
const Blog = async ({ params: { slug } }) => {
  const blog = await blogDetail({ slug })

  // render
  return (
    <div className={style.blog}>
      {/* hero */}
      <Wrapper className={style.hero}>
        <h1>{blog.title}</h1>
      </Wrapper>

      {/* list */}
      <Wrapper className={style.content}>
        {blog.content.split(`\n`).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Wrapper>

      {/* call to action */}
      <CallToAction />
    </div>
  )
}

export default Blog
