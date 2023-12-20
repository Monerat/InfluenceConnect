import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 87vh;
  display: flex;
  color: white;
  overflow-x: hidden;

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
`;
