import styled from "styled-components";

export const Background = styled.div`

    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: right;
    background-color: red;

    .image {

        width: 60%;
    }

    @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .image {
      display: none;
    }
  }
`
