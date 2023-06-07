import { lazy } from "react";
import cardsStyle from "../../styles/Cards.module.css";
import home1 from "../../assets/home-1.webp";
import home2 from "../../assets/home-2.webp";
import home3 from "../../assets/home-3.webp";
import home4 from "../../assets/home-4.webp";

const cards = [
  {
    img: home1,
    title: "Aradığınız Sağlık Hizmetini Kolayca Bulun",
    body: "Kuzey Kıbrıs'ta aradığınız sağlık hizmetlerine daha kolay, hızlı ve güvenilir bir şekilde erişebilmeniz için size Doctor Search System'i sunuyoruz.",
  },
  {
    img: home2,
    title: "Sağlık Sigortanızı Kullanın",
    body: "Tercih ettiğiniz hekimlerimiz ve hastanelerimizde sağlık sigortanız ile muayne olun, sağlığınızı güvence altına alın.",
  },
  {
    img: home3,
    title: "Size En Yakın Sağlık Merkezini Bulun",
    body: "Sağlık hekimlerimizin hangi bölgede, hangi sağlık merkezinde çalıştığını adres bilgilerinden veya sizler için hazırladığımız haritadan kolayca bulun.",
  },
  {
    img: home4,
    title: "Alanında Uzman Hekimler ile Tanışın",
    body: "Sizler için oluşturduğumuz arama sistemi sayesinde uzman hekimlerimizle iletişime geçin ve aradığınız sağlık hizmetine kolayca ulaşın.",
  },
];

const Navbar = lazy(() => import("../../components/Navbar"));
const Footer = lazy(() => import("../../components/Footer"));

function Home() {
  return (
    <div className="container">
      <Navbar />
      <div className={cardsStyle["cards-container"]}>
        {cards.map((card, i) => (
          <div key={i} className={cardsStyle["card"]}>
            <img
              src={card.img}
              className={cardsStyle["card-img"]}
              alt="alt"
              loading="lazy"
            />
            <div className={cardsStyle["card-body"]}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
            <div className={cardsStyle["line"]}></div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
