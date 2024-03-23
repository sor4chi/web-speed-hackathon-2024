import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
  height: auto;
`;

const SRCSETS = [
  { mw: 1024, path: '/assets/images/hero-1024.webp' },
  { mw: 768, path: '/assets/images/hero-768.webp' },
  { mw: 640, path: '/assets/images/hero-640.webp' },
  { mw: 320, path: '/assets/images/hero-320.webp' },
];

const buildSrcset = () => {
  return SRCSETS.map((set) => `${set.path} ${set.mw}w`).join(', ');
};

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image
        alt="Cyber TOON"
        height="576"
        loading="eager"
        sizes="(max-width:1024px) 100vw, 1024px"
        src={SRCSETS[0]?.path}
        srcSet={buildSrcset()}
        width="1024"
      />
    </_Wrapper>
  );
};
