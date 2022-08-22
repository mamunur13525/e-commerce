import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Blog } from '../../components/Shared/Blogs/Blogs'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection'
import { bloglists } from '../../FakeData/FakeData'
import { CartItemsContext } from '../_app'

export default function Home() {
    const [cartItems,setCartItems] =  useContext(CartItemsContext);
    
    return (
      <div>
        <Head>
          <title>E-Commerce</title>
          <meta name="description" content="e-commerce" />
          <link
            rel="icon"
            href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>
        <main className="h-full lg:h-screen">
          <Navbar />
          <PageTitleSection
            img="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_5.jpg?v=26308687731726529481500869779"
            title="Blogs"
          />
          <BlogComponent />
          <Footer />
        </main>
      </div>
    );
}



const BlogComponent  =()=>{ 
    const route = useRouter();
    
    return (
      <section className="container mx-auto">
        <div className="flex justify-between mt-8 gap-4">
          <div className="w-9/12">
            <div className='flex flex-wrap'>
            {Array.isArray(bloglists) && bloglists.length ? (
              bloglists.map((blog) => (
                <div onClick={()=>route.push('/blog/1')} key={blog.id} className='w-1/2'>
                  <Blog key={blog.id} blog={blog}/>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center">
                <img
                  className="w-20"
                  src="https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png"
                  alt=""
                />
                {/* <RiFileForbidLine className='text-4xl'/> */}
                <p className="text-center text-2xl font-light">No Data!</p>
              </div>
            )}
            </div>
          </div>
          <div className="w-2/12 mt-8 mr-auto">
            <h1 className="text-2xl font-bold uppercase">Category</h1>
            <div className="mt-6">
              {
                /* posts */ [
                  { id: 1, items: 4, name: "Audio post" },
                  { id: 1, items: 4, name: "Gallery post" },
                  { id: 1, items: 4, name: "Post post" },
                  { id: 1, items: 4, name: "Standard post" },
                  { id: 1, items: 4, name: "Uncategorized post" },
                  { id: 1, items: 4, name: "Video post" },
                ].map((post) => (
                  <p
                    key={post.id}
                    className="my-5 text-gray-600  flex justify-between items-center "
                  >
                    <span className="hover:text-green-600 cursor-pointer duration-500">
                      {post.name}
                    </span>
                    <span>{`(${post.items})`}</span>
                  </p>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    );
}