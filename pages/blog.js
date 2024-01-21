import React, { useState } from "react";
import styles from "@/styles/Blog.module.css";
import Link from "next/link";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  let data = await fetch("http://localhost:3000/api/blogs");
  let allBlogs = await data.json();
  return { props: { allBlogs } };
}
const Blog = (props) => {
  const [all, setAll] = useState(props.allBlogs);
  // useEffect(() => {
  //   console.log("useEffect is running");
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((a) => {
  //       return a.json();
  //     })
  //     .then((parsed) => {
  //       setAll(parsed);
  //     });
  // }, []);
  return (
    <>
      <main className={styles.main}>
        <div className={styles.blogs}>
          <h1>Popular Blogs</h1>
          {all.map((blogitem) => {
            return (
              <div key={blogitem.slug}>
                <Link href={`/blogpost/${blogitem.slug}`}>
                  <h3 className={styles.blogItem3}>{blogitem.title}</h3>
                </Link>
                <p className={styles.blogItemp}>
                  {blogitem.content.substr(0, 140)}...
                  <Link href={`/blogpost/${blogitem.slug}`}>
                    <button className={styles.btn}>Read More</button>
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Blog;
