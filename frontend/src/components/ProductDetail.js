import { useParams } from "react-router-dom";
import productData from "../db/product.json";
import Header from "./Header";
import "./ProductDetail.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = productData.find((item) => item.id.toString() === id);
  const [tab, setTab] = useState("description");
  if (!product) return <div>해당 상품을 찾을 수 없습니다.</div>;
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const {
    name,
    subname,
    price,
    origin,
    thumbnail,
    location,
    delivery,
    seller,
    packge,
    unit,
    weight,
    allergy,
    allergy_detail,
    product_choice,
    brand,
  } = product;

  return (
    <>
      <div className="product-detail-container">
        <div className="product-detail-wrapper">
          <div className="product-image-section">
            <div className="product-image">
              <img src={process.env.PUBLIC_URL + `/${thumbnail}`} alt={name} />
              <div className="badge-top">+10% 쿠폰</div>
            </div>

            {brand && (
              <div className="brand-card">
                <div className="brand-logo-box">
                  <img
                    src={process.env.PUBLIC_URL + `/${brand.brand_img}`}
                    alt={brand.brand_name}
                  />
                </div>
                <div className="brand-info-box">
                  <span className="brand-label">브랜드관</span>
                  <p className="brand-title">
                    {brand.brand_name} <span className="arrow">&gt;</span>
                  </p>
                  <p className="brand-desc">{brand.brand_tag}</p>
                </div>
              </div>
            )}
          </div>

          <div className="product-info-section">
            <div className="delivery-type">{location}</div>
            <div id="name_button">
              <h2>{name}</h2>
              <button>
                <img src={process.env.PUBLIC_URL + "/img/button.svg"}></img>
              </button>
            </div>
            <p className="subname">{subname}</p>
            <div className="price-box">
              <span className="discount-rate">{price.discountRate}%</span>
              <span className="discounted">
                {typeof price.discounted === "number"
                  ? price.discounted.toLocaleString()
                  : parseInt(
                      price.discounted.replace(/,/g, "")
                    ).toLocaleString()}
                원
              </span>
            </div>
            <div className="original">
              <del>{price.original}</del>
            </div>
            <div className="origin-info">{origin}</div>
            <button className="coupon_button2">
              지금 이 상품 <span> 2,000</span> 원 할인 받기{" "}
              <strong>&gt;</strong>
            </button>
            <button className="coupon-button">
              첫 구매 할인 쿠폰 받기 &gt;
            </button>

            <table className="info-table">
              <tbody>
                <tr>
                  <th>배송</th>
                  <td>{delivery.desc}</td>
                </tr>
                <tr>
                  <th>판매자</th>
                  <td>{seller}</td>
                </tr>
                <tr>
                  <th>포장타입</th>
                  <td>
                    {packge.type}
                    <br />
                    {packge.packge_detail}
                  </td>
                </tr>
                <tr>
                  <th>판매단위</th>
                  <td>{unit}</td>
                </tr>
                <tr>
                  <th>중량/용량</th>
                  <td>{weight}</td>
                </tr>
                <tr>
                  <th>알레르기정보</th>
                  <td>
                    {allergy}
                    <br />
                    {allergy_detail}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="choice-box">
              <label htmlFor="choice">상품선택</label>
              <select id="choice">
                <option>{product_choice.choice_name}</option>
              </select>
              <div className="total-price">
                총 상품금액: <span>{product_choice.discount_price}</span>
              </div>
              <div id="cart_heart">
                <button className="heart">
                  <img src={process.env.PUBLIC_URL + "/img/heart.svg"}></img>
                </button>
                <button className="heart">
                  <img src={process.env.PUBLIC_URL + "/img/detail1.svg"}></img>
                </button>
                <button className="add-to-cart" onClick={handleAddToCart}>
                  장바구니 담기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product_sidebar"></div>

      <div className="product-tab-menu">
        <ul>
          <li
            className={tab === "description" ? "active" : ""}
            onClick={() => setTab("description")}
          >
            상품설명
          </li>
          <li
            className={tab === "detail" ? "active" : ""}
            onClick={() => setTab("detail")}
          >
            상세정보
          </li>
          <li
            className={tab === "review" ? "active" : ""}
            onClick={() => setTab("review")}
          >
            후기 ({product.reviews})
          </li>
          <li
            className={tab === "qna" ? "active" : ""}
            onClick={() => setTab("qna")}
          >
            문의
          </li>
        </ul>
      </div>

      <div className="product-tab-content">
        {tab === "description" && (
          <div className="description-section">
            <img
              src={
                process.env.PUBLIC_URL +
                `/${product.Product_description.description_img}`
              }
              alt="상품설명"
              className="description-img"
            />
            <div className="description-text">
              <p className="sub-description">
                {product.Product_description.sub_description}
              </p>
              <h3 className="title-name">
                <span>{product.Product_description.title_name_1}</span>{" "}
                <span>{product.Product_description.title_name_2}</span>
              </h3>
            </div>
          </div>
        )}

        {tab === "detail" && (
          <div className="detail-section">
            {product.detailImages?.map((imgSrc, index) => (
              <img
                key={index}
                src={process.env.PUBLIC_URL + `/${imgSrc}`}
                alt={`상세정보 이미지 ${index + 1}`}
                className="detail-img"
              />
            ))}
          </div>
        )}
        {tab === "review" && (
          <div className="review-tab">
            <h3>상품 후기</h3>

            <div className="review-thumbnail-list">
              {product.review?.review_img?.map((img, idx) => (
                <img
                  key={idx}
                  src={process.env.PUBLIC_URL + `/${img}`}
                  alt={`리뷰 이미지 ${idx + 1}`}
                />
              ))}
            </div>

            <ul className="review-announcement">
              <li>[25년 5월 1주] 베스트 후기 선정 안내</li>
              <li>상품후기 적립금 정책 안내</li>
              <li>금주의 베스트 후기 안내</li>
            </ul>

            <div className="review-detail-card">
              <div className="review-title">
                {product.review?.review_detail?.review_name}
              </div>
              <div className="review-text">
                {product.review?.review_detail?.review_element}
              </div>

              <div className="review-detail-images">
                {product.review?.review_detail?.review_imag?.map((img, idx) => (
                  <img
                    key={idx}
                    src={process.env.PUBLIC_URL + `/${img}`}
                    alt={`상세 후기 이미지 ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="review-date">2025.04.18</div>
            </div>
          </div>
        )}

        {tab === "qna" && (
          <div id="inquiry_name">
            <h2>상품 문의</h2>
            <button>문의하기</button>
            <ul className="inquiry">
              <li>
                상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른
                글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
              </li>
              <li>
                배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리
                내 1:1문의에 남겨주세요.
              </li>
            </ul>
            <table>
              <thead>
                <tr>
                  <th className="title">제목</th>
                  <th className="author">작성자</th>
                  <th className="create_date">작성일</th>
                  <th className="status">답변상태</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="title_1">비밀글입니다.</td>
                  <td className="author_1">김*희</td>
                  <td className="create_date1">2025.05.06</td>
                  <td className="status_1">답변완료</td>
                </tr>
                <tr>
                  <td className="title_1">
                    선물용으로 샀는데 박스 찌그러져있는데요
                  </td>
                  <td className="author_1">이*영</td>
                  <td className="create_date1">2025.04.20</td>
                  <td className="status_1">답변완료</td>
                </tr>
                <tr>
                  <td className="title_1">비밀글입니다.</td>
                  <td className="author_1">김*영</td>
                  <td className="create_date1">2025.03.05</td>
                  <td className="status_1">답변완료</td>
                </tr>
                <tr>
                  <td className="title_1">비밀글입니다.</td>
                  <td className="author_1">이*진</td>
                  <td className="create_date1">2025.03.04</td>
                  <td className="status_1">답변완료</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
