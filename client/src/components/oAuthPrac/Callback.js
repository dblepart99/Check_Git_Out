import axios from "axios";
import { useEffect } from "react";
import qs from "qs";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const LoadingBlock = styled.div`
  position: relative;
  width: auto;
  height: auto;

  top: 300px;

  border-radius: 10px;
`;

function Callback({ history, location }) {
  // console.log("도착");
  useEffect(() => {
    async function getToken() {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      try {
        // 이 부분은 express에 요청하여 JWT 토큰을 발급합니다.
        // const response = await axios.post(process.env.REACT_APP_AUTH_URL, {
        //   code,
        // });
        const response = await axios.post("http://168.188.129.200:8080/auth", {
          code,
        });

        // const response = await fetch(`${authUri}?code=${code}`);
        localStorage.setItem("access_token", response.data.access_token);
        const access_token = localStorage.getItem("access_token");

        const { data } = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${access_token}`,
          },
        });

        localStorage.setItem("username", data.login);
        localStorage.setItem("ProfileURL", data.avatar_url);
        history.push("/");
        // history.push({
        //   pathname: "/",
        //   state: { tmpval: true },
        // }); // 로그인이 완료되면 보여줄 페이지
      } catch (error) {
        history.push("/error"); // api요청이 실패했을때 애러 핸들링 페이지
      }
    }

    getToken();
  }, [location, history]);

  return (
    <div>
      <LoadingBlock>
        <Spinner animation="border" />
      </LoadingBlock>
    </div>
  );
}

export default Callback;
