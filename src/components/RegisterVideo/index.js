import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";



function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    }
  };
}


const PROJECT_URL = "https://eayaowqwjfnqhxblfupx.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVheWFvd3F3amZucWh4YmxmdXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTIxOTksImV4cCI6MTk4NDAyODE5OX0.ulRBJ9oYKF-sZugQuGyShkl-ls_ZhrpMkcUIfgLFM3E";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// function getVideo(url) {
//   const videoId = url.split("v=")[1];
//   const amperasandPosition = videoId.indexOf("&");
//   if (amperasandPosition !== 1) {
//     return videoId.substring(0, amperasandPosition);
//   }
//   return videoId;
// }

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "Teste Tai", url: "https://www.youtube.com/watch?v=-2MJAYRTyxo" }
  });
  const [formVisivel, setFormVisivel] = React.useState(false);


  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ?
        (
          <form onSubmit={(evento) => {
            evento.preventDefault();
            console.log(formCadastro.values);

            //contrato entre front e back
            supabase.from("video").insert({
              title: formCadastro.values.titulo,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "jogos",
            })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              })

            setFormVisivel(false);
            formCadastro.clearForm();
          }}>
            <div>
              <button type="buton" className="close-modal" onClick={() => setFormVisivel(false)}>
                X
              </button>
              <input
                placeholder="Título do vídeo"
                name="titulo"
                value={formCadastro.values.titulo}
                onChange={formCadastro.handleChange}
              />
              <input
                placeholder="URL do vídeo"
                name="url"
                value={formCadastro.values.url}
                onChange={formCadastro.handleChange}
              />
              <button type="submit" >
                Cadastrar
              </button>
            </div>

          </form>
        )
        : false}

    </StyledRegisterVideo>
  )
}