import React from "react";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail from "../assets/images/blog19.jpg";

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/werwer/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          porro, hic nulla quaerat, reprehenderit quia aliquid repellat ducimus
          minus labore illo excepturi quasi veniam laudantium similique impedit
          deserunt laborum reiciendis dolorem adipisci beatae harum libero.
          Atque ipsum quae sit blanditiis!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          numquam libero facere ab! Doloribus nihil, saepe ad ratione dolore
          obcaecati quam molestiae culpa rerum laborum deleniti numquam atque
          adipisci soluta ut perferendis? Aut deserunt repellendus corrupti
          accusamus quam magnam earum praesentium eveniet a quae voluptatum,
          voluptatem explicabo perspiciatis quidem ad!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
          aliquid iusto aut commodi accusantium repellat officia laborum vel
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste in
          eveniet ipsam, quo ipsum quaerat culpa, veritatis enim autem beatae
          ab? Voluptate laborum beatae sequi, eos quia obcaecati neque sed
          aspernatur! Eos maxime perferendis perspiciatis illo facere numquam
          magni, ratione sapiente consequuntur quis ad officia consectetur,
          quidem ipsam modi animi fugiat possimus laborum nisi ea iste.
          Laboriosam enim dicta rem, reiciendis expedita natus eaque voluptas
          modi ullam aperiam dolor doloribus nam libero. Iusto dignissimos
          reiciendis porro, doloribus placeat totam culpa ex fuga mollitia
          reprehenderit amet velit repellendus dicta hic eius et, asperiores
          ducimus ipsum! Quo ut doloribus rem laudantium veniam quidem, voluptas
          eveniet autem. Repellendus error tempore facilis, qui quidem autem
          mollitia fuga! Eos molestiae eum rerum quaerat aliquam blanditiis quos
          fugiat sint ratione similique velit corrupti repellendus aliquid
          mollitia, laboriosam ut minima est quisquam provident quam voluptas
          sit. Error perferendis id saepe, laborum labore, aliquid, nemo odit in
          dolorem vel sapiente? Molestias, maxime. Possimus sint adipisci nemo
          harum quasi porro minima! Illo quas amet aperiam, rerum iste, ipsam
          libero maiores molestiae laborum repellat dolorem reiciendis harum,
          vitae delectus accusantium veritatis temporibus eaque! Porro sapiente
          molestias laboriosam natus voluptatem magnam, sed culpa veniam vel
          suscipit tenetur? Molestias quisquam beatae modi.
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
