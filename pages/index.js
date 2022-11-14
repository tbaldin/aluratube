import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    console.log("useEffect");
    service
        .getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            // Forma imutavel
            const novasPlaylists = { ...playlists };
            dados.data.forEach((video) => {
                if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                novasPlaylists[video.playlist] = [
                    video,
                    ...novasPlaylists[video.playlist],
                ];
            });

            setPlaylists(novasPlaylists);
        });
}, []);

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        {/* Prop Drilling */}
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={playlists}>
          Conteúdo
        </TimeLine>
      </div>
    </>

  );
}

export default HomePage



// function Banner() {
//   return (
//     <StyledBanner>
//       {/* <img src="banner" />*/}

//       <section className="user-info">
//         <img src="https://img.freepik.com/vetores-premium/bem-vindo-inscricao-de-neon-vector-bonito_110464-78.jpg?w=996" />
//       </section>
//     </StyledBanner>
//   );

// }

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    //margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px
  }
`;

const StyledBanner = styled.div`
  background-color: blue;
  /*background-image: url(${config.bg});*/
  background-image: url(${({ bg }) => bg});
  height: 230px;
  /* img {
    width: 100%;
    height: 250px;
    margin-top: 56px;*/
`;


function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />

      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>

      </section>
    </StyledHeader>
  )
}

function TimeLine({ searchValue, ...props }) {
  //console.log("dentro", props.playlists);
  const playlistNames = Object.keys(props.playlists);
  //for = retorno statement
  //foreach no react = retorno por expressão
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        //console.log(playlistName);
        //console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map((videos) => {
                  return (
                    <a key={videos.url} href={videos.url}>
                      <img src={videos.thumb} />
                      <span>
                        {videos.title}
                      </span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}