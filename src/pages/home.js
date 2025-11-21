import ProductList from "./productlist";

function Home() {
  return (
    <div className="home-page text-center container overflow-hidden mt-5">

      {/* ======= CAROUSEL START ======= */}
      <div id="homeCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
        
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3"></button>
        </div>

        <div className="carousel-inner rounded-3 shadow-sm">
          <div className="carousel-item active">
            <img
              src="/carousel/carousel.webp"
              className="d-block w-100"
              alt="Earphones Banner 1"
              style={{ height: "420px", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="/carousel/carousel-1.jpg"
              className="d-block w-100"
              alt="Earphones Banner 2"
              style={{ height: "420px", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="/carousel/carousel-2.jpg"
              className="d-block w-100"
              alt="Earphones Banner 3"
              style={{ height: "420px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/carousel/carousel-3.jpg"
              className="d-block w-100"
              alt="Earphones Banner 4"
              style={{ height: "420px", objectFit: "cover" }}
            />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* ======= CAROUSEL END ======= */}

      <ProductList />
    </div>
  );
}

export default Home;
