import styled from 'styled-components';
import Section03Post from './Section03Post';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';
import exampleImage from '../../assets/Section3ExampleImage.png';
import exampleImage2 from '../../assets/Section3ExampleImage2.png';
import exampleImage3 from '../../assets/Section3ExampleImage3.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper';

const HomeSection03 = () => {
  const animatedItem = {
    0: useScrollFadeIn('down', 1, 0.2),
    1: useScrollFadeIn('down', 1, 0.8),
  };

  // TEST CODE: 임시 게시글 데이터 - 서버 게시글 데이터 받아올 경우 수정 (API 문서에 img key는 없음)
  const postList = [
    {
      id: 1,
      title: '공원에서 산책하실 분!',
      area: '강서구',
      img: exampleImage,
    },
    {
      id: 2,
      title: '중형견 메이트 구해요~',
      area: '강남구',
      img: exampleImage2,
    },
    {
      id: 3,
      title: '우리집 초코랑 친구해요 🐶',
      area: '강북구',
      img: exampleImage3,
    },
  ];
  return (
    <Section03>
      <TextLabel {...animatedItem[0]}>산책 메이트를 기다리고 있어요!</TextLabel>
      <div {...animatedItem[1]}>
        <Swiper
          className="mySwiper"
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          scrollbar={false}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Scrollbar, Navigation, Pagination]}
          breakpoints={{
            325: {
              slidePrevView: 1,
              spaceBetween: 80,
            },
            525: {
              slidePrevView: 1,
              spaceBetween: 70,
            },
            925: {
              slidePrevView: 1,
              spaceBetween: 60,
            },
            1025: {
              slidePerView: 1,
              spaceBetween: 50,
            },
            1125: {
              slidesPerView: 1.5,
              spaceBetween: 30,
            },
            1225: {
              slidesPerView: 2,
            },
            1335: {
              slidesPerView: 2.2,
            },
            1425: {
              slidesPerView: 2.5,
            },
          }}
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fbae03',
          }}
        >
          {postList.map(post => (
            <SwiperSlide>
              <Section03Post
                key={post.id}
                title={post.title}
                area={post.area}
                img={post.img}
                class="swiper-slide"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section03>
  );
};

const Section03 = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextLabel = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default HomeSection03;
