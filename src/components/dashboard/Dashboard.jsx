import React from "react";
import styles from "./dashboard.module.css";
import { useMeStore } from "@/store/useMeStore";
import { LuSearch } from "react-icons/lu";
import { HiOutlinePlus } from "react-icons/hi2";
import { SiGoogleanalytics } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import Chart from "../Chart";

const Dashboard = () => {
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
  }));
  const isLoading = useMeStore((state) => state.isLoading);
  if (isLoading) return <div>loading...</div>;
  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <div className={styles.inputHolder}>
          <LuSearch />
          <input type="text" placeholder="search" />
        </div>
        <button>
          <HiOutlinePlus />
        </button>
      </header>
      <div className={styles.dashboardBoxs}>
        <Link href={"/analytics"} className={styles.dashboardBox}>
          <Image src="/analytics.jpg" fill={true} alt="image of analytics" />
          <SiGoogleanalytics />
          {/* <h3>analytics</h3> */}
        </Link>
        <div className={styles.dashboardBox}>{/* <h3>add process</h3> */}</div>
      </div>
      <div className={styles.chartTab}>
        <ul>
          <li>test</li>
          <li>test</li>
        </ul>
      </div>
      <Chart />
      {/* user id : {me.id} <br />
      user email : {me.email} <br />
      created at : {me.createdAt} <br />
      <br />
      <br />
      <br />
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, minima
        assumenda, tempore consectetur atque odio dolorum eveniet ipsum aliquam
        nam illo quasi velit cum, nostrum quaerat saepe repellat dignissimos
        doloribus rerum animi! Soluta, nam adipisci sed quaerat quo, architecto
        ea iure, eius velit repellat voluptate? Fugit ipsum eos accusamus sequi,
        placeat laboriosam sit quos fugiat, a aperiam impedit quo. Obcaecati
        molestiae temporibus eum, commodi cum repellat adipisci, itaque,
        exercitationem ipsa cumque fugit ullam. Natus aliquam consequatur non
        minus hic repellat error itaque ullam libero sunt modi nesciunt ea nulla
        delectus, culpa quod quo excepturi unde asperiores tenetur quos
        explicabo. Debitis laboriosam accusamus placeat nam fugiat impedit
        tenetur molestias et, dicta nostrum, minima voluptatum. Aut pariatur
        sequi, porro itaque similique aspernatur, aperiam autem dolor ab
        voluptatum necessitatibus est sint tenetur suscipit nesciunt non
        repudiandae impedit blanditiis totam quo quia soluta! Ad dicta odit,
        voluptas corporis sequi minus quia placeat eos sint consectetur quod
        officiis voluptatem dignissimos magnam distinctio dolores blanditiis
        sapiente quam aspernatur quis facere totam. Voluptatum asperiores sequi
        corporis soluta fuga ipsa inventore, suscipit facilis maiores, animi
        voluptates? Sed mollitia dolorem veniam fuga, quam numquam quasi
        adipisci perferendis nesciunt aliquid commodi illo corrupti minima
        debitis blanditiis officiis impedit! Earum, sed repellendus. Similique
        necessitatibus veniam esse praesentium ad quos. Iusto necessitatibus
        quibusdam autem fuga numquam ipsa, commodi odit aperiam vero
        voluptatibus quia fugiat mollitia dolores est labore veritatis
        laboriosam unde ad velit! Quod nobis dolor sit aperiam aliquam pariatur
        maxime ab mollitia ipsum similique repellendus, distinctio molestiae,
        incidunt, porro exercitationem voluptas autem nihil modi odit eaque
        minima laboriosam. Quod ea atque exercitationem, dolores in quaerat eum,
        ipsum quidem repellendus autem placeat, mollitia est natus laboriosam
        voluptatum tenetur magnam sint eveniet doloremque ex et consequatur.
        Similique reprehenderit iusto repudiandae animi? Architecto voluptates
        adipisci molestias, labore exercitationem quae. Quis cum vitae nisi nam
        fugit debitis porro, sapiente voluptas culpa necessitatibus incidunt
        iure libero accusantium voluptatibus ex tenetur veniam magnam cumque.
        Expedita quos pariatur quo earum eligendi perferendis quibusdam modi?
        Quam aliquam, tempore modi illum facilis odio! At reprehenderit et natus
        maxime ducimus alias eius. Corporis unde, iste facere facilis ab eum est
        consectetur, ea delectus, sit consequatur deleniti omnis. Doloremque
        quae voluptatum earum officiis unde consequatur ut delectus molestias
        cupiditate, numquam corporis inventore enim in, reiciendis pariatur.
        Neque recusandae saepe omnis voluptas explicabo officia et a possimus
        optio, libero similique tempore dolorem esse veritatis iusto porro!
        Laborum, molestias tempore sint quibusdam reprehenderit atque asperiores
        nostrum consequuntur. Distinctio veritatis beatae reiciendis
        accusantium? Quidem, dolore. Tenetur animi commodi fugit repellat nihil
        sequi distinctio quae. Maiores, itaque doloribus soluta officia neque
        corrupti eligendi vero ut! Suscipit ad aspernatur consequuntur quas
        molestiae obcaecati fugiat debitis nam amet quaerat atque enim iure
        itaque unde doloremque quod quibusdam culpa, beatae deserunt. Enim
        architecto deserunt excepturi eligendi exercitationem porro, ex tempore
        ad dolorem aliquam animi repellendus vitae odio dolore voluptatem culpa
        optio. Esse quod ab quisquam ad voluptas ut itaque harum, unde illum
        rerum aspernatur vero, facilis delectus perspiciatis explicabo illo modi
        laudantium perferendis asperiores tenetur voluptates? Omnis, laboriosam
        adipisci.
      </p> */}
    </div>
  );
};

export default Dashboard;
