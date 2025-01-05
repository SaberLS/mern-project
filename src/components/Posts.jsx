import React, { useState } from "react";
import { PostItem } from "./PostItem";

import Thumbnail1 from "../assets/images/blog1.jpg";
import Thumbnail2 from "../assets/images/blog2.jpg";
import Thumbnail3 from "../assets/images/blog3.jpg";
import Thumbnail4 from "../assets/images/blog4.jpg";
import Thumbnail5 from "../assets/images/blog5.jpg";
import Thumbnail6 from "../assets/images/blog6.jpg";
import Thumbnail7 from "../assets/images/blog7.jpg";
import Thumbnail8 from "../assets/images/blog8.jpg";
import Thumbnail9 from "../assets/images/blog9.jpg";
import Thumbnail10 from "../assets/images/blog10.jpg";

const DUMMY_POSTS = [
  {
    id: "1",
    thumbnail: Thumbnail1,
    category: "education",
    title: "This is the title of the very first post on this blog.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, provident. Ratione tempora praesentium alias, dolores quod aperiam accusantium reprehenderit provident qui, minus ut similique inventore! Aliquid error rem eum est inventore maiores totam aliquam cupiditate, porro, voluptates, minus repellendus corporis velit? Iure doloribus soluta id cupiditate eius nostrum cumque ut, numquam possimus eaque! Nisi odit, quo, placeat soluta at quas ratione accusantium inventore expedita commodi amet aliquid? Quis aspernatur consequuntur mollitia ea quasi facilis dolor iste laborum cupiditate, ratione voluptatum dicta reprehenderit expedita voluptas voluptates doloremque aliquid, eveniet, quidem modi explicabo quae optio. Ipsa voluptate tenetur quo praesentium, ex nostrum unde eveniet odit? Voluptas, ex ducimus necessitatibus repellendus alias accusamus corrupti repudiandae veniam, illo itaque quo error libero perspiciatis. Sunt perspiciatis consequuntur quasi expedita doloribus repellat eum iusto veniam sed corrupti aliquam, sit aspernatur saepe temporibus nihil commodi odio, reiciendis vero consectetur voluptatibus quod veritatis quam. Odio reprehenderit asperiores repellat.",
    authorID: 3,
  },
  {
    id: "2",
    thumbnail: Thumbnail2,
    category: "technology",
    title: "Exploring the latest trends in artificial intelligence.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod elit nec.",
    authorID: 5,
  },
  {
    id: "3",
    thumbnail: Thumbnail3,
    category: "health",
    title: "10 tips for maintaining a healthy lifestyle.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan risus.",
    authorID: 1,
  },
  {
    id: "4",
    thumbnail: Thumbnail4,
    category: "education",
    title: "How online learning is transforming education.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, provident. Ratione tempora praesentium alias, dolores quod aperiam accusantium reprehenderit provident qui, minus ut similique inventore! Aliquid error rem eum est inventore maiores totam aliquam cupiditate, porro, voluptates, minus repellendus corporis velit? Iure doloribus soluta id cupiditate eius nostrum cumque ut, numquam possimus eaque! Nisi odit, quo, placeat soluta at quas ratione accusantium inventore expedita commodi amet aliquid? Quis aspernatur consequuntur mollitia ea quasi facilis dolor iste laborum cupiditate, ratione voluptatum dicta reprehenderit expedita voluptas voluptates doloremque aliquid, eveniet, quidem modi explicabo quae optio. Ipsa voluptate tenetur quo praesentium, ex nostrum unde eveniet odit? Voluptas, ex ducimus necessitatibus repellendus alias accusamus corrupti repudiandae veniam, illo itaque quo error libero perspiciatis. Sunt perspiciatis consequuntur quasi expedita doloribus repellat eum iusto veniam sed corrupti aliquam, sit aspernatur saepe temporibus nihil commodi odio, reiciendis vero consectetur voluptatibus quod veritatis quam. Odio reprehenderit asperiores repellat.",
    authorID: 2,
  },
  {
    id: "5",
    thumbnail: Thumbnail5,
    category: "sports",
    title: "The evolution of professional football.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis commodi nostrum sequi, eligendi alias necessitatibus veritatis, tempora cumque cum est nobis fuga corporis vitae voluptas, libero provident blanditiis dolore autem quos. Dolor, unde recusandae! Magnam at iure itaque, repellendus cum nam assumenda temporibus enim eligendi? Adipisci obcaecati quam cupiditate explicabo amet molestiae perspiciatis ut impedit totam neque earum, in, placeat repellendus delectus voluptatem? Similique reiciendis, provident, minima facere animi dicta nam dolorem quia saepe aperiam beatae ipsam. Eius molestiae nemo, atque facilis sequi debitis aperiam, ipsum corporis a distinctio, laboriosam quos optio id aliquam! Deleniti amet adipisci numquam. Dolor eveniet a officiis. Amet aut quod consectetur earum sequi et veritatis aperiam libero ut accusamus pariatur obcaecati, magni error dolores nobis nihil beatae? Libero nulla maiores quae tempore? Dolorem, illum eius.",
    authorID: 4,
  },
  {
    id: "6",
    thumbnail: Thumbnail6,
    category: "fashion",
    title: "Top fashion trends for the upcoming season.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi euismod.",
    authorID: 6,
  },
  {
    id: "7",
    thumbnail: Thumbnail7,
    category: "business",
    title: "Starting a small business in today's economy.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate lectus.",
    authorID: 8,
  },
  {
    id: "8",
    thumbnail: Thumbnail8,
    category: "science",
    title: "Exploring the mysteries of black holes.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam fringilla.",
    authorID: 9,
  },
  {
    id: "9",
    thumbnail: Thumbnail9,
    category: "technology",
    title: "How blockchain is changing the world.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu tortor sit amet.",
    authorID: 7,
  },
  {
    id: "10",
    thumbnail: Thumbnail10,
    category: "travel",
    title: "Top destinations to visit in 2025.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel ante.",
    authorID: 10,
  },
];

function Posts() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="posts">
      <div className="container posts__container">
        {posts.map((post) => (
          <PostItem key={post.id} post={post}></PostItem>
        ))}
      </div>
    </section>
  );
}

export default Posts;
