fetch("https://yundanbi.github.io/html_study/product.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("데이터 불러오기 오류:", error));
