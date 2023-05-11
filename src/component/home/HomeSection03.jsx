import styled from 'styled-components';
import Section03Post from './Section03Post';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { __getList } from '../../redux/modules/boardsSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper';

const HomeSection03 = () => {
  const animatedItem = {
    0: useScrollFadeIn(1, 0.2),
    1: useScrollFadeIn(1, 0.8),
  };

  const dispatch = useDispatch();
  const postList = useSelector(state => state.boards.boards).slice(0, 7);

  useEffect(() => {
    dispatch(__getList());
  }, []);

  const swiperBreakpoints = {
    325: { slidePrevView: 1, spaceBetween: 80 },
    525: { slidePrevView: 1, spaceBetween: 70 },
    925: { slidePrevView: 1, spaceBetween: 60 },
    1025: { slidePerView: 1, spaceBetween: 50 },
    1125: { slidesPerView: 1.5, spaceBetween: 30 },
    1225: { slidesPerView: 2 },
    1335: { slidesPerView: 2.2 },
    1425: { slidesPerView: 2.5 },
  };
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
          breakpoints={swiperBreakpoints}
          spaceBetween={20}
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fbae03',
          }}
        >
          {postList?.map(post => (
            <SwiperSlide key={post.id}>
              <Section03Post
                key={post.id}
                title={post.title}
                address={post.address}
                imgurl={post.img}
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
