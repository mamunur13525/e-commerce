import Link from 'next/link';
import { bloglists } from "../../FakeData/FakeData";
import { Blog } from "../../components/Shared/Blogs/Blogs";
import Footer from "../../components/Shared/Footer/Footer";
import Navbar from "../../components/Shared/Navbar/Navbar";
import PageTitleSection from "../../components/Shared/PageTitleSection/PageTitleSection";

export default function Home() {
  return (
    <div>
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

const BlogComponent = () => {
  return (
    <section className="container mx-auto">
      <div className="flex justify-between mt-8 gap-4">
        <div className="w-9/12">
          <div className="flex flex-wrap">
            {Array.isArray(bloglists) && bloglists.length ? (
              bloglists.map((blog) => (
                <div key={blog.id} className="w-1/2">
                  <Link href={`/blog/${blog.slug}`}>
                    <Blog key={blog.id} blog={blog} />
                  </Link>
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
                { id: 1, items: 4, name: "Video post" }
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
};
